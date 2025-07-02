const express = require("express");
const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");
const router = express.Router();

// GET formulario registro
router.get("/registro", (req, res) => {
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

// GET formulario login
router.get("/login", (req, res) => {
  res.render("login");
});

// POST login usuario
router.post("/login", async (req, res) => {
  const { usuario, password } = req.body;
  const user = await Usuario.findOne({ username: usuario });

  if (!user) return res.send("Usuario no encontrado");

  const match = await bcrypt.compare(password, user.password);
  if (match) {
    req.session.usuario = usuario;
    res.redirect("/perfil");
  } else {
    res.send("Contraseña incorrecta");
  }
});

module.exports = router;
