"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SESSION_SECRET = exports.SESSION_MAX_AGE = exports.PORT = exports.MONGODB_URI = exports.MAIL_USER = exports.MAIL_PORT = exports.MAIL_PASS = exports.MAIL_HOST = exports.KEY = exports.JWT_SECRET = exports.FILE_SIZE = exports.DOMINIO = exports.CERT = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();

//DATABASE
var MONGODB_URI = process.env.MONGODB_URI;

//SERVIDOR
exports.MONGODB_URI = MONGODB_URI;
var DOMINIO = process.env.DOMINIO || "localhost:3000";
exports.DOMINIO = DOMINIO;
var PORT = process.env.PORT || 3000;

//SESSION
exports.PORT = PORT;
var SESSION_SECRET = process.env.SESSION_SECRET || "secret";
exports.SESSION_SECRET = SESSION_SECRET;
var SESSION_MAX_AGE = process.env.SESSION_MAX_AGE || 1800000;
exports.SESSION_MAX_AGE = SESSION_MAX_AGE;
var FILE_SIZE = process.env.FILE_SIZE || 1000000;

//JWT
exports.FILE_SIZE = FILE_SIZE;
var JWT_SECRET = process.env.JWT_SECRET || "secret";

//MAIL
exports.JWT_SECRET = JWT_SECRET;
var MAIL_USER = process.env.MAIL_USER;
exports.MAIL_USER = MAIL_USER;
var MAIL_PASS = process.env.MAIL_PASS;
exports.MAIL_PASS = MAIL_PASS;
var MAIL_HOST = process.env.MAIL_HOST;
exports.MAIL_HOST = MAIL_HOST;
var MAIL_PORT = process.env.MAIL_PORT;

//CERTS
exports.MAIL_PORT = MAIL_PORT;
var KEY = process.env.KEY;
exports.KEY = KEY;
var CERT = process.env.CERT;
exports.CERT = CERT;