import express from "express";
import { create } from "express-handlebars";
import indexRoutes from "./routes/index.routes";
import userRoutes from "./routes/user.routes";
import path from "path";
import morgan from "morgan";
import flash from "connect-flash";
import session from "express-session";

//inicializacion
const app = express();

//settings
app.set("views", path.join(__dirname, "views"));

const exphbs = create({
  layoutsDir: path.join(app.get("views"), "layouts"),
  partialsDir: path.join(app.get("views"), "partials"),
  extname: ".hbs",
  defaultLayout: "main",
});

app.engine(".hbs", exphbs.engine);
app.set("view engine", ".hbs");

//midlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

//global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  console.log(res.locals.error_msg)
  next();
});

//routes
app.use(indexRoutes);
app.use(userRoutes);

//static files
app.use(express.static(path.join(__dirname, "public")));

export default app;
