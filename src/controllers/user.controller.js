import User from "../models/Usuarios";
import passport from "../config/passport";
import {
  getNextSequenceValue,
  getNextSequenceValuePJ,
} from "../models/Contador";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import {
  generateResetPasswordToken,
  verifyResetPasswordToken,
} from "../helpers/resetPassword";
import { DOMINIO, MAIL_HOST, MAIL_PASS, MAIL_PORT, MAIL_USER } from "../config";

export const renderSignUp = async (req, res) => {
  res.render("registro");
};

async function codRepa(opcionPerJur) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let seq;
  if (opcionPerJur === "SI") {
    seq = await getNextSequenceValuePJ("codigoRepaPJ");
  } else {
    seq = await getNextSequenceValue("codigoRepa");
  }
  const letter1Index = Math.floor(seq / 26000);
  const letter1 = letters[letter1Index];
  const letter2Index = Math.floor(seq / 100) % 26;
  const letter2 = letters[letter2Index];
  const number1 = Math.floor(seq / 10) % 10;
  const number2 = seq % 10;
  const codigoRepa =
    opcionPerJur === "SI"
      ? `PJ${number1}${number2}`
      : `${letter1}${letter2}${number1}${number2}`;
  return codigoRepa;
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
      opcionPerJur,
      confirm_password,
    } = req.body;
    const codigoRepa = await codRepa(opcionPerJur);

    // Create directory for the user on the server
    const userDirectory = path.join(__dirname, "..", "files", codigoRepa);
    fs.mkdirSync(userDirectory, { recursive: true });

    const user = { opcion, nombre, apellido, usuario, email };

    let rol = "normal";

    if (opcionPerJur === "SI") {
      rol = "perJur";
    }
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

export const renderSignIn = async (req, res) => {
  if (req.isAuthenticated()) {
    const { rol } = req.user;
    if (rol === "perJur") {
      return res.redirect("/formEm");
    }
    // Si el rol es normal o no se encuentra rol, redirigir a /form
    return res.redirect("/form");
  }
  const successMessage = req.flash('success');
  //const successMessage = req.query.successMessage;
  return res.render("ingreso", { successMessage });
};

export const autenticacion = passport.authenticate("login", {
  failureRedirect: "/",
  failureFlash: true,
  successRedirect: "/formEm", // Ruta por defecto si no se encuentra rol o rol = normal
});

// Controlador para logout
export const logOut = function (req, res, next) {
  // Obtener el directorio temporal de la sesión y eliminarlo
  const tempDir = req.session.tempDir;

  if (tempDir) {
    deleteTempDir(tempDir, function () {
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
      console.error(
        `Error al eliminar el directorio temporal ${tempDir}:`,
        err
      );
    } else {
      console.log(`Directorio temporal ${tempDir} eliminado`);
    }
    callback();
  });
}

// Controlador para restablecer contraseñas
export const renderPassword = async (req, res) => {
  res.render("password");
};

export const restablecerPassword = async (req, res) => {
  const { email } = req.body;
  let errorMessage = ""
  try {
    const token = await generateResetPasswordToken(email); // generate reset password token
    const user = await User.findOne({ email: email });
    if (!user) {
      errorMessage= "No se encontró ningún usuario con el correo electrónico proporcionado"
      req.flash('error', errorMessage);
      return res.render('password');
    }
    const transporter = nodemailer.createTransport(
      smtpTransport({
        host: MAIL_HOST,
        port: MAIL_PORT, // o el puerto que indique Hostinger
        secure: true, // puede ser true si se usa SSL/TLS
        auth: {
          user: MAIL_USER,
          pass: MAIL_PASS,
        },
      })
    );

    const mailOptions = {
      from: MAIL_USER,
      to: email,
      subject: "Restablecer contraseña - REPA - IAAViM",
      html: `<p>Hola,</p><p>Puedes restablecer tu contraseña <a href="http://${DOMINIO}/reset-password/${token}">aquí</a>.</p>`, // include reset password token in link
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        const successMessage = `Correo electrónico enviado a ${email}`;
        req.flash('success', successMessage);
        return res.redirect(`/`);
      }
    });
  } catch (error) {
    errorMessage= "No se encontró ningún usuario con el correo electrónico proporcionado"
    return res.render('password', { error: errorMessage });
  }
};


export const resetPasswordController = async (req, res) => {
  let errorMessage = ""
  try {
    const token = req.params.token; // obtener el token desde la URL
    const user = await verifyResetPasswordToken(token); // verificar el token
    // Si el token es válido, renderizar la pantalla de creación de contraseñas
    console.log(user.email);
    res.render("reset-password", { user: user, email: user.email, token });
  } catch (error) {
    // Si el token no es válido, redirigir al usuario a una página de error
    req.flash('error', error.message);
    return res.redirect(`/`);
  }
};

export const updatePasswordController = async (req, res) => {
  const token = req.params.token;
  const { email, password, confirm_password } = req.body;
  let user = null;
  let successMessage = "";
  console.log(token);
  console.log(email);
  try {
    if (password !== confirm_password) {
      throw new Error("Las contraseñas no coinciden");
    }
    if (password.length < 4) {
      throw new Error("La contraseña debe tener al menos 4 caracteres");
    }
    user = await User.findOne({ email: email });
    if (!user) {
      throw new Error(
        "No se encontró ningún usuario con el correo electrónico proporcionado"
      );
    }
    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpiration = null;
    await user.save();
    successMessage = "La contraseña se actualizó correctamente";
    req.flash('success', successMessage);
    return res.redirect("/");
  } catch (error) {
    console.log(error.message);
    return res.render("reset-password", {
      user,
      email,
      token,
      error: error.message,
    });
  }
};
