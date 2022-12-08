"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SESSION_SECRET = exports.PORT = exports.MONGODB_URI = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://julio:Julio2022@172.27.2.249:27017/appj';
exports.MONGODB_URI = MONGODB_URI;
var PORT = process.env.PORT || 3000;
exports.PORT = PORT;
var SESSION_SECRET = process.env.SESSION_SECRET || "secret";
exports.SESSION_SECRET = SESSION_SECRET;