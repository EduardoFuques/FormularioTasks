"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderPDFEm = exports.renderFormem = exports.captureFormEm = exports.captureEditFormEm = void 0;
var _Formulario = _interopRequireDefault(require("../models/Formulario"));
var _pdfLib = require("pdf-lib");
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _arrays = require("../helpers/arrays");
var _dateFns = require("date-fns");
var _validator = _interopRequireDefault(require("validator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var renderFormem = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var userID, _req$user, tipoDoc, usuario, nombre, apellido, email, codigoRepa, nombreEmpresa, usuarioEncontrado, datos, nombreEmpresa2, editar, perJur, _datos, _editar, _perJur, _nombreEmpresa, calle, formattedDNIDate, formattedCVDate;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userID = req.session.passport.user;
          _req$user = req.user, tipoDoc = _req$user.tipoDoc, usuario = _req$user.usuario, nombre = _req$user.nombre, apellido = _req$user.apellido, email = _req$user.email, codigoRepa = _req$user.codigoRepa, nombreEmpresa = _req$user.nombreEmpresa;
          _context.next = 5;
          return _Formulario["default"].findOne({
            usuario: usuario
          }).lean();
        case 5:
          usuarioEncontrado = _context.sent;
          if (!usuarioEncontrado) {
            datos = {
              userID: userID,
              tipoDoc: tipoDoc,
              usuario: usuario,
              nombre: nombre,
              apellido: apellido,
              email: email,
              nombreEmpresa: nombreEmpresa
            };
            nombreEmpresa2 = datos.nombreEmpresa.toString();
            editar = false;
            perJur = true;
            res.render("indexEmpresa", {
              datos: datos,
              codigoRepa: codigoRepa,
              editar: editar,
              perJur: perJur,
              nombreEmpresa: nombreEmpresa2
            });
          } else {
            _datos = usuarioEncontrado;
            _editar = true;
            _perJur = true;
            _nombreEmpresa = _datos.nombreEmpresa.toString();
            calle = _datos.domicilio[0].calle.toString();
            formattedDNIDate = (0, _dateFns.format)(_datos.dniFileDate, 'dd/MM/yyyy');
            formattedCVDate = (0, _dateFns.format)(_datos.cvFileDate, 'dd/MM/yyyy');
            res.render("editEmpresa", {
              datos: _datos,
              nombreEmpresa: _nombreEmpresa,
              codigoRepa: codigoRepa,
              domicilio: _datos.domicilio[0],
              calle: calle,
              telefono: _datos.telefono[0],
              editar: _editar,
              perJur: _perJur,
              formattedDNIDate: formattedDNIDate,
              formattedCVDate: formattedCVDate
            });
          }
          _context.next = 12;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0.message);
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function renderFormem(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.renderFormem = renderFormem;
var captureFormEm = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body, sexo, sitAfip, telFijo, movilPpal, movilAlt, localidad, cp, calle, numero, piso, dpto, razonSocial, nombreFantasia, apellido, nombre, _req$user2, tipoDoc, usuario, nombreEmpresa, email, Vsexo, VsitAfip, VtelFijo, VmovilPpal, VmovilAlt, Vlocalidad, Vcp, Vcalle, Vnumero, Vpiso, Vdpto, VrazonSocial, VnombreFantasia, Vapellido, Vnombre, VtipoDoc, Vusuario, VnombreEmpresa, isEmailValid, Vemail, errorMessage, cvFileUrl, dniFileUrl, cvFilename, cvFileDate, cvFileDateISO, dniFilename, dniFileDate, dniFileDateISO, newForm;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, sexo = _req$body.sexo, sitAfip = _req$body.sitAfip, telFijo = _req$body.telFijo, movilPpal = _req$body.movilPpal, movilAlt = _req$body.movilAlt, localidad = _req$body.localidad, cp = _req$body.cp, calle = _req$body.calle, numero = _req$body.numero, piso = _req$body.piso, dpto = _req$body.dpto, razonSocial = _req$body.razonSocial, nombreFantasia = _req$body.nombreFantasia, apellido = _req$body.apellido, nombre = _req$body.nombre;
          _req$user2 = req.user, tipoDoc = _req$user2.tipoDoc, usuario = _req$user2.usuario, nombreEmpresa = _req$user2.nombreEmpresa, email = _req$user2.email;
          Vsexo = _validator["default"].escape(sexo);
          VsitAfip = _validator["default"].escape(sitAfip);
          VtelFijo = telFijo === "/" ? telFijo : _validator["default"].escape(telFijo);
          VmovilPpal = movilPpal === "/" ? movilPpal : _validator["default"].escape(movilPpal);
          VmovilAlt = movilAlt === "/" ? movilAlt : _validator["default"].escape(movilAlt);
          Vlocalidad = _validator["default"].escape(localidad);
          Vcp = _validator["default"].escape(cp);
          Vcalle = calle === "/" ? calle : _validator["default"].escape(calle);
          Vnumero = numero === "/" ? numero : _validator["default"].escape(numero);
          Vpiso = piso === "/" ? piso : _validator["default"].escape(piso);
          Vdpto = dpto === "/" ? dpto : _validator["default"].escape(dpto);
          VrazonSocial = _validator["default"].escape(razonSocial);
          VnombreFantasia = _validator["default"].escape(nombreFantasia);
          Vapellido = _validator["default"].escape(apellido);
          Vnombre = _validator["default"].escape(nombre);
          VtipoDoc = _validator["default"].escape(tipoDoc);
          Vusuario = _validator["default"].escape(usuario);
          VnombreEmpresa = _validator["default"].escape(nombreEmpresa);
          isEmailValid = _validator["default"].isEmail(email);
          errorMessage = "";
          if (!isEmailValid) {
            _context2.next = 27;
            break;
          }
          Vemail = email;
          _context2.next = 30;
          break;
        case 27:
          errorMessage = "Ha ocurrido un error. Póngase en contacto con administración";
          req.flash("error", errorMessage);
          return _context2.abrupt("return", res.redirect("/logout"));
        case 30:
          cvFileUrl = "".concat(encodeURIComponent(req.protocol), "://").concat(encodeURIComponent(req.get("host")), "/files/").concat(encodeURIComponent(req.user.codigoRepa), "/").concat(encodeURIComponent(req.files.estatutoFile[0].filename));
          dniFileUrl = "".concat(encodeURIComponent(req.protocol), "://").concat(encodeURIComponent(req.get("host")), "/files/").concat(encodeURIComponent(req.user.codigoRepa), "/").concat(encodeURIComponent(req.files.dniFile[0].filename));
          cvFilename = encodeURIComponent(req.files.estatutoFile[0].filename);
          cvFileDate = cvFilename.substring(cvFilename.lastIndexOf("-") + 1, cvFilename.lastIndexOf("."));
          cvFileDateISO = cvFileDate.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:00Z');
          dniFilename = encodeURIComponent(req.files.dniFile[0].filename);
          dniFileDate = dniFilename.substring(dniFilename.lastIndexOf("-") + 1, dniFilename.lastIndexOf("."));
          dniFileDateISO = dniFileDate.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:00Z');
          newForm = new _Formulario["default"]({
            tipoDoc: VtipoDoc,
            usuario: Vusuario,
            nombre: Vnombre,
            apellido: Vapellido,
            email: Vemail,
            sexo: Vsexo,
            //ok
            sitAfip: VsitAfip,
            //ok
            sitIaavim: false,
            domicilio: {
              calle: Vcalle,
              //ok
              numero: Vnumero,
              //ok
              piso: Vpiso,
              //ok
              depto: Vdpto,
              //ok
              localidad: Vlocalidad,
              cp: Vcp //ok
            },

            //ok
            telefono: {
              fijo: VtelFijo,
              movil: VmovilPpal,
              alternativo: VmovilAlt
            },
            //ok
            razonSocial: VrazonSocial,
            nombreFantasia: VnombreFantasia,
            nombreEmpresa: VnombreEmpresa,
            cvFileUrl: cvFileUrl,
            cvFileDate: new Date(cvFileDateISO),
            dniFileUrl: dniFileUrl,
            dniFileDate: new Date(dniFileDateISO)
          });
          _context2.next = 41;
          return newForm.save();
        case 41:
          res.render("pantalla-ok", {
            perJur: true
          });
          _context2.next = 47;
          break;
        case 44:
          _context2.prev = 44;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0.message);
        case 47:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 44]]);
  }));
  return function captureFormEm(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.captureFormEm = captureFormEm;
var captureEditFormEm = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body2, sexo, sitAfip, telFijo, movilPpal, movilAlt, localidad, cp, calle, numero, piso, dpto, razonSocial, nombreFantasia, nombres, apellido, usuario, Vsexo, VsitAfip, VtelFijo, VmovilPpal, VmovilAlt, Vlocalidad, Vcp, Vcalle, Vnumero, Vpiso, Vdpto, VrazonSocial, VnombreFantasia, Vapellido, Vnombre, Vusuario, usuarioEncontrado, cvFileUrl, cvFilename, cvFileDate, cvFileDateISO, dniFileUrl, dniFilename, dniFileDate, dniFileDateISO, editForm;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body2 = req.body, sexo = _req$body2.sexo, sitAfip = _req$body2.sitAfip, telFijo = _req$body2.telFijo, movilPpal = _req$body2.movilPpal, movilAlt = _req$body2.movilAlt, localidad = _req$body2.localidad, cp = _req$body2.cp, calle = _req$body2.calle, numero = _req$body2.numero, piso = _req$body2.piso, dpto = _req$body2.dpto, razonSocial = _req$body2.razonSocial, nombreFantasia = _req$body2.nombreFantasia, nombres = _req$body2.nombres, apellido = _req$body2.apellido;
          usuario = req.user.usuario;
          Vsexo = _validator["default"].escape(sexo);
          VsitAfip = _validator["default"].escape(sitAfip);
          VtelFijo = telFijo === "/" ? telFijo : _validator["default"].escape(telFijo);
          VmovilPpal = movilPpal === "/" ? movilPpal : _validator["default"].escape(movilPpal);
          VmovilAlt = movilAlt === "/" ? movilAlt : _validator["default"].escape(movilAlt);
          Vlocalidad = _validator["default"].escape(localidad);
          Vcp = _validator["default"].escape(cp);
          Vcalle = calle === "/" ? calle : _validator["default"].escape(calle);
          Vnumero = numero === "/" ? numero : _validator["default"].escape(numero);
          Vpiso = piso === "/" ? piso : _validator["default"].escape(piso);
          Vdpto = dpto === "/" ? dpto : _validator["default"].escape(dpto);
          VrazonSocial = _validator["default"].escape(razonSocial);
          VnombreFantasia = _validator["default"].escape(nombreFantasia);
          Vapellido = _validator["default"].escape(apellido);
          Vnombre = _validator["default"].escape(nombres);
          Vusuario = _validator["default"].escape(usuario);
          _context3.next = 21;
          return _Formulario["default"].findOne({
            Vusuario: Vusuario
          }).lean();
        case 21:
          usuarioEncontrado = _context3.sent;
          if (req.files.estatutoFile && req.files.estatutoFile.length > 0 && req.files.estatutoFile[0].filename) {
            cvFileUrl = "".concat(encodeURIComponent(req.protocol), "://").concat(encodeURIComponent(req.get("host")), "/files/").concat(encodeURIComponent(req.user.codigoRepa), "/").concat(encodeURIComponent(req.files.estatutoFile[0].filename));
            dniFileUrl = "".concat(encodeURIComponent(req.protocol), "://").concat(encodeURIComponent(req.get("host")), "/files/").concat(encodeURIComponent(req.user.codigoRepa), "/").concat(encodeURIComponent(req.files.dniFile[0].filename));
            cvFilename = encodeURIComponent(req.files.estatutoFile[0].filename);
            cvFileDate = cvFilename.substring(cvFilename.lastIndexOf("-") + 1, cvFilename.lastIndexOf("."));
            cvFileDateISO = cvFileDate.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:00Z');
          } else {
            cvFileUrl = usuarioEncontrado.cvFileUrl;
            cvFileDateISO = usuarioEncontrado.cvFileDate;
          }
          if (req.files.dniFile && req.files.dniFile.length > 0 && req.files.dniFile[0].filename) {
            dniFileUrl = "".concat(encodeURIComponent(req.protocol), "://").concat(encodeURIComponent(req.get("host")), "/files/").concat(encodeURIComponent(req.user.codigoRepa), "/").concat(encodeURIComponent(req.files.dniFile[0].filename));
            dniFilename = encodeURIComponent(req.files.dniFile[0].filename);
            dniFileDate = dniFilename.substring(dniFilename.lastIndexOf("-") + 1, dniFilename.lastIndexOf("."));
            dniFileDateISO = new Date(dniFileDate.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1-$2-$3T$4:$5:00Z"));
          } else {
            dniFileUrl = usuarioEncontrado.dniFileUrl;
            dniFileDateISO = usuarioEncontrado.dniFileDate;
          }
          editForm = {
            sexo: Vsexo,
            //ok
            nombre: Vnombre,
            apellido: Vapellido,
            sitAfip: VsitAfip,
            //ok
            domicilio: {
              calle: Vcalle,
              //ok
              numero: Vnumero,
              //ok
              piso: Vpiso,
              //ok
              depto: Vdpto,
              //ok
              localidad: Vlocalidad,
              cp: Vcp //ok
            },

            //ok
            telefono: {
              fijo: VtelFijo,
              movil: VmovilPpal,
              alternativo: VmovilAlt
            },
            //ok
            razonSocial: VrazonSocial,
            nombreFantasia: VnombreFantasia,
            cvFileUrl: cvFileUrl,
            cvFileDate: cvFileDateISO,
            dniFileUrl: dniFileUrl,
            dniFileDate: dniFileDateISO
          };
          _context3.next = 27;
          return _Formulario["default"].updateOne({
            usuario: Vusuario
          }, {
            $set: editForm
          }, function (error) {
            if (error) {
              console.log(error);
              res.send(error);
            } else {
              res.render("pantalla-ok", {
                perJur: true
              });
            }
          });
        case 27:
          _context3.next = 32;
          break;
        case 29:
          _context3.prev = 29;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0.message);
        case 32:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 29]]);
  }));
  return function captureEditFormEm(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.captureEditFormEm = captureEditFormEm;
var renderPDFEm = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var userID, _req$user3, tipoDoc, usuario, nombre, apellido, email, codigoRepa, usuarioEncontrado, tempFilePath, datos, _datos2, resLegal, calle, telefono, domicilio, indiceLocalidad, indiceLocalidadNumero, localidadOpc, nombreLocalidad, doc;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          //   Recuperar datos del usuario
          userID = req.session.passport.user;
          _req$user3 = req.user, tipoDoc = _req$user3.tipoDoc, usuario = _req$user3.usuario, nombre = _req$user3.nombre, apellido = _req$user3.apellido, email = _req$user3.email, codigoRepa = _req$user3.codigoRepa;
          _context5.next = 5;
          return _Formulario["default"].findOne({
            usuario: usuario
          }).lean();
        case 5:
          usuarioEncontrado = _context5.sent;
          tempFilePath = null; // Inicializar la variable tempFilePath con null
          if (!usuarioEncontrado) {
            datos = {
              userID: userID,
              tipoDoc: tipoDoc,
              usuario: usuario,
              nombre: nombre,
              apellido: apellido,
              email: email
            };
            res.render("index", {
              datos: datos,
              codigoRepa: codigoRepa
            });
          } else {
            _datos2 = usuarioEncontrado;
            resLegal = _datos2.apellido + ", " + _datos2.nombre;
            calle = _datos2.domicilio[0].calle.toString();
            telefono = _datos2.telefono[0];
            domicilio = _datos2.domicilio[0]; // Obtener el índice de la localidad del objeto domicilio
            indiceLocalidad = domicilio.localidad; // Buscar el objeto de la localidad en el array domiciliosOpc
            indiceLocalidadNumero = parseInt(indiceLocalidad, 10);
            localidadOpc = _arrays.domiciliosOpc.find(function (opc) {
              return opc.opciones.indice === indiceLocalidadNumero;
            }); // Obtener el nombre de la localidad
            nombreLocalidad = localidadOpc ? localidadOpc.localidad : "";
            doc = /*#__PURE__*/function () {
              var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
                var pdfData, pdfDoc, form, codRepaField, nomEmprField, razSociField, cuitField, resLegalField, tipoDocField, numDocField, emailField, sexoField, sitAfipField, fijoField, movilField, movilAltField, localidadField, distritoField, departamentoField, cpField, calleField, numeroField, pisoField, deptoField, nomFantasField, _tempFilePath, pdfBytes, file;
                return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                  while (1) switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.prev = 0;
                      // Cargar el archivo PDF
                      pdfData = _fs["default"].readFileSync("PDF_PJ_FORM.pdf");
                      _context4.next = 4;
                      return _pdfLib.PDFDocument.load(pdfData);
                    case 4:
                      pdfDoc = _context4.sent;
                      form = pdfDoc.getForm();
                      codRepaField = form.getField("codRepa");
                      nomEmprField = form.getField("nomEmpr");
                      razSociField = form.getField("razSoci");
                      cuitField = form.getField("cuit");
                      resLegalField = form.getField("resLegal");
                      tipoDocField = form.getField("tipoDoc");
                      numDocField = form.getField("numDoc");
                      emailField = form.getField("email");
                      sexoField = form.getField("sexo");
                      sitAfipField = form.getField("sitAfip");
                      fijoField = form.getField("fijo");
                      movilField = form.getField("movil");
                      movilAltField = form.getField("movilAlt");
                      localidadField = form.getField("localidad");
                      distritoField = form.getField("distrito");
                      departamentoField = form.getField("departamento");
                      cpField = form.getField("cp");
                      calleField = form.getField("calle");
                      numeroField = form.getField("numero");
                      pisoField = form.getField("piso");
                      deptoField = form.getField("depto");
                      nomFantasField = form.getField("nomFantas");
                      codRepaField.setText(codigoRepa.toString());
                      nomEmprField.setText("  " + _datos2.nombreEmpresa);
                      razSociField.setText("  " + _datos2.razonSocial.toString());
                      cuitField.setText("  " + _datos2.usuario.toString());
                      resLegalField.setText("  " + resLegal);
                      tipoDocField.setText("  " + _datos2.tipoDoc.toString());
                      numDocField.setText("  " + _datos2.usuario.toString());
                      emailField.setText("  " + _datos2.email.toString());
                      sexoField.setText("  " + _datos2.sexo.toString());
                      sitAfipField.setText("  " + _datos2.sitAfip.toString());
                      fijoField.setText("  " + telefono.fijo.toString());
                      movilField.setText("  " + telefono.movil.toString());
                      movilAltField.setText("  " + telefono.alternativo.toString());
                      localidadField.setText("  " + nombreLocalidad);
                      distritoField.setText("  " + localidadOpc.opciones.Distrito);
                      departamentoField.setText("  " + localidadOpc.opciones.Departamento);
                      cpField.setText("  " + domicilio.cp.toString());
                      calleField.setText("  " + calle.toString());
                      numeroField.setText("  " + domicilio.numero.toString());
                      pisoField.setText("  " + domicilio.piso.toString());
                      deptoField.setText("  " + domicilio.depto.toString());
                      nomFantasField.setText("  " + _datos2.nombreFantasia.toString());
                      form.flatten();

                      // Generar el PDF y guardarlo en un archivo temporal
                      _tempFilePath = _path["default"].join(__dirname, "..", "files", codigoRepa, "temp", "formulario-".concat(codigoRepa, "-REPA.pdf"));
                      _context4.next = 54;
                      return pdfDoc.save();
                    case 54:
                      pdfBytes = _context4.sent;
                      _fs["default"].writeFileSync(_tempFilePath, pdfBytes);

                      // Enviar el archivo al cliente
                      file = _fs["default"].createReadStream(_tempFilePath);
                      res.setHeader("Content-Type", "application/pdf");
                      res.setHeader("Content-Disposition", "attachment; filename=formulario-REPA.pdf");
                      file.pipe(res);

                      // Retornar el archivo temporal
                      return _context4.abrupt("return", _tempFilePath);
                    case 63:
                      _context4.prev = 63;
                      _context4.t0 = _context4["catch"](0);
                      console.error("Error al generar el PDF:", _context4.t0);
                      res.status(500).send("Ocurrió un error al generar el PDF");
                    case 67:
                    case "end":
                      return _context4.stop();
                  }
                }, _callee4, null, [[0, 63]]);
              }));
              return function doc() {
                return _ref5.apply(this, arguments);
              };
            }();
            doc(req, res);
          }
          _context5.next = 13;
          break;
        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0.message);
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return function renderPDFEm(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.renderPDFEm = renderPDFEm;