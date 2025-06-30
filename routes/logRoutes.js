const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

let usuarios = [];

router.get("/registro", (req, res) => {
  res.render("registro");
});

router.post("/registro", async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    usuarios.push({ usuario, password: hash });
    console.log("Registrando usuario:", { usuario, password });
    res.redirect("/usuario/login");
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.send("Error al registrar usuario");
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = usuarios.find(u => u.usuario === username);

  if (!user) return res.send("Usuario no encontrado");

  const match = await bcrypt.compare(password, user.password);
  if (match) {
    req.session.usuario = username;
    res.redirect("/");
  } else {
    res.send("Contraseña incorrecta");
  }
});

module.exports = router;
