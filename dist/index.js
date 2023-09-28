"use strict";

var _app = _interopRequireDefault(require("./app"));
require("./database");
var _config = require("./config");
var _https = _interopRequireDefault(require("https"));
var _fs = _interopRequireDefault(require("fs"));
var _buscador = require("./helpers/buscador");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Configuración del servidor HTTPS con los certificados
var options = {
  key: _fs["default"].readFileSync(_config.KEY),
  cert: _fs["default"].readFileSync(_config.CERT)
};
_https["default"].createServer(options, _app["default"]).listen(_config.PORT, function () {
  console.log("Servidor HTTPS en ejecución en el puerto", _config.PORT);
});