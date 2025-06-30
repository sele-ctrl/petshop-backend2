const bcrypt = require('bcrypt');
const path = require('path');

let usuarios = [];

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
    usuarios.push({ usuario, password: passwordHash });
    console.log("Registrando usuario:", { usuario, password });
    res.redirect('/usuario/login');
  } catch (err) {
    console.error("Error al registrar usuario:", err);
    res.sendStatus(500);
  }
};

const loginUsuario = async (req, res) => {
  const { usuario, password } = req.body;

  const user = usuarios.find(u => u.usuario === usuario);
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
