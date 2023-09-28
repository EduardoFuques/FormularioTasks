"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SESSION_SECRET = exports.SESSION_MAX_AGE = exports.PORT = exports.MONGODB_URI = exports.MAIL_USER = exports.MAIL_PORT = exports.MAIL_PASS = exports.MAIL_HOST = exports.KEY = exports.JWT_SECRET = exports.FILE_SIZE = exports.DOMINIO = exports.CERT = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();

//DATABASE
var MONGODB_URI = exports.MONGODB_URI = process.env.MONGODB_URI;

//SERVIDOR
var DOMINIO = exports.DOMINIO = process.env.DOMINIO || "localhost:3000";
var PORT = exports.PORT = process.env.PORT || 3000;

//SESSION
var SESSION_SECRET = exports.SESSION_SECRET = process.env.SESSION_SECRET || "secret";
var SESSION_MAX_AGE = exports.SESSION_MAX_AGE = process.env.SESSION_MAX_AGE || 1800000;
var FILE_SIZE = exports.FILE_SIZE = process.env.FILE_SIZE || 1000000;

//JWT
var JWT_SECRET = exports.JWT_SECRET = process.env.JWT_SECRET || "secret";

//MAIL
var MAIL_USER = exports.MAIL_USER = process.env.MAIL_USER;
var MAIL_PASS = exports.MAIL_PASS = process.env.MAIL_PASS;
var MAIL_HOST = exports.MAIL_HOST = process.env.MAIL_HOST;
var MAIL_PORT = exports.MAIL_PORT = process.env.MAIL_PORT;

//CERTS
var KEY = exports.KEY = process.env.KEY;
var CERT = exports.CERT = process.env.CERT;