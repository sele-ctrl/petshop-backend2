module.exports = function (req, res, next) {
  if (req.session.usuario) {
    return res.redirect("/"); // Redirige a la pantalla principal
  }
  next();
};
