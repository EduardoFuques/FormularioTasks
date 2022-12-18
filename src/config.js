import dotenv from "dotenv";

dotenv.config();
// Base de datos
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://julio:Julio2022@172.27.2.249:27017/appj';

// Aplicación
export const PORT = process.env.PORT || 3000;
export const SESSION_SECRET = process.env.SESSION_SECRET || "secret";

// Mail
export const MAIL_USER = process.env.MAIL_USER
export const MAIL_PASS = process.env.MAIL_PASS