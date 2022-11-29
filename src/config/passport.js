import passport from "passport";
import { Strategy } from "passport-local";
import User from "../models/Usuarios";

const LocalStrategy = Strategy;

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "usuario",
      passwordField: "password",
    },
    async (usuario, password, done) => {
      const user = await User.findOne({ usuario });
      if (!user) {
        return done(null, false, { message: "No existe el usuario" });
      } else {
        const match = await user.matchPassword(password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Contraseña incorrecta" });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

export default passport;
