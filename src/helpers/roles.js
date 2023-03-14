export function verifyRole(role) {
  return function (req, res, next) {
    if (req.user && (req.user.rol === role || req.user.rol === 'admin')) {
      next();
    } else {
      res.redirect("/");
    }
  };
}
