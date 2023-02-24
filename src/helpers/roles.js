export function verifyRole(role) {
  return function (req, res, next) {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(401).send("No autorizado");
    }
  };
}
