"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var renderSignUp = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res.render("registro");
          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function renderSignUp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.renderSignUp = renderSignUp;
var renderSignUpPJ = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            res.render("registroPJ");
          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function renderSignUpPJ(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.renderSignUpPJ = renderSignUpPJ;
function codRepa(_x5) {
  return _codRepa.apply(this, arguments);
}
function _codRepa() {
  _codRepa = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(opcionPerJur) {
    var letters, seq, letter1Index, letter1, letter2Index, letter2, number1, number2, codigoRepa;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
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
      }
    }, _callee11);
  }));
  return _codRepa.apply(this, arguments);
}
var signUpUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var errors, _req$body, opcion, nombre, apellido, usuario, email, password, confirm_password, Vopcion, Vnombre, Vapellido, Vusuario, isEmailValid, Vemail, _user, opcionPerJur, codigoRepa, userDirectory, user, rol, emailUser, dniUser, tipoDoc, newUser;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
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
      }
    }, _callee3, null, [[0, 40]]);
  }));
  return function signUpUser(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();
exports.signUpUser = signUpUser;
var renderSignIn = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var errors, rol, successMessage;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
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
            successMessage = req.flash('success'); //const successMessage = req.query.successMessage;
            return _context4.abrupt("return", res.render("ingreso", {
              successMessage: successMessage
            }));
          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function renderSignIn(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();
exports.renderSignIn = renderSignIn;
var autenticacion = _passport["default"].authenticate("login", {
  failureRedirect: "/",
  failureFlash: true,
  successRedirect: "/formEm" // Ruta por defecto si no se encuentra rol o rol = normal
});
exports.autenticacion = autenticacion;
var mostrarErroresFlash = function mostrarErroresFlash(req, res, next) {
  var errores = req.flash("error");
  console.log("Middleware mostrarErroresFlash se está ejecutando");
  if (errores.length > 0) {
    console.error("Errores de autenticación:", errores);
  }
  next();
};
exports.mostrarErroresFlash = mostrarErroresFlash;
var logOut = function logOut(req, res, next) {
  var tempDir = req.session.tempDir;
  if (tempDir) {
    deleteTempDir(tempDir, function () {
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        var errors = req.flash('error');
        res.render('ingreso', {
          errors: errors
        });
      });
    });
  } else {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      var errors = req.flash('error');
      res.render('ingreso', {
        errors: errors
      });
    });
  }
};
exports.logOut = logOut;
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
var renderPassword = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            res.render("password");
          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return function renderPassword(_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();
exports.renderPassword = renderPassword;
var restablecerPassword = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var email, errorMessage, isEmailValid, Vemail, token, user, transporter, mailOptions;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
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
      }
    }, _callee6, null, [[4, 21]]);
  }));
  return function restablecerPassword(_x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();
exports.restablecerPassword = restablecerPassword;
var resetPasswordController = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var errorMessage, token, user;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
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
      }
    }, _callee7, null, [[1, 9]]);
  }));
  return function resetPasswordController(_x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();
exports.resetPasswordController = resetPasswordController;
var updatePasswordController = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var token, _req$body2, email, password, confirm_password, errorMessage, isEmailValid, Vemail, _user2, user, successMessage;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
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
      }
    }, _callee8, null, [[16, 36]]);
  }));
  return function updatePasswordController(_x16, _x17) {
    return _ref8.apply(this, arguments);
  };
}();
exports.updatePasswordController = updatePasswordController;
var signUpUserApi = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var errors, _req$body3, opcion, nombre, apellido, usuario, email, password, opcionPerJur, confirm_password, Vopcion, Vnombre, Vapellido, Vusuario, isEmailValid, VopcionPerJur, Vemail, _user3, codigoRepa, userDirectory, user, rol, emailUser, dniUser, tipoDoc, newUser;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
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
      }
    }, _callee9, null, [[0, 39]]);
  }));
  return function signUpUserApi(_x18, _x19) {
    return _ref9.apply(this, arguments);
  };
}();
exports.signUpUserApi = signUpUserApi;
var signUpPJ = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var errors, _req$body4, nombreEmpresa, usuario, email, password, confirm_password, VnombreEmpresa, Vusuario, isEmailValid, Vemail, _user4, opcionPerJur, opcion, nombre, apellido, codigoRepa, userDirectory, user, rol, emailUser, dniUser, tipoDoc, newUser;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
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
      }
    }, _callee10, null, [[0, 41]]);
  }));
  return function signUpPJ(_x20, _x21) {
    return _ref10.apply(this, arguments);
  };
}();
exports.signUpPJ = signUpPJ;