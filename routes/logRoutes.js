const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Usuario = require("../models/Usuario");


let usuarios = [];

router.get("/registro", (req, res) => {
  res.render("registro");
});

router.post("/registro", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({ username, password: hash });
    await nuevoUsuario.save();
    console.log("Registrando usuario en MongoDB:", { username });
    res.redirect("/usuario/login");
  } catch (error) {
    console.error("Error al registrar usuario en MongoDB:", error);
    res.send("Error al registrar usuario");
  }
});


router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Usuario.findOne({ username });
    if (!user) return res.send("Usuario no encontrado");

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      req.session.usuario = username;
      res.redirect("/usuario/usuarioRegistrado");
    } else {
      res.send("Contraseña incorrecta");
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.send("Error en el login");
  }
});

router.get("/usuarioRegistrado", (req, res) => {
  res.render("usuarioRegistrado");
});

module.exports = router;

