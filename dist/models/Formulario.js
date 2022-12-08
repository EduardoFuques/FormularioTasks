"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var formSchema = new _mongoose.Schema({
  idUser: {
    type: String
  },
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
    type: _mongoose.Schema.Types.Number
  },
  cuil: {
    type: Number
  },
  sitAnses: {
    type: String
  },
  sitAfip: {
    type: String
  },
  sitIaavim: {
    type: Boolean
  },
  perJuridica: {
    type: String
  },
  codigoRepa: {
    type: String
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
      type: Number
    },
    movil: {
      type: Number
    },
    alternativo: {
      type: Number
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
  }]
}, {
  timestamps: true,
  versionKey: false
});
var _default = (0, _mongoose.model)("Form", formSchema);
exports["default"] = _default;