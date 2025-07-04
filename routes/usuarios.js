const express = require("express");
const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");
const router = express.Router();
const redirectIfLoggedIn = require("../middlewares/redirectIfLoggedIn");

// GET formulario de registro
router.get("/registro", redirectIfLoggedIn, (req, res) => {
  res.render("registro");
});

// POST registro usuario
router.post("/registro", async (req, res) => {
  const { usuario, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({ username: usuario, password: hash });
    await nuevoUsuario.save();
    res.redirect("/usuario/login");
  } catch (error) {
    console.error("Error al registrar:", error);
    res.send("Error al registrar");
  }
});

// GET login
router.get("/login", redirectIfLoggedIn, (req, res) => {
  res.render("login");
});

// POST login

router.post("/login", async (req, res) => {
  const { usuario, password } = req.body;
  const user = await Usuario.findOne({ username: usuario });

  if (!user) {
    return res.render("login", { error: "Usuario no encontrado", usuario });
  }

  const match = await bcrypt.compare(password, user.password);
  if (match) {
    req.session.usuario = usuario;
    res.redirect("/"); // Redirige a la pantalla principal
  } else {
    res.render("login", { error: "Contraseña incorrecta", usuario });
  }
});

module.exports = router;
