import express from "express";
import {create} from 'express-handlebars';
import indexRoutes from './routes/index.routes';
import path from 'path';
import morgan from "morgan";

const app = express();

app.set('views', path.join(__dirname, 'views'));

const exphbs = create({
    layoutsDir: path.join(__dirname, 'layouts'),
    partialsDir: path.join(app.get("views"), 'partials'),
    extname: ".hbs",
    defaultLayout: 'main'
});

app.engine(".hbs", exphbs.engine);
app.set("view engine", ".hbs")

//midlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false}))

//routes
app.use(indexRoutes);

export default app;