import express from "express";
import { create } from "express-handlebars";
import formRoutes from "./routes/form.routes";
import userRoutes from "./routes/user.routes";
import path from "path";
import morgan from "morgan";
import flash from "connect-flash";
import session from "express-session";
import passport from "./config/passport";
import { SESSION_SECRET } from "./config";

  
//inicializacion
const app = express();

//settings
app.set("views", path.join(__dirname, "views"));

const exphbs = create({
  // Configura la ruta para los diseños y fragmentos
  layoutsDir: path.join(app.get("views"), "layouts"),
  partialsDir: path.join(app.get("views"), "partials"),
  // Configura la extensión de los archivos de plantilla
  extname: ".hbs",
  // Configura el diseño predeterminado
  defaultLayout: "main",
  // Agrega funciones auxiliares personalizadas
  helpers: {
    // Esta función ayuda a comparar dos valores
    eq: function (a, b) {
      return a === b;
    },
  },
});

// Configura Handlebars como el motor de plantillas
app.engine(".hbs", exphbs.engine);
app.set("view engine", ".hbs");



//midlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); 

//global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

//routes
app.use(formRoutes);
app.use(userRoutes);

//static files
app.use(express.static(path.join(__dirname, "public")));

export default app;

