"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFileEm = exports.uploadFile = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
var _config = require("../config");
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var hoy = new Date();
var hoyformateado = hoy.toISOString().replace(/[^0-9]/g, "").slice(0, -5);
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    var codigoRepa = req.user.codigoRepa;
    var dir = _path["default"].join(__dirname, "..", "files", codigoRepa);
    _fs["default"].mkdirSync(dir, {
      recursive: true
    });
    cb(null, dir);
  },
  filename: function filename(req, file, cb) {
    var usuario = req.user.usuario;
    var codigoRepa = req.user.codigoRepa;
    var fieldName = file.fieldname.toUpperCase();
    var extension = _path["default"].extname(file.originalname).toLowerCase();
    var timestamp = hoyformateado;
    var filename = "".concat(usuario, "-").concat(fieldName, "-").concat(timestamp).concat(extension);
    cb(null, filename);
  }
});
var fileFilter = function fileFilter(filetypes) {
  return function (req, file, cb) {
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(_path["default"].extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: tipo de archivo no soportado");
  };
};
var options = {
  storage: storage,
  limits: {
    fileSize: _config.FILE_SIZE
  },
  fileFilter: fileFilter(/pdf|doc|docx|odt|PDF|DOC|DOCX|ODT/),
  dest: _path["default"].join(__dirname, "..", "files")
};
var uploadFile = (0, _multer["default"])(options).fields([{
  name: "cvFile",
  maxCount: 1
}, {
  name: "dniFile",
  maxCount: 1
}]);
exports.uploadFile = uploadFile;
var uploadFileEm = (0, _multer["default"])(options).fields([{
  name: "estatutoFile",
  maxCount: 1
}, {
  name: "dniFile",
  maxCount: 1
}]);
exports.uploadFileEm = uploadFileEm;