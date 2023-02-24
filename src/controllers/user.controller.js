import User from "../models/Usuarios";
import { isCorrectPassword } from "../models/Usuarios";
import passport from "../config/passport";
import { getNextSequenceValue } from "../models/Contador";
import fs from "fs";
import path from "path";

export const renderSignUp = async (req, res) => {
  res.render("registro");
};

async function codRepa() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const seq = await getNextSequenceValue('codigoRepa');
  const letter1Index = Math.floor(seq / 26000);
  const letter1 = letters[letter1Index];
  const letter2Index = Math.floor(seq / 100) % 26;
  const letter2 = letters[letter2Index];
  const number1 = Math.floor(seq / 10) % 10;
  const number2 = seq % 10;
  const codigoRepa = `${letter1}${letter2}${number1}${number2}`;
  return codigoRepa
}


export const signUpUser = async (req, res) => {
  try {
    const errors = [];
    const {
      opcion,
      nombre,
      apellido,
      usuario,
      email,
      password,
      confirm_password,
    } = req.body;
    const codigoRepa = await codRepa()

    // Create directory for the user on the server
    const userDirectory = path.join(__dirname, "..", "files", codigoRepa);
    fs.mkdirSync(userDirectory, { recursive: true });

    const user = { opcion, nombre, apellido, usuario, email };
    const rol = "normal";
    const emailUser = await User.findOne({ email: email });
    const dniUser = await User.findOne({ usuario: usuario });
    if (dniUser) {
      errors.push({ text: "El DNI ya ha sido registrado" });
    }
    if (opcion === undefined) {
      errors.push({ text: "Seleccione tipo de documento" });
    }
    if (emailUser) {
      errors.push({ text: "El correo ya está en uso" });
    }
    if (password != confirm_password) {
      errors.push({ text: "Las contraseñas no coinciden" });
    }
    if (password.length < 4) {
      errors.push({ text: "La contraseña debe tener al menos 4 caracteres" });
    }
    if (errors.length > 0) {
      res.render("registro", {
        errors,
        user: user,
      });
    } else {
      const tipoDoc = opcion;
      const newUser = new User({
        tipoDoc,
        usuario,
        password,
        nombre,
        apellido,
        email,
        rol,
        codigoRepa,
      });
      await newUser.save();
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
};

export const renderSignIn = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/form");
  }
  res.render("ingreso");
};

export const autenticacion = passport.authenticate("login", {
  failureRedirect: "/",
  successRedirect: "/form",
  failureFlash: true,
});


// Controlador para logout
export const logOut = function (req, res, next) {
  // Obtener el directorio temporal de la sesión y eliminarlo
  const tempDir = req.session.tempDir;
  
  if (tempDir) {
    deleteTempDir(tempDir, function() {
      // Cerrar sesión y redirigir
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    });
  } else {
    // Si no hay directorio temporal, cerrar sesión y redirigir
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  }
};

export function deleteTempDir(tempDir, callback) {
  fs.rmdir(tempDir, { recursive: true }, (err) => {
    if (err) {
      console.error(`Error al eliminar el directorio temporal ${tempDir}:`, err);
    } else {
      console.log(`Directorio temporal ${tempDir} eliminado`);
    }
    callback();
  });
}