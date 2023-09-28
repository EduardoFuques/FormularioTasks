"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _user = require("../controllers/user.controller");
var _auth = _interopRequireDefault(require("../helpers/auth"));
var _cargaInicial = require("../libs/carga-inicial");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.get("/signup", _user.renderSignUp);
router.post("/signup", _user.signUpUser);
router.get("/signupPJ", _user.renderSignUpPJ);
router.post("/signupPJ", _user.signUpPJ);
router.get("/", _user.renderSignIn);
router.post("/", _user.autenticacion, _user.mostrarErroresFlash);
router.get("/logout", _auth["default"].isAuthenticated, _user.logOut);
router.get("/password", _user.renderPassword);
router.post("/password", _user.restablecerPassword);
router.get("/reset-password/:token", _user.resetPasswordController);
router.post("/reset-password/:token", _user.updatePasswordController);
router.get("/carga", _cargaInicial.cargaInicial);
var _default = exports["default"] = router;