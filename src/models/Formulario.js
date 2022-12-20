import { Schema, model } from "mongoose";

const formSchema = new Schema(
  {
    apellido: { ref: "Usuario", type: Schema.Types.String },
    nombre: { ref: "Usuario", type: Schema.Types.String},
    tipoDoc: { ref: "Usuario", type: Schema.Types.String },
    usuario: { ref: "Usuario", type: Schema.Types.Number },
    cuil: { type: String },
    sexo: { type: String },
    sitAfip: { type: String },
    sitIaavim: { type: Boolean },
    perJuridica: { type: Boolean },
    codigoRepa: { type: String },
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Form", formSchema);
