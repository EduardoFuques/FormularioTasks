export function verifyRole(role) {
  return function (req, res, next) {
    if (req.user && (req.user.rol === role )) {
      next();
    } else {
      res.redirect("/");
    }
  };
}
