function requiereLogin(req, res, next) {
  if (!req.session.usuario) {
    return res.redirect("/usuario/login");
  }
  next();
}

module.exports = { requiereLogin };

