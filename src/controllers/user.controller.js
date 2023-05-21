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
import validator from "validator";

export const renderSignUp = async (req, res) => {
  res.render("registro");
};

export const renderSignUpPJ = async (req, res) => {
  res.render("registroPJ");
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
      confirm_password,
    } = req.body;
    const Vopcion=validator.escape(opcion)
    const Vnombre=validator.escape(nombre)
    const Vapellido=validator.escape(apellido)
    const Vusuario=validator.escape(usuario)
    const isEmailValid=validator.isEmail(email)
    let Vemail
    if (isEmailValid) {
      Vemail=email
    } else {
      errors.push({ text: "El correo es inválido" });
      const user = { opcion: Vopcion, nombre: Vnombre, apellido: Vapellido, usuario: Vusuario };
      res.render("registro", {
        errors,
        user: user,
      });
    }
    const opcionPerJur = "NO"
    const codigoRepa = await codRepa(opcionPerJur);
    const userDirectory = path.join(__dirname, "..", "files", codigoRepa);
    fs.mkdirSync(userDirectory, { recursive: true });
    const user = { opcion: Vopcion, nombre: Vnombre, apellido: Vapellido, usuario: Vusuario, email: Vemail };
    let rol = "normal";
    if (opcionPerJur === "SI") {
      rol = "perJur";
    }
    const emailUser = await User.findOne({ email: Vemail });
    const dniUser = await User.findOne({ usuario: Vusuario });
    if (dniUser) {
      errors.push({ text: "El DNI ya ha sido registrado" });
    }
    if (Vopcion === undefined) {
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
      const tipoDoc = Vopcion;
      const newUser = new User({
        tipoDoc,
        usuario: Vusuario,
        password,
        nombre: Vnombre,
        apellido: Vapellido,
        email: Vemail,
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
  const errors = [];
  if (req.isAuthenticated()) {
    const { rol } = req.user;
    if (rol === "perJur") {
      return res.redirect("/formEm");
    } else if (rol === "admin") {
      return res.redirect("/administracion");
    } else if (rol == "normal") {
      return res.redirect("/form");
    } else {
      errors.push({ text: "Ha ocurrido un error. Póngase en contacto con administración" });
      req.flash('error', errors);
      return res.redirect("/logout");
    }    
  }
  const successMessage = req.flash('success');
  const errorMessage = req.flash('error');
  //const successMessage = req.query.successMessage;
  return res.render("ingreso", { successMessage, errorMessage });
};

export const autenticacion = passport.authenticate("login", {
  failureRedirect: "/",
  failureFlash: true,
  successRedirect: "/formEm", // Ruta por defecto si no se encuentra rol o rol = normal
});

export const mostrarErroresFlash = (req, res, next) => {
  const errores = req.flash("error");
  console.log("Middleware mostrarErroresFlash se está ejecutando");
  if (errores.length > 0) {
    console.error("Errores de autenticación:", errores);
  }
  next();
};

export const logOut = function (req, res, next) {
  const tempDir = req.session.tempDir;
  if (tempDir) {
    deleteTempDir(tempDir, function () {
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  } else {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      const errors = req.flash('error');
      res.redirect('/');
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

export const renderPassword = async (req, res) => {
  res.render("password");
};

export const restablecerPassword = async (req, res) => {
  const { email } = req.body;
  let errorMessage = ""
  const isEmailValid=validator.isEmail(email)
  let Vemail
  if (isEmailValid) {
    Vemail=email
  } else {
    errorMessage= "El correo es inválido";
    req.flash('error', errorMessage);
    res.render("password");
  }
  try {
    const token = await generateResetPasswordToken(Vemail); // generate reset password token
    const user = await User.findOne({ email: Vemail });
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
      to: Vemail,
      subject: "Restablecimiento de contraseña RePA - IAAviM",
      html: "",
    };

    if(user.rol === "normal" || user.rol === "admin"){
      mailOptions.html=`  <h2 class="mb-4">Estimado/a ${user.nombre} ${user.apellido}</h2>
      <p>El proceso de cambio de contraseña, se ha iniciado. Haga click en el siguiente link para cambiar su contraseña.</p>
      <p><a href="http://${DOMINIO}/reset-password/${token}">CLICKEE AQUI</a></p>
      <pre>
      </pre>
      <p>Si tiene alguna pregunta o necesita ayuda adicional, no dude en contactarnos por correo electrónico a <a href="mailto:repa@iaavim.gob.ar">repa@iaavim.gob.ar<a></a>.</strong></p>
      <p>Este es un mensaje automático generado por nuestro sistema.</p><p><strong> Por favor, no responda a este correo electrónico.</strong></p>
      <p>Atentamente,</p><pre>
      </pre>
      <p><strong>Silvana Gonzalez Gregori</strong></p> 
      <p>Responsable del Registro Provincial del Audiovisual -RePA-</p>
      <p>Instituto de Artes Audiovisuales de Misiones -IAAviM-</p>`
    } else if (user.rol === "perJur") {
      mailOptions.html = `<h2 class="mb-4">Estimado/a ${user.nombreEmpresa}</h2>
      <p>El proceso de cambio de contraseña, se ha iniciado. Haga click en el siguiente link para cambiar su contraseña.</p>
      <p><a href="http://${DOMINIO}/reset-password/${token}">CLICKEE AQUI</a></p>
      <pre>
      </pre>
      <p>Si tiene alguna pregunta o necesita ayuda adicional, no dude en contactarnos por correo electrónico a <a href="mailto:repa@iaavim.gob.ar">repa@iaavim.gob.ar<a></a>.</strong></p>
      <p>Este es un mensaje automático generado por nuestro sistema.</p><p><strong> Por favor, no responda a este correo electrónico.</strong></p>
      <p>Atentamente,</p><pre>
      </pre>
      <p><strong>Silvana Gonzalez Gregori</strong></p> 
      <p>Responsable del Registro Provincial del Audiovisual -RePA-</p>
      <p>Instituto de Artes Audiovisuales de Misiones -IAAviM-</p>`;
    } else {
      mailOptions.html = ""
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        const successMessage = `Correo electrónico enviado a ${Vemail}`;
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
    res.render("reset-password", { user: user, email: user.email, token });
  } catch (error) {
    errorMessage= "El link ya ha vencido. Intente reestablecer la contraseña nuevamente."
    req.flash('error', errorMessage);
    return res.redirect(`/`);
  }
};

export const updatePasswordController = async (req, res) => {
  const token = req.params.token;
  const { email, password, confirm_password } = req.body;
  let errorMessage = ""
  const isEmailValid=validator.isEmail(email)
  let Vemail
  if (isEmailValid) {
    Vemail=email
  } else {
    errorMessage= "El correo es inválido";
    const user = await verifyResetPasswordToken(token);
    req.flash('error', errorMessage);
    res.render("reset-password", { user: user, email: user.email, token });
  }
  let user = null;
  let successMessage = "";
  try {
    if (password !== confirm_password) {
      throw new Error("Las contraseñas no coinciden");
    }
    if (password.length < 4) {
      throw new Error("La contraseña debe tener al menos 4 caracteres");
    }
    user = await User.findOne({ email: Vemail });
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
    return res.render("reset-password", {
      user,
      email,
      token,
      error: error.message,
    });
  }
};

export const signUpUserApi = async (req, res) => {
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
    const Vopcion=validator.escape(opcion)
    const Vnombre=validator.escape(nombre)
    const Vapellido=validator.escape(apellido)
    const Vusuario=validator.escape(usuario)
    const isEmailValid=validator.isEmail(email)
    const VopcionPerJur=validator.escape(opcionPerJur)
    let Vemail
    if (isEmailValid) {
      Vemail=email
    } else {
      errors.push({ text: "El correo es inválido" });
      const user = { Vopcion, Vnombre, Vapellido, Vusuario };
      res.render("registro", {
        errors,
        user: user,
      });
    }
    const codigoRepa = await codRepa(VopcionPerJur);
    const userDirectory = path.join(__dirname, "..", "files", codigoRepa);
    fs.mkdirSync(userDirectory, { recursive: true });
    const user = { Vopcion, Vnombre, Vapellido, Vusuario, Vemail };
    let rol = "normal";
    if (opcionPerJur === "SI") {
      rol = "perJur";
    }
    const emailUser = await User.findOne({ email: Vemail });
    const dniUser = await User.findOne({ usuario: Vusuario });
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
      const tipoDoc = Vopcion;
      const newUser = new User({
        tipoDoc,
        usuario: Vusuario,
        password,
        nombre: Vnombre,
        apellido: Vapellido,
        email: Vemail,
        rol,
        codigoRepa,
      });
      await newUser.save();
    }
  } catch (error) {
    console.log(error);
  }
};

export const signUpPJ = async (req, res) => {
  try {
    const errors = [];
    const {
      nombreEmpresa,
      usuario,
      email, //si
      password, //si
      confirm_password,
    } = req.body;
    const VnombreEmpresa=validator.escape(nombreEmpresa)
    const Vusuario=validator.escape(usuario)
    const isEmailValid=validator.isEmail(email)
    let Vemail
    if (isEmailValid) {
      Vemail=email
    } else {
      errors.push({ text: "El correo es inválido" });
      const user = { VnombreEmpresa, Vusuario };
      res.render("registroPJ", {
        errors,
        user: user,
      });
    }
    const opcionPerJur = "SI"
    const opcion = "DNI"
    const nombre = " "
    const apellido = " "
    const codigoRepa = await codRepa(opcionPerJur);
    const userDirectory = path.join(__dirname, "..", "files", codigoRepa);
    fs.mkdirSync(userDirectory, { recursive: true });
    const user = { opcion, nombre, apellido, Vusuario, Vemail, VnombreEmpresa };
    let rol = "normal";
    if (opcionPerJur === "SI") {
      rol = "perJur";
    }
    const emailUser = await User.findOne({ email: Vemail });
    const dniUser = await User.findOne({ usuario: Vusuario });
    if (dniUser) {
      errors.push({ text: "El CUIL ya ha sido registrado" });
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
      res.render("registroPJ", {
        errors,
        user: user,
      });
    } else {
      const tipoDoc = opcion;
      const newUser = new User({
        tipoDoc,
        usuario: Vusuario,
        password,
        nombre,
        apellido,
        email: Vemail,
        rol,
        codigoRepa,
        nombreEmpresa: VnombreEmpresa,
      });
      await newUser.save();
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
};