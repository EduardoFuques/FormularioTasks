import passport from "passport";
import { Strategy } from "passport-local";
import User from "../models/Usuarios";
import fs from "fs";
import path from "path";

const LocalStrategy = Strategy;

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "usuario",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, usuario, password, done) => {
      const user = await User.findOne({ usuario });
      if (!user) {
        return done(null, false, { message: "No existe el usuario" });
      } else {
        const match = await user.matchPassword(password);
        if (match) {
          // Obtener el código de usuario y crear el directorio temporal
          const codigoRepa = user.codigoRepa;
          const tempDir = path.join(
            __dirname,
            "..",
            "files",
            codigoRepa,
            "temp"
          );
          fs.mkdirSync(tempDir, { recursive: true });
          req.session.tempDir = tempDir;

          // Establecer el tiempo de vida máximo en segundos
          const maxTempDirLifetime = 3600;

          // Programar la tarea para eliminar el directorio temporal después del tiempo de vida máximo
          setTimeout(() => {
            fs.rm(tempDir, { recursive: true }, (err) => {
              if (err) {
                console.error(`Error al eliminar el directorio temporal ${tempDir}:`, err);
              }
            });
          }, maxTempDirLifetime * 1000);


          return done(null, user);
        } else {
          return done(null, false, { message: "Contraseña incorrecta" });
        }
      }
    }
  )
);

// Redirigir a /formEm si el rol es perJur
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default passport;
