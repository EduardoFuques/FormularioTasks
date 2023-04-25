import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    tipoDoc: {
      type: String,
      required: true,
    },
    usuario: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    rol: {
      type: String,
      required: true,
    },
    codigoRepa: { type: String },
    nombreEmpresa: {type: String},
    resetPasswordToken: { type: String},
    resetPasswordExpiration: {type: String},
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    const document = this;
    const saltRounds = bcrypt.genSaltSync(10);
    bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

export const isCorrectPassword = (userSchema.methods.isCorrectPassword =
  function (password, consulta, callback) {
    bcrypt.compare(password, consulta.password, function (err, same) {
      if (err) {
        callback(err);
      } else {
        callback(err, same);
      }
    });
  });

export const matchPassword = (userSchema.methods.matchPassword =
  async function (password) {
    return await bcrypt.compare(password, this.password);
  });

const User = model("Usuario", userSchema);
export default User;
