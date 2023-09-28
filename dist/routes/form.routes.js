"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _empresa = require("../controllers/empresa.controller");
var _form = require("../controllers/form.controller");
var _admin = require("../controllers/admin.controller");
var _auth = _interopRequireDefault(require("../helpers/auth"));
var _multer = require("../helpers/multer");
var _roles = require("../helpers/roles");
var _buscador = require("../controllers/buscador.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();

// PERSONAS FISICAS
router.get("/form", _auth["default"].isAuthenticated, (0, _roles.verifyRole)("normal"), _form.renderForm);
router.post("/form", _auth["default"].isAuthenticated, (0, _roles.verifyRole)("normal"), _multer.uploadFile, _form.captureForm);
router.post("/edit", _auth["default"].isAuthenticated, (0, _roles.verifyRole)("normal"), _multer.uploadFile, _form.captureEditForm);
router.get("/pdf", _auth["default"].isAuthenticated, (0, _roles.verifyRole)("normal"), _form.renderPDF);

// PERSONAS JURIDICAS
router.get("/formEm", _auth["default"].isAuthenticated, (0, _roles.verifyRole)("perJur"), _empresa.renderFormem);
router.post("/formEm", _auth["default"].isAuthenticated, (0, _roles.verifyRole)("perJur"), _multer.uploadFileEm, _empresa.captureFormEm);
router.post("/editEm", _auth["default"].isAuthenticated, (0, _roles.verifyRole)("perJur"), _multer.uploadFileEm, _empresa.captureEditFormEm);
router.get("/pdfEm", _auth["default"].isAuthenticated, (0, _roles.verifyRole)("perJur"), _empresa.renderPDFEm);

// ADMINISTRACION
router.get("/administracion", (0, _roles.verifyRole)("admin"), _admin.renderAdmin);
router.post("/administracion", (0, _roles.verifyRole)("admin"), _admin.filtroBuscadorAdmin);
router.post("/administracion/PJ", (0, _roles.verifyRole)("admin"), _admin.adminPJ);
router.post("/administracion/PF", (0, _roles.verifyRole)("admin"), _admin.adminPF);
router.post("/administracion/update/sitiaavim", (0, _roles.verifyRole)("admin"), _admin.updateAdminiaavim);
router.post("/administracion/update/email", (0, _roles.verifyRole)("admin"), _admin.updateAdminEmail);

// BUSCADOR
router.get("/buscador/PF", _buscador.renderBuscadorPersonas);
router.post("/buscador/PF", _buscador.filtroBuscadorPersonas);
router.get("/buscador/PJ", _buscador.renderBuscadorEmpresas);
router.post("/buscador/PJ", _buscador.filtroBuscadorEmpresas);
var _default = exports["default"] = router;