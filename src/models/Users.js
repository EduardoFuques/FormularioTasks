import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10;

const userSchema = new Schema({
  usuario: {
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
  function (password, consulta, callback) {
    bcrypt.compare(password, consulta.password, function (err, same) {
      if (err) {
        callback(err);
      } else {
        callback(err, same);
      }
    });
  });

const User = model("User", userSchema);
export default User;


