const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "No tiene permisos para acceder");
  res.redirect("/");
};

export default helpers;
