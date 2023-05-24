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

// Configuración de las vistas
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



// Middleware de registro de solicitudes
app.use(morgan("dev"));

// Middleware de análisis de datos
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware de sesión
app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'none' }
  })
);

// Inicialización de Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware de mensajes flash
app.use(flash()); 

// Variables globales para las vistas
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// Rutas
app.use(formRoutes);
app.use(userRoutes);

// Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.use('/files', express.static(path.join(__dirname, 'files')));

export default app;

