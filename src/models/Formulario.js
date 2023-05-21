import { Schema, model } from "mongoose";

const formSchema = new Schema(
  {
    apellido: { ref: "Usuario", type: Schema.Types.String },
    nombre: { ref: "Usuario", type: Schema.Types.String},
    tipoDoc: { ref: "Usuario", type: Schema.Types.String },
    usuario: { ref: "Usuario", type: Schema.Types.String },
    cuil: { type: String },
    sexo: { type: String },
    sitAfip: { type: String },
    codigoRepa: { ref: "Usuario", type: Schema.Types.String },
    sitIaavim: { type: Boolean },
    perJuridica: { type: Boolean },
    domicilio: [
      {
        calle: { type: String },
        numero: { type: String },
        piso: { type: String },
        depto: { type: String },
        localidad: { type: String },
        cp: { type: String },
        departamento: { type: String },
        distrito: { type: String },
      },
    ],
    
    telefono: [
      {
        fijo: { type: String },
        movil: { type: String },
        alternativo: { type: String },
      },
    ],
    email: { ref: "Usuario", type: Schema.Types.String },
    medios: [{ type: String }],
    areaDes: [{ type: String }],
    areaComp: [{ type: String }],
    razonSocial: {type: String},
    nombreFantasia: {type: String},
    nombreEmpresa: { ref: "Usuario", type: Schema.Types.String },
    cvFileUrl: {type: String},
    dniFileUrl: {type: String},
    cvFileDate: {type: Date},
    dniFileDate: {type: Date}
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Form", formSchema);
