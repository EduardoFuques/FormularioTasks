"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dniUpload = exports.cvUpload = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
var _config = require("../config");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var hoy = new Date();
var hoyformateado = hoy.toISOString().replace(/[^0-9]/g, "-").slice(0, -5);
var storage = _multer["default"].diskStorage({
  destination: _path["default"].join(__dirname, "..", "files"),
  filename: function filename(req, file, cb) {
    cb(null, "".concat(file.fieldname.toUpperCase(), "-").concat(hoyformateado, "-").concat(req.user.usuario.toString()).concat(_path["default"].extname(file.originalname).toLowerCase()));
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
  fileFilter: fileFilter(/pdf|doc|docx|odt/),
  dest: _path["default"].join(__dirname, "..", "files")
};
var cvUpload = exports.cvUpload = (0, _multer["default"])(options).single("cvFile");
options.fileFilter = fileFilter(/pdf/);
var dniUpload = exports.dniUpload = (0, _multer["default"])(options).single("dniFile");