"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _user = require("../controllers/user.controller");
var _auth = _interopRequireDefault(require("../helpers/auth"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.get("/signup", _user.renderSignUp);
router.post("/signup", _user.signUpUser);
router.get("/", _user.renderSignIn);
router.post("/", _user.autenticacion);
router.get("/logout", _auth["default"].isAuthenticated, _user.logOut);
var _default = router;
exports["default"] = _default;