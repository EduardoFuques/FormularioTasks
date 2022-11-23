import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10;

const userSchema = new Schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    const document = this;
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
  function (password, callback) {
    bcrypt.compare(password, this.password, function (err, same) {
      if (err) {
        callback(err);
      } else {
        callback(err, same);
      }
    });
  });

const User = model("User", userSchema);
export default User;

const user = 'Eduardo'
const password = 'Eduardo1'
User.findOne({ user: user }, (err, user) => {
  if (err) {
    console.log("Error al autenticar al usuario");
  } else if (!user) {
    console.log("El usuario no existe");
  } else {
    isCorrectPassword(password, (err, result) => {
      if (err) {
        console.log("Error al autenticar");
      } else if (result) {
        console.log("Usuario autenticado");
      } else {
        console.log("Usuario o contraseña incorrecta");
      }
    });
  }
});
