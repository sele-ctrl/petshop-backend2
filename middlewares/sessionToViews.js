module.exports = function(req, res, next) {
  res.locals.session = req.session;
  res.locals.path = req.path;
  next();
};





