"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var helpers = {};
helpers.isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "No tiene permisos para acceder");
  res.redirect("/");
};
var _default = helpers;
exports["default"] = _default;