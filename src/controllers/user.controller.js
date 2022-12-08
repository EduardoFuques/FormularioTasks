import User from "../models/Usuarios";
import { isCorrectPassword } from "../models/Usuarios";
import passport from "../config/passport";

export const renderSignUp = async (req, res) => {
  res.render("login");
};

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
      res.render("login", {
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
  res.render("signin");
};

export const signInUser = (req, res) => {
  try {
    const { usuario, password } = req.body;
    console.log(usuario);
    User.findOne({ usuario: usuario }, (err, usuario) => {
      if (err) {
        res.status(500).send("Error al autenticar al usuario");
      } else if (!usuario) {
        res.status(500).send("El usuario no existe");
      } else {
        isCorrectPassword(password, usuario, (err, result) => {
          if (err) {
            res.status(500).send("Error al autenticar");
          } else if (result) {
            res.redirect("/form");
          } else {
            res.status(500).send("Usuario o contraseña incorrecta");
          }
        });
      }
    });
    //res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

export const autenticacion = passport.authenticate("login", {
  failureRedirect: "/",
  successRedirect: "/form",
  failureFlash: true,
});


export const logOut = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
