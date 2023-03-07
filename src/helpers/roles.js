export function verifyRole(role) {
  return function (req, res, next) {
    console.log(req.user.rol)
    if (req.user && (req.user.rol === role || req.user.rol === 'admin')) {
      next();
    } else {
      res.redirect("/");
    }
  };
}
