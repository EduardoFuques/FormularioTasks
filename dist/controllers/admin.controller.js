"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAdminiaavim = exports.updateAdminEmail = exports.renderAdmin = exports.filtroBuscadorAdmin = exports.adminPJ = exports.adminPF = void 0;
var _arrays = require("../helpers/arrays");
var _buscador = require("../helpers/buscador");
var _Formulario = _interopRequireDefault(require("../models/Formulario"));
var _Usuarios = _interopRequireDefault(require("../models/Usuarios"));
var _exceljs = _interopRequireDefault(require("exceljs"));
var _validator = _interopRequireDefault(require("validator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var renderAdmin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var usersWithForms, admin;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _buscador.getUsersWithForms)();
        case 2:
          usersWithForms = _context.sent;
          usersWithForms.sort(function (a, b) {
            return a.fUpdate < b.fUpdate ? 1 : -1;
          });
          usersWithForms.forEach(function (datitos) {
            var fechaActual = new Date();
            var fechaUpdatedAt = new Date(datitos.fUpdate);
            var fechaCreatedAt = new Date(datitos.fCreacion);
            var diasDesdeUpdated;
            if (fechaUpdatedAt.getTime() === fechaCreatedAt.getTime()) {
              diasDesdeUpdated = 0;
            } else {
              diasDesdeUpdated = Math.round((fechaActual - fechaUpdatedAt) / (1000 * 60 * 60 * 24));
            }
            var resultadoUpdated;
            if (diasDesdeUpdated === 0 && fechaUpdatedAt.getTime() !== fechaCreatedAt.getTime()) {
              resultadoUpdated = "Hoy";
            } else if (diasDesdeUpdated === 0 && fechaUpdatedAt.getTime() === fechaCreatedAt.getTime()) {
              var diasDesdeCreacion = Math.round((fechaActual - fechaCreatedAt) / (1000 * 60 * 60 * 24));
              resultadoUpdated = "".concat(diasDesdeCreacion, " d\xEDas");
            } else {
              resultadoUpdated = "".concat(diasDesdeUpdated, " d\xEDas");
            }
            var fechaCreatedISO = datitos.createdAt ? datitos.createdAt.toISOString() : '';
            var fechaCreated = fechaCreatedISO.slice(0, 10);
            datitos.createdAt = fechaCreated;
            datitos.updatedAt = resultadoUpdated;
          });
          admin = true;
          res.render("administracion", {
            admin: admin,
            usersWithForms: usersWithForms
          });
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function renderAdmin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.renderAdmin = renderAdmin;
var filtroBuscadorAdmin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var query, Vquery, usersWithForms, admin, filteredUsers;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          query = req.body.q.toLowerCase();
          Vquery = _validator["default"].escape(query);
          _context2.next = 4;
          return (0, _buscador.getUsersWithForms)();
        case 4:
          usersWithForms = _context2.sent;
          usersWithForms.sort(function (a, b) {
            return a.codigoRepa > b.codigoRepa ? 1 : -1;
          });
          admin = true;
          filteredUsers = usersWithForms.filter(function (user) {
            return user.nombre.toLowerCase().includes(Vquery) || user.apellido.toLowerCase().includes(Vquery) || user.email.toLowerCase().includes(Vquery) || user.usuario.toLowerCase().includes(Vquery) || user.codigoRepa.toLowerCase().includes(Vquery);
          });
          res.render("administracion", {
            admin: admin,
            usersWithForms: filteredUsers,
            criterioDeBusqueda: Vquery
          });
        case 9:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function filtroBuscadorAdmin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.filtroBuscadorAdmin = filtroBuscadorAdmin;
var adminPJ = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var usuarios, datitos, datitosPorUsuario, usuariosConDatitos, workbook, worksheet;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _Usuarios["default"].find({
            rol: "perJur"
          }, "usuario rol codigoRepa").lean();
        case 3:
          usuarios = _context3.sent;
          _context3.next = 6;
          return _Formulario["default"].find({
            usuario: {
              $in: usuarios.map(function (u) {
                return u.usuario;
              })
            }
          }, "razonSocial nombreFantasia tipoDoc usuario nombre apellido cuil sexo email sitAfip sitIaavim domicilio telefono createdAt updatedAt dniFileUrl cvFileUrl").lean();
        case 6:
          datitos = _context3.sent;
          datitosPorUsuario = datitos.reduce(function (acc, item) {
            acc[item.usuario] = item;
            return acc;
          }, {});
          usuariosConDatitos = usuarios.map(function (usuario) {
            var datitos = datitosPorUsuario[usuario.usuario] || {
              nombre: "",
              apellido: "",
              tipoDoc: "",
              cuil: "",
              sexo: "",
              email: "",
              sitAfip: "",
              sitIaavim: "",
              razonSocial: "",
              nombreFantasia: "",
              domicilio: [{
                calle: "",
                numero: "",
                piso: "",
                depto: "",
                cp: ""
              }],
              telefono: [{
                fijo: "",
                movil: "",
                alternativo: ""
              }]
            }; // Si no hay datitos, se crea un objeto vacío
            return {
              codigoRepa: usuario.codigoRepa,
              usuario: usuario.usuario,
              rol: usuario.rol,
              nombre: datitos.nombre,
              apellido: datitos.apellido,
              tipoDoc: datitos.tipoDoc,
              cuil: datitos.cuil,
              sexo: datitos.sexo,
              email: datitos.email,
              sitAfip: datitos.sitAfip,
              sitIaavim: datitos.sitIaavim ? "ACTIVO" : "INACTIVO",
              razonSocial: datitos.razonSocial,
              nombreFantasia: datitos.nombreFantasia,
              domicilio: datitos.domicilio && datitos.domicilio[0],
              // Si hay domicilio, se toma el primer elemento del arreglo
              telefono: datitos.telefono && datitos.telefono[0],
              // Si hay teléfono, se toma el primer elemento del arreglo
              calle: datitos.domicilio[0].calle,
              numero: datitos.domicilio[0].numero,
              piso: datitos.domicilio[0].piso,
              depto: datitos.domicilio[0].depto,
              cp: datitos.domicilio[0].cp,
              fijo: datitos.telefono[0].fijo,
              movil: datitos.telefono[0].movil,
              movilAlt: datitos.telefono[0].alternativo,
              // Propiedades nuevas
              localidad: "",
              distrito: "",
              departamento: "",
              createdAt: datitos.createdAt,
              updatedAt: datitos.updatedAt,
              dniFileUrl: datitos.dniFileUrl,
              cvFileUrl: datitos.cvFileUrl
            };
          });
          usuariosConDatitos.forEach(function (datitos) {
            for (var i = 0; i < _arrays.domiciliosOpc.length; i++) {
              var obj = _arrays.domiciliosOpc[i];
              if (obj.opciones.indice.toString() === datitos.domicilio.localidad) {
                datitos.localidad = obj.localidad;
                datitos.distrito = obj.opciones.Distrito;
                datitos.departamento = obj.opciones.Departamento;
                break;
              }
            }
            var fechaActual = new Date();
            var fechaUpdatedAt = new Date(datitos.updatedAt);
            var fechaCreatedAt = new Date(datitos.createdAt);
            var diasDesdeUpdated;
            if (fechaUpdatedAt.getTime() === fechaCreatedAt.getTime()) {
              diasDesdeUpdated = 0;
            } else {
              diasDesdeUpdated = Math.round((fechaActual - fechaUpdatedAt) / (1000 * 60 * 60 * 24));
            }
            var resultadoUpdated;
            if (diasDesdeUpdated === 0 && fechaUpdatedAt.getTime() !== fechaCreatedAt.getTime()) {
              resultadoUpdated = "Hoy";
            } else if (diasDesdeUpdated === 0 && fechaUpdatedAt.getTime() === fechaCreatedAt.getTime()) {
              resultadoUpdated = "Nunca";
            } else {
              resultadoUpdated = "".concat(diasDesdeUpdated, " d\xEDas atr\xE1s");
            }
            var fechaCreatedISO = datitos.createdAt ? datitos.createdAt.toISOString() : '';
            var fechaCreated = fechaCreatedISO.slice(0, 10);
            datitos.createdAt = fechaCreated;
            datitos.updatedAt = resultadoUpdated;
          });
          workbook = new _exceljs["default"].Workbook();
          worksheet = workbook.addWorksheet("Personas Jurídicas"); // Define el encabezado de la tabla
          worksheet.columns = _arrays.columnasPerJur;

          // Establece el ancho automático de las columnas
          worksheet.columns.forEach(function (column) {
            column.width = 15;
          });

          // Agrega los datos a la tabla
          usuariosConDatitos.forEach(function (usuario) {
            var row = worksheet.addRow(usuario);
            row.eachCell(function (cell, colNumber) {
              var column = worksheet.getColumn(colNumber);
              var newWidth = Math.max(column.width, cell.value.toString().length + 1);
              column.width = newWidth;
            });
          });

          // Configura el estilo de la tabla
          worksheet.eachRow(function (row, rowNumber) {
            if (rowNumber === 1) {
              // Encabezado
              row.font = {
                bold: true
              };
            } else {
              // Datos
              row.alignment = {
                vertical: "middle",
                horizontal: "left"
              };
              row.height = 20;
              row.eachCell(function (cell, colNumber) {
                cell.alignment = {
                  wrapText: true
                };
                cell.border = {
                  top: {
                    style: "thin"
                  },
                  left: {
                    style: "thin"
                  },
                  bottom: {
                    style: "thin"
                  },
                  right: {
                    style: "thin"
                  }
                };
              });
            }
          });

          // Establece el tipo de contenido de la respuesta y envía el archivo Excel
          res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
          res.setHeader("Content-Disposition", "attachment; filename=REPA-PerJur.xlsx");
          _context3.next = 20;
          return workbook.xlsx.write(res);
        case 20:
          _context3.next = 26;
          break;
        case 22:
          _context3.prev = 22;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).json({
            message: "Error al obtener los datos"
          });
        case 26:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 22]]);
  }));
  return function adminPJ(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.adminPJ = adminPJ;
var adminPF = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var usuarios, datitos, datitosPorUsuario, workbook, worksheet;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _Usuarios["default"].find({
            rol: "normal"
          }, "usuario rol codigoRepa").lean();
        case 3:
          usuarios = _context4.sent;
          _context4.next = 6;
          return _Formulario["default"].find({
            usuario: {
              $in: usuarios.map(function (u) {
                return u.usuario;
              })
            }
          }, "apellido nombre tipoDoc usuario cuil sexo sitAfip sitIaavim domicilio telefono email medios areaDes areaComp createdAt updatedAt dniFileUrl cvFileUrl").lean();
        case 6:
          datitos = _context4.sent;
          //
          // datitos.forEach((dato) => {
          //   const fechaCreatedISO = dato.createdAt.toISOString();
          //   const fechaCreated = fechaCreatedISO.slice(0, 10);
          //   console.log(fechaCreated);
          // });
          datitosPorUsuario = datitos.reduce(function (acc, item) {
            var _usuarios$find$codigo, _usuarios$find;
            var domicilio = item.domicilio[0];
            var telefono = item.telefono[0];
            var medios = item.medios;
            var mediosUsuarioArrCopy = Object.assign({}, _arrays.mediosUsuarioArr);
            medios.forEach(function (medioIndice) {
              var medioObj = _arrays.mediosopc.find(function (obj) {
                return obj.indice === parseInt(medioIndice);
              });
              if (medioObj) {
                mediosUsuarioArrCopy[medioObj.medio] = medioObj.medio;
              }
            });
            var areaDes = item.areaDes;
            var areaDesUsuario = _arrays.areaDesUsuarioArr;
            areaDes.forEach(function (areaIndice) {
              var areaObj = _arrays.areaDesOpc.find(function (obj) {
                return obj.indice === parseInt(areaIndice);
              });
              if (areaObj) {
                areaDesUsuario[areaObj.medio] = areaObj.medio;
              }
            });
            var areaComp = item.areaComp;
            var areaCompUsuario = _arrays.areasCompUsuarioArr;
            areaComp.forEach(function (areaIndice) {
              var areaObj = _arrays.areasCompOpc.find(function (obj) {
                return obj.indice === parseInt(areaIndice);
              });
              if (areaObj) {
                areaCompUsuario[areaObj.medio] = areaObj.medio;
              }
            });
            var localidad = {
              localidad: "",
              distrito: "",
              departamento: ""
            };
            for (var i = 0; i < _arrays.domiciliosOpc.length; i++) {
              var obj = _arrays.domiciliosOpc[i];
              if (obj.opciones.indice.toString() === domicilio.localidad) {
                localidad.localidad = obj.localidad;
                localidad.distrito = obj.opciones.Distrito;
                localidad.departamento = obj.opciones.Departamento;
                break;
              }
            }
            var fechaActual = new Date();
            var fechaUpdatedAt = new Date(item.updatedAt);
            var fechaCreatedAt = new Date(item.createdAt);
            var diasDesdeUpdated;
            if (fechaUpdatedAt.getTime() === fechaCreatedAt.getTime()) {
              diasDesdeUpdated = 0;
            } else {
              diasDesdeUpdated = Math.round((fechaActual - fechaUpdatedAt) / (1000 * 60 * 60 * 24));
            }
            var resultadoUpdated;
            if (diasDesdeUpdated === 0 && fechaUpdatedAt.getTime() !== fechaCreatedAt.getTime()) {
              resultadoUpdated = "Hoy";
            } else if (diasDesdeUpdated === 0 && fechaUpdatedAt.getTime() === fechaCreatedAt.getTime()) {
              resultadoUpdated = "Nunca";
            } else {
              resultadoUpdated = "".concat(diasDesdeUpdated, " d\xEDas atr\xE1s");
            }
            var fechaCreatedISO = item.createdAt.toISOString();
            var fechaCreated = fechaCreatedISO.slice(0, 10);
            acc[item.usuario] = _objectSpread(_objectSpread(_objectSpread(_objectSpread({
              codigoRepa: (_usuarios$find$codigo = (_usuarios$find = usuarios.find(function (u) {
                return u.usuario === item.usuario;
              })) === null || _usuarios$find === void 0 ? void 0 : _usuarios$find.codigoRepa) !== null && _usuarios$find$codigo !== void 0 ? _usuarios$find$codigo : "",
              tipoDoc: item.tipoDoc || "",
              usuario: item.usuario || "",
              nombre: item.nombre || "",
              apellido: item.apellido || "",
              cuil: item.cuil || "",
              sexo: item.sexo || "",
              email: item.email || "",
              sitAfip: item.sitAfip || "",
              sitIaavim: item.sitIaavim ? "ACTIVO" : "INACTIVO",
              calle: domicilio.calle || "",
              // agrega el campo calle
              numero: domicilio.numero || "",
              // agrega el campo numero
              piso: domicilio.piso || "",
              depto: domicilio.depto || "",
              cp: domicilio.cp || "",
              localidad: localidad.localidad || "",
              distrito: localidad.distrito || "",
              departamento: localidad.departamento || "",
              fijo: telefono.fijo || "",
              movil: telefono.movil || "",
              movilAlt: telefono.alternativo || ""
            }, mediosUsuarioArrCopy), areaDesUsuario), areaCompUsuario), {}, {
              createdAt: fechaCreated,
              updatedAt: resultadoUpdated,
              dniFileUrl: item.dniFileUrl,
              cvFileUrl: item.cvFileUrl
            });
            return acc;
          }, {}); //console.log(datitosPorUsuario)
          workbook = new _exceljs["default"].Workbook();
          worksheet = workbook.addWorksheet("Personas Físicas"); // Define el encabezado de la tabla
          worksheet.columns = _arrays.columnasPerFis;

          // Establece el ancho automático de las columnas
          worksheet.columns.forEach(function (column) {
            column.width = 15;
          });

          // Agrega los datos a la tabla
          Object.values(datitosPorUsuario).forEach(function (usuario) {
            var row = worksheet.addRow(usuario);
            row.eachCell(function (cell, colNumber) {
              var column = worksheet.getColumn(colNumber);
              var newWidth = Math.max(column.width, cell.value.toString().length + 1);
              column.width = newWidth;
            });
          });

          // Configura el estilo de la tabla
          worksheet.eachRow(function (row, rowNumber) {
            if (rowNumber === 1) {
              // Encabezado
              row.font = {
                bold: true
              };
            } else {
              // Datos
              row.alignment = {
                vertical: "middle",
                horizontal: "left"
              };
              row.height = 20;
              row.eachCell(function (cell, colNumber) {
                cell.alignment = {
                  wrapText: true
                };
                cell.border = {
                  top: {
                    style: "thin"
                  },
                  left: {
                    style: "thin"
                  },
                  bottom: {
                    style: "thin"
                  },
                  right: {
                    style: "thin"
                  }
                };
              });
            }
          });

          // Establece el tipo de contenido de la respuesta y envía el archivo Excel
          res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
          res.setHeader("Content-Disposition", "attachment; filename=REPA-PerFis.xlsx");
          _context4.next = 18;
          return workbook.xlsx.write(res);
        case 18:
          _context4.next = 24;
          break;
        case 20:
          _context4.prev = 20;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(500).json({
            message: "Error al obtener los datos"
          });
        case 24:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 20]]);
  }));
  return function adminPF(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.adminPF = adminPF;
var updateAdminiaavim = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body, usuario, sitIaavim, Vusuario, VsitIaavim;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$body = req.body, usuario = _req$body.usuario, sitIaavim = _req$body.sitIaavim;
          Vusuario = _validator["default"].escape(usuario);
          if (isBoolean(sitIaavim)) {
            VsitIaavim = sitIaavim;
          } else {
            VsitIaavim = false;
          }
          _context5.next = 6;
          return _Formulario["default"].updateOne({
            usuario: Vusuario
          }, {
            $set: {
              sitIaavim: VsitIaavim
            }
          });
        case 6:
          _context5.next = 11;
          break;
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0.message);
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return function updateAdminiaavim(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.updateAdminiaavim = updateAdminiaavim;
function isBoolean(value) {
  return typeof value === 'boolean';
}
var updateAdminEmail = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body2, usuario, email, Vusuario, isEmailValid, Vemail;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _req$body2 = req.body, usuario = _req$body2.usuario, email = _req$body2.email;
          Vusuario = _validator["default"].escape(usuario);
          isEmailValid = _validator["default"].isEmail(email);
          if (!isEmailValid) {
            _context6.next = 8;
            break;
          }
          Vemail = email;
          _context6.next = 10;
          break;
        case 8:
          req.flash("error_msg", "El correo introducido es inválido");
          return _context6.abrupt("return", res.redirect(req.headers.referer));
        case 10:
          _context6.next = 12;
          return _Usuarios["default"].updateOne({
            usuario: Vusuario
          }, {
            $set: {
              email: Vemail
            }
          });
        case 12:
          _context6.next = 14;
          return _Formulario["default"].updateOne({
            usuario: Vusuario
          }, {
            $set: {
              email: Vemail
            }
          });
        case 14:
          _context6.next = 19;
          break;
        case 16:
          _context6.prev = 16;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0.message);
        case 19:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 16]]);
  }));
  return function updateAdminEmail(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.updateAdminEmail = updateAdminEmail;