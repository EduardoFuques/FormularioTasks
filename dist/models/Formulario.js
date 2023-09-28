"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var formSchema = new _mongoose.Schema({
  apellido: {
    ref: "Usuario",
    type: _mongoose.Schema.Types.String
  },
  nombre: {
    ref: "Usuario",
    type: _mongoose.Schema.Types.String
  },
  tipoDoc: {
    ref: "Usuario",
    type: _mongoose.Schema.Types.String
  },
  usuario: {
    ref: "Usuario",
    type: _mongoose.Schema.Types.String
  },
  cuil: {
    type: String
  },
  sexo: {
    type: String
  },
  sitAfip: {
    type: String
  },
  codigoRepa: {
    ref: "Usuario",
    type: _mongoose.Schema.Types.String
  },
  sitIaavim: {
    type: Boolean
  },
  perJuridica: {
    type: Boolean
  },
  domicilio: [{
    calle: {
      type: String
    },
    numero: {
      type: String
    },
    piso: {
      type: String
    },
    depto: {
      type: String
    },
    localidad: {
      type: String
    },
    cp: {
      type: String
    },
    departamento: {
      type: String
    },
    distrito: {
      type: String
    }
  }],
  telefono: [{
    fijo: {
      type: String
    },
    movil: {
      type: String
    },
    alternativo: {
      type: String
    }
  }],
  email: {
    ref: "Usuario",
    type: _mongoose.Schema.Types.String
  },
  medios: [{
    type: String
  }],
  areaDes: [{
    type: String
  }],
  areaComp: [{
    type: String
  }],
  razonSocial: {
    type: String
  },
  nombreFantasia: {
    type: String
  },
  nombreEmpresa: {
    ref: "Usuario",
    type: _mongoose.Schema.Types.String
  },
  cvFileUrl: {
    type: String
  },
  dniFileUrl: {
    type: String
  },
  cvFileDate: {
    type: Date
  },
  dniFileDate: {
    type: Date
  }
}, {
  timestamps: true,
  versionKey: false
});
var _default = exports["default"] = (0, _mongoose.model)("Form", formSchema);