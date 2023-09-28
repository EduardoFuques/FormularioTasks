"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var renderFormem = exports.renderFormem = /*#__PURE__*/function () {
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
var captureFormEm = exports.captureFormEm = /*#__PURE__*/function () {
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
var captureEditFormEm = exports.captureEditFormEm = /*#__PURE__*/function () {
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
var renderPDFEm = exports.renderPDFEm = /*#__PURE__*/function () {
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