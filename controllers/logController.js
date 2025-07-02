
const bcrypt = require('bcrypt');
const path = require('path');
const Usuario = require('../models/Usuario');

const renderLogin = (req, res) => {
  res.render('login');
};

const renderRegistro = (req, res) => {
  res.render('registro');
};

const registrarUsuario = async (req, res) => {
  const { usuario, password } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({ username: usuario, password: passwordHash });
    await nuevoUsuario.save();
    console.log("Registrando usuario en MongoDB:", { usuario });
    res.redirect('/usuario/login');
  } catch (err) {
    console.error("Error al registrar usuario:", err);
    res.send("Error al registrar usuario");
  }
};

const loginUsuario = async (req, res) => {
  const { usuario, password } = req.body;
  try {
    const user = await Usuario.findOne({ username: usuario });
    if (!user) {
      return res.send("Usuario no encontrado");
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      req.session.usuario = usuario;
      res.redirect('/');
    } else {
      res.send("Contraseña incorrecta");
    }
  } catch (err) {
    console.error("Error en login:", err);
    res.send("Error en login");
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

module.exports = {
  renderLogin,
  renderRegistro,
  registrarUsuario,
  loginUsuario,
  logout
};
