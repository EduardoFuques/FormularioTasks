import dotenv from "dotenv";

dotenv.config();

//DATABASE
export const MONGODB_URI = process.env.MONGODB_URI;

//SERVIDOR
export const DOMINIO = process.env.DOMINIO || "localhost:3000"
export const PORT = process.env.PORT || 3000;

//SESSION
export const SESSION_SECRET = process.env.SESSION_SECRET || "secret";
export const SESSION_MAX_AGE = process.env.SESSION_MAX_AGE || 1800000
export const FILE_SIZE = process.env.FILE_SIZE || 1000000

//JWT
export const JWT_SECRET = process.env.JWT_SECRET || "secret";

//MAIL
export const MAIL_USER = process.env.MAIL_USER;
export const MAIL_PASS = process.env.MAIL_PASS;
export const MAIL_HOST = process.env.MAIL_HOST;
export const MAIL_PORT = process.env.MAIL_PORT;
