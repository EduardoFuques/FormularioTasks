"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autenticacion = void 0;
exports.deleteTempDir = deleteTempDir;
exports.updatePasswordController = exports.signUpUserApi = exports.signUpUser = exports.signUpPJ = exports.restablecerPassword = exports.resetPasswordController = exports.renderSignUpPJ = exports.renderSignUp = exports.renderSignIn = exports.renderPassword = exports.mostrarErroresFlash = exports.logOut = void 0;
var _Usuarios = _interopRequireDefault(require("../models/Usuarios"));
var _passport = _interopRequireDefault(require("../config/passport"));
var _Contador = require("../models/Contador");
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _nodemailerSmtpTransport = _interopRequireDefault(require("nodemailer-smtp-transport"));
var _resetPassword = require("../helpers/resetPassword");
var _config = require("../config");
var _validator = _interopRequireDefault(require("validator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var renderSignUp = exports.renderSignUp = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          res.render("registro");
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function renderSignUp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var renderSignUpPJ = exports.renderSignUpPJ = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          res.render("registroPJ");
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function renderSignUpPJ(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
function codRepa(_x5) {
  return _codRepa.apply(this, arguments);
}
function _codRepa() {
  _codRepa = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(opcionPerJur) {
    var letters, seq, letter1Index, letter1, letter2Index, letter2, number1, number2, codigoRepa;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          if (!(opcionPerJur === "SI")) {
            _context11.next = 7;
            break;
          }
          _context11.next = 4;
          return (0, _Contador.getNextSequenceValuePJ)("codigoRepaPJ");
        case 4:
          seq = _context11.sent;
          _context11.next = 10;
          break;
        case 7:
          _context11.next = 9;
          return (0, _Contador.getNextSequenceValue)("codigoRepa");
        case 9:
          seq = _context11.sent;
        case 10:
          letter1Index = Math.floor(seq / 26000);
          letter1 = letters[letter1Index];
          letter2Index = Math.floor(seq / 100) % 26;
          letter2 = letters[letter2Index];
          number1 = Math.floor(seq / 10) % 10;
          number2 = seq % 10;
          codigoRepa = opcionPerJur === "SI" ? "PJ".concat(number1).concat(number2) : "".concat(letter1).concat(letter2).concat(number1).concat(number2);
          return _context11.abrupt("return", codigoRepa);
        case 18:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return _codRepa.apply(this, arguments);
}
var signUpUser = exports.signUpUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var errors, _req$body, opcion, nombre, apellido, usuario, email, password, confirm_password, Vopcion, Vnombre, Vapellido, Vusuario, isEmailValid, Vemail, _user, opcionPerJur, codigoRepa, userDirectory, user, rol, emailUser, dniUser, tipoDoc, newUser;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          errors = [];
          _req$body = req.body, opcion = _req$body.opcion, nombre = _req$body.nombre, apellido = _req$body.apellido, usuario = _req$body.usuario, email = _req$body.email, password = _req$body.password, confirm_password = _req$body.confirm_password;
          Vopcion = _validator["default"].escape(opcion);
          Vnombre = _validator["default"].escape(nombre);
          Vapellido = _validator["default"].escape(apellido);
          Vusuario = _validator["default"].escape(usuario);
          isEmailValid = _validator["default"].isEmail(email);
          if (isEmailValid) {
            Vemail = email;
          } else {
            errors.push({
              text: "El correo es inválido"
            });
            _user = {
              opcion: Vopcion,
              nombre: Vnombre,
              apellido: Vapellido,
              usuario: Vusuario
            };
            res.render("registro", {
              errors: errors,
              user: _user
            });
          }
          opcionPerJur = "NO";
          _context3.next = 12;
          return codRepa(opcionPerJur);
        case 12:
          codigoRepa = _context3.sent;
          userDirectory = _path["default"].join(__dirname, "..", "files", codigoRepa);
          _fs["default"].mkdirSync(userDirectory, {
            recursive: true
          });
          user = {
            opcion: Vopcion,
            nombre: Vnombre,
            apellido: Vapellido,
            usuario: Vusuario,
            email: Vemail
          };
          rol = "normal";
          if (opcionPerJur === "SI") {
            rol = "perJur";
          }
          _context3.next = 20;
          return _Usuarios["default"].findOne({
            email: Vemail
          });
        case 20:
          emailUser = _context3.sent;
          _context3.next = 23;
          return _Usuarios["default"].findOne({
            usuario: Vusuario
          });
        case 23:
          dniUser = _context3.sent;
          if (dniUser) {
            errors.push({
              text: "El DNI ya ha sido registrado"
            });
          }
          if (Vopcion === undefined) {
            errors.push({
              text: "Seleccione tipo de documento"
            });
          }
          if (emailUser) {
            errors.push({
              text: "El correo ya está en uso"
            });
          }
          if (password != confirm_password) {
            errors.push({
              text: "Las contraseñas no coinciden"
            });
          }
          if (password.length < 4) {
            errors.push({
              text: "La contraseña debe tener al menos 4 caracteres"
            });
          }
          if (!(errors.length > 0)) {
            _context3.next = 33;
            break;
          }
          res.render("registro", {
            errors: errors,
            user: user
          });
          _context3.next = 38;
          break;
        case 33:
          tipoDoc = Vopcion;
          newUser = new _Usuarios["default"]({
            tipoDoc: tipoDoc,
            usuario: Vusuario,
            password: password,
            nombre: Vnombre,
            apellido: Vapellido,
            email: Vemail,
            rol: rol,
            codigoRepa: codigoRepa
          });
          _context3.next = 37;
          return newUser.save();
        case 37:
          res.redirect("/");
        case 38:
          _context3.next = 43;
          break;
        case 40:
          _context3.prev = 40;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
        case 43:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 40]]);
  }));
  return function signUpUser(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();
var renderSignIn = exports.renderSignIn = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var errors, rol, successMessage, errorMessage;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          errors = [];
          if (!req.isAuthenticated()) {
            _context4.next = 18;
            break;
          }
          rol = req.user.rol;
          if (!(rol === "perJur")) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.redirect("/formEm"));
        case 7:
          if (!(rol === "admin")) {
            _context4.next = 11;
            break;
          }
          return _context4.abrupt("return", res.redirect("/administracion"));
        case 11:
          if (!(rol == "normal")) {
            _context4.next = 15;
            break;
          }
          return _context4.abrupt("return", res.redirect("/form"));
        case 15:
          errors.push({
            text: "Ha ocurrido un error. Póngase en contacto con administración"
          });
          req.flash('error', errors);
          return _context4.abrupt("return", res.redirect("/logout"));
        case 18:
          successMessage = req.flash('success');
          errorMessage = req.flash('error'); //const successMessage = req.query.successMessage;
          return _context4.abrupt("return", res.render("ingreso", {
            successMessage: successMessage,
            errorMessage: errorMessage
          }));
        case 21:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function renderSignIn(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();
var autenticacion = exports.autenticacion = _passport["default"].authenticate("login", {
  failureRedirect: "/",
  failureFlash: true,
  successRedirect: "/formEm" // Ruta por defecto si no se encuentra rol o rol = normal
});

var mostrarErroresFlash = exports.mostrarErroresFlash = function mostrarErroresFlash(req, res, next) {
  var errores = req.flash("error");
  console.log("Middleware mostrarErroresFlash se está ejecutando");
  if (errores.length > 0) {
    console.error("Errores de autenticación:", errores);
  }
  next();
};
var logOut = exports.logOut = function logOut(req, res, next) {
  var tempDir = req.session.tempDir;
  if (tempDir) {
    deleteTempDir(tempDir, function () {
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  } else {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      var errors = req.flash('error');
      res.redirect('/');
    });
  }
};
function deleteTempDir(tempDir, callback) {
  _fs["default"].rmdir(tempDir, {
    recursive: true
  }, function (err) {
    if (err) {
      console.error("Error al eliminar el directorio temporal ".concat(tempDir, ":"), err);
    } else {
      console.log("Directorio temporal ".concat(tempDir, " eliminado"));
    }
    callback();
  });
}
var renderPassword = exports.renderPassword = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          res.render("password");
        case 1:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function renderPassword(_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();
var restablecerPassword = exports.restablecerPassword = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var email, errorMessage, isEmailValid, Vemail, token, user, transporter, mailOptions;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          email = req.body.email;
          errorMessage = "";
          isEmailValid = _validator["default"].isEmail(email);
          if (isEmailValid) {
            Vemail = email;
          } else {
            errorMessage = "El correo es inválido";
            req.flash('error', errorMessage);
            res.render("password");
          }
          _context6.prev = 4;
          _context6.next = 7;
          return (0, _resetPassword.generateResetPasswordToken)(Vemail);
        case 7:
          token = _context6.sent;
          _context6.next = 10;
          return _Usuarios["default"].findOne({
            email: Vemail
          });
        case 10:
          user = _context6.sent;
          if (user) {
            _context6.next = 15;
            break;
          }
          errorMessage = "No se encontró ningún usuario con el correo electrónico proporcionado";
          req.flash('error', errorMessage);
          return _context6.abrupt("return", res.render('password'));
        case 15:
          transporter = _nodemailer["default"].createTransport((0, _nodemailerSmtpTransport["default"])({
            host: _config.MAIL_HOST,
            port: _config.MAIL_PORT,
            // o el puerto que indique Hostinger
            secure: true,
            // puede ser true si se usa SSL/TLS
            auth: {
              user: _config.MAIL_USER,
              pass: _config.MAIL_PASS
            }
          }));
          mailOptions = {
            from: _config.MAIL_USER,
            to: Vemail,
            subject: "Restablecimiento de contraseña RePA - IAAviM",
            html: ""
          };
          if (user.rol === "normal" || user.rol === "admin") {
            mailOptions.html = "  <h2 class=\"mb-4\">Estimado/a ".concat(user.nombre, " ").concat(user.apellido, "</h2>\n      <p>El proceso de cambio de contrase\xF1a, se ha iniciado. Haga click en el siguiente link para cambiar su contrase\xF1a.</p>\n      <p><a href=\"http://").concat(_config.DOMINIO, "/reset-password/").concat(token, "\">CLICKEE AQUI</a></p>\n      <pre>\n      </pre>\n      <p>Si tiene alguna pregunta o necesita ayuda adicional, no dude en contactarnos por correo electr\xF3nico a <a href=\"mailto:repa@iaavim.gob.ar\">repa@iaavim.gob.ar<a></a>.</strong></p>\n      <p>Este es un mensaje autom\xE1tico generado por nuestro sistema.</p><p><strong> Por favor, no responda a este correo electr\xF3nico.</strong></p>\n      <p>Atentamente,</p><pre>\n      </pre>\n      <p><strong>Silvana Gonzalez Gregori</strong></p> \n      <p>Responsable del Registro Provincial del Audiovisual -RePA-</p>\n      <p>Instituto de Artes Audiovisuales de Misiones -IAAviM-</p>");
          } else if (user.rol === "perJur") {
            mailOptions.html = "<h2 class=\"mb-4\">Estimado/a ".concat(user.nombreEmpresa, "</h2>\n      <p>El proceso de cambio de contrase\xF1a, se ha iniciado. Haga click en el siguiente link para cambiar su contrase\xF1a.</p>\n      <p><a href=\"http://").concat(_config.DOMINIO, "/reset-password/").concat(token, "\">CLICKEE AQUI</a></p>\n      <pre>\n      </pre>\n      <p>Si tiene alguna pregunta o necesita ayuda adicional, no dude en contactarnos por correo electr\xF3nico a <a href=\"mailto:repa@iaavim.gob.ar\">repa@iaavim.gob.ar<a></a>.</strong></p>\n      <p>Este es un mensaje autom\xE1tico generado por nuestro sistema.</p><p><strong> Por favor, no responda a este correo electr\xF3nico.</strong></p>\n      <p>Atentamente,</p><pre>\n      </pre>\n      <p><strong>Silvana Gonzalez Gregori</strong></p> \n      <p>Responsable del Registro Provincial del Audiovisual -RePA-</p>\n      <p>Instituto de Artes Audiovisuales de Misiones -IAAviM-</p>");
          } else {
            mailOptions.html = "";
          }
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              var successMessage = "Correo electr\xF3nico enviado a ".concat(Vemail);
              req.flash('success', successMessage);
              return res.redirect("/");
            }
          });
          _context6.next = 25;
          break;
        case 21:
          _context6.prev = 21;
          _context6.t0 = _context6["catch"](4);
          errorMessage = "No se encontró ningún usuario con el correo electrónico proporcionado";
          return _context6.abrupt("return", res.render('password', {
            error: errorMessage
          }));
        case 25:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[4, 21]]);
  }));
  return function restablecerPassword(_x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();
var resetPasswordController = exports.resetPasswordController = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var errorMessage, token, user;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          errorMessage = "";
          _context7.prev = 1;
          token = req.params.token; // obtener el token desde la URL
          _context7.next = 5;
          return (0, _resetPassword.verifyResetPasswordToken)(token);
        case 5:
          user = _context7.sent;
          // verificar el token
          res.render("reset-password", {
            user: user,
            email: user.email,
            token: token
          });
          _context7.next = 14;
          break;
        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](1);
          errorMessage = "El link ya ha vencido. Intente reestablecer la contraseña nuevamente.";
          req.flash('error', errorMessage);
          return _context7.abrupt("return", res.redirect("/"));
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[1, 9]]);
  }));
  return function resetPasswordController(_x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();
var updatePasswordController = exports.updatePasswordController = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var token, _req$body2, email, password, confirm_password, errorMessage, isEmailValid, Vemail, _user2, user, successMessage;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          token = req.params.token;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password, confirm_password = _req$body2.confirm_password;
          errorMessage = "";
          isEmailValid = _validator["default"].isEmail(email);
          if (!isEmailValid) {
            _context8.next = 8;
            break;
          }
          Vemail = email;
          _context8.next = 14;
          break;
        case 8:
          errorMessage = "El correo es inválido";
          _context8.next = 11;
          return (0, _resetPassword.verifyResetPasswordToken)(token);
        case 11:
          _user2 = _context8.sent;
          req.flash('error', errorMessage);
          res.render("reset-password", {
            user: _user2,
            email: _user2.email,
            token: token
          });
        case 14:
          user = null;
          successMessage = "";
          _context8.prev = 16;
          if (!(password !== confirm_password)) {
            _context8.next = 19;
            break;
          }
          throw new Error("Las contraseñas no coinciden");
        case 19:
          if (!(password.length < 4)) {
            _context8.next = 21;
            break;
          }
          throw new Error("La contraseña debe tener al menos 4 caracteres");
        case 21:
          _context8.next = 23;
          return _Usuarios["default"].findOne({
            email: Vemail
          });
        case 23:
          user = _context8.sent;
          if (user) {
            _context8.next = 26;
            break;
          }
          throw new Error("No se encontró ningún usuario con el correo electrónico proporcionado");
        case 26:
          user.password = password;
          user.resetPasswordToken = null;
          user.resetPasswordExpiration = null;
          _context8.next = 31;
          return user.save();
        case 31:
          successMessage = "La contraseña se actualizó correctamente";
          req.flash('success', successMessage);
          return _context8.abrupt("return", res.redirect("/"));
        case 36:
          _context8.prev = 36;
          _context8.t0 = _context8["catch"](16);
          return _context8.abrupt("return", res.render("reset-password", {
            user: user,
            email: email,
            token: token,
            error: _context8.t0.message
          }));
        case 39:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[16, 36]]);
  }));
  return function updatePasswordController(_x16, _x17) {
    return _ref8.apply(this, arguments);
  };
}();
var signUpUserApi = exports.signUpUserApi = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var errors, _req$body3, opcion, nombre, apellido, usuario, email, password, opcionPerJur, confirm_password, Vopcion, Vnombre, Vapellido, Vusuario, isEmailValid, VopcionPerJur, Vemail, _user3, codigoRepa, userDirectory, user, rol, emailUser, dniUser, tipoDoc, newUser;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          errors = [];
          _req$body3 = req.body, opcion = _req$body3.opcion, nombre = _req$body3.nombre, apellido = _req$body3.apellido, usuario = _req$body3.usuario, email = _req$body3.email, password = _req$body3.password, opcionPerJur = _req$body3.opcionPerJur, confirm_password = _req$body3.confirm_password;
          Vopcion = _validator["default"].escape(opcion);
          Vnombre = _validator["default"].escape(nombre);
          Vapellido = _validator["default"].escape(apellido);
          Vusuario = _validator["default"].escape(usuario);
          isEmailValid = _validator["default"].isEmail(email);
          VopcionPerJur = _validator["default"].escape(opcionPerJur);
          if (isEmailValid) {
            Vemail = email;
          } else {
            errors.push({
              text: "El correo es inválido"
            });
            _user3 = {
              Vopcion: Vopcion,
              Vnombre: Vnombre,
              Vapellido: Vapellido,
              Vusuario: Vusuario
            };
            res.render("registro", {
              errors: errors,
              user: _user3
            });
          }
          _context9.next = 12;
          return codRepa(VopcionPerJur);
        case 12:
          codigoRepa = _context9.sent;
          userDirectory = _path["default"].join(__dirname, "..", "files", codigoRepa);
          _fs["default"].mkdirSync(userDirectory, {
            recursive: true
          });
          user = {
            Vopcion: Vopcion,
            Vnombre: Vnombre,
            Vapellido: Vapellido,
            Vusuario: Vusuario,
            Vemail: Vemail
          };
          rol = "normal";
          if (opcionPerJur === "SI") {
            rol = "perJur";
          }
          _context9.next = 20;
          return _Usuarios["default"].findOne({
            email: Vemail
          });
        case 20:
          emailUser = _context9.sent;
          _context9.next = 23;
          return _Usuarios["default"].findOne({
            usuario: Vusuario
          });
        case 23:
          dniUser = _context9.sent;
          if (dniUser) {
            errors.push({
              text: "El DNI ya ha sido registrado"
            });
          }
          if (opcion === undefined) {
            errors.push({
              text: "Seleccione tipo de documento"
            });
          }
          if (emailUser) {
            errors.push({
              text: "El correo ya está en uso"
            });
          }
          if (password != confirm_password) {
            errors.push({
              text: "Las contraseñas no coinciden"
            });
          }
          if (password.length < 4) {
            errors.push({
              text: "La contraseña debe tener al menos 4 caracteres"
            });
          }
          if (!(errors.length > 0)) {
            _context9.next = 33;
            break;
          }
          res.render("registro", {
            errors: errors,
            user: user
          });
          _context9.next = 37;
          break;
        case 33:
          tipoDoc = Vopcion;
          newUser = new _Usuarios["default"]({
            tipoDoc: tipoDoc,
            usuario: Vusuario,
            password: password,
            nombre: Vnombre,
            apellido: Vapellido,
            email: Vemail,
            rol: rol,
            codigoRepa: codigoRepa
          });
          _context9.next = 37;
          return newUser.save();
        case 37:
          _context9.next = 42;
          break;
        case 39:
          _context9.prev = 39;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);
        case 42:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 39]]);
  }));
  return function signUpUserApi(_x18, _x19) {
    return _ref9.apply(this, arguments);
  };
}();
var signUpPJ = exports.signUpPJ = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var errors, _req$body4, nombreEmpresa, usuario, email, password, confirm_password, VnombreEmpresa, Vusuario, isEmailValid, Vemail, _user4, opcionPerJur, opcion, nombre, apellido, codigoRepa, userDirectory, user, rol, emailUser, dniUser, tipoDoc, newUser;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          errors = [];
          _req$body4 = req.body, nombreEmpresa = _req$body4.nombreEmpresa, usuario = _req$body4.usuario, email = _req$body4.email, password = _req$body4.password, confirm_password = _req$body4.confirm_password;
          VnombreEmpresa = _validator["default"].escape(nombreEmpresa);
          Vusuario = _validator["default"].escape(usuario);
          isEmailValid = _validator["default"].isEmail(email);
          if (isEmailValid) {
            Vemail = email;
          } else {
            errors.push({
              text: "El correo es inválido"
            });
            _user4 = {
              VnombreEmpresa: VnombreEmpresa,
              Vusuario: Vusuario
            };
            res.render("registroPJ", {
              errors: errors,
              user: _user4
            });
          }
          opcionPerJur = "SI";
          opcion = "DNI";
          nombre = " ";
          apellido = " ";
          _context10.next = 13;
          return codRepa(opcionPerJur);
        case 13:
          codigoRepa = _context10.sent;
          userDirectory = _path["default"].join(__dirname, "..", "files", codigoRepa);
          _fs["default"].mkdirSync(userDirectory, {
            recursive: true
          });
          user = {
            opcion: opcion,
            nombre: nombre,
            apellido: apellido,
            Vusuario: Vusuario,
            Vemail: Vemail,
            VnombreEmpresa: VnombreEmpresa
          };
          rol = "normal";
          if (opcionPerJur === "SI") {
            rol = "perJur";
          }
          _context10.next = 21;
          return _Usuarios["default"].findOne({
            email: Vemail
          });
        case 21:
          emailUser = _context10.sent;
          _context10.next = 24;
          return _Usuarios["default"].findOne({
            usuario: Vusuario
          });
        case 24:
          dniUser = _context10.sent;
          if (dniUser) {
            errors.push({
              text: "El CUIL ya ha sido registrado"
            });
          }
          if (opcion === undefined) {
            errors.push({
              text: "Seleccione tipo de documento"
            });
          }
          if (emailUser) {
            errors.push({
              text: "El correo ya está en uso"
            });
          }
          if (password != confirm_password) {
            errors.push({
              text: "Las contraseñas no coinciden"
            });
          }
          if (password.length < 4) {
            errors.push({
              text: "La contraseña debe tener al menos 4 caracteres"
            });
          }
          if (!(errors.length > 0)) {
            _context10.next = 34;
            break;
          }
          res.render("registroPJ", {
            errors: errors,
            user: user
          });
          _context10.next = 39;
          break;
        case 34:
          tipoDoc = opcion;
          newUser = new _Usuarios["default"]({
            tipoDoc: tipoDoc,
            usuario: Vusuario,
            password: password,
            nombre: nombre,
            apellido: apellido,
            email: Vemail,
            rol: rol,
            codigoRepa: codigoRepa,
            nombreEmpresa: VnombreEmpresa
          });
          _context10.next = 38;
          return newUser.save();
        case 38:
          res.redirect("/");
        case 39:
          _context10.next = 44;
          break;
        case 41:
          _context10.prev = 41;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);
        case 44:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 41]]);
  }));
  return function signUpPJ(_x20, _x21) {
    return _ref10.apply(this, arguments);
  };
}();