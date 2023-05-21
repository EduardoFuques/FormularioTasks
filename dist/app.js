"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressHandlebars = require("express-handlebars");
var _form = _interopRequireDefault(require("./routes/form.routes"));
var _user = _interopRequireDefault(require("./routes/user.routes"));
var _path = _interopRequireDefault(require("path"));
var _morgan = _interopRequireDefault(require("morgan"));
var _connectFlash = _interopRequireDefault(require("connect-flash"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _passport = _interopRequireDefault(require("./config/passport"));
var _config = require("./config");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//inicializacion
var app = (0, _express["default"])();

//settings
app.set("views", _path["default"].join(__dirname, "views"));
var exphbs = (0, _expressHandlebars.create)({
  // Configura la ruta para los diseños y fragmentos
  layoutsDir: _path["default"].join(app.get("views"), "layouts"),
  partialsDir: _path["default"].join(app.get("views"), "partials"),
  // Configura la extensión de los archivos de plantilla
  extname: ".hbs",
  // Configura el diseño predeterminado
  defaultLayout: "main",
  // Agrega funciones auxiliares personalizadas
  helpers: {
    // Esta función ayuda a comparar dos valores
    eq: function eq(a, b) {
      return a === b;
    }
  }
});

// Configura Handlebars como el motor de plantillas
app.engine(".hbs", exphbs.engine);
app.set("view engine", ".hbs");

//midlewares
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _expressSession["default"])({
  secret: _config.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'none'
  }
}));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
app.use((0, _connectFlash["default"])());

//global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

//routes
app.use(_form["default"]);
app.use(_user["default"]);

//static files
app.use(_express["default"]["static"](_path["default"].join(__dirname, "public")));
app.use('/files', _express["default"]["static"](_path["default"].join(__dirname, 'files')));
var _default = app;
exports["default"] = _default;