import dotenv from "dotenv";

dotenv.config();
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://julio:Julio2022@172.27.2.249:27017/appj';
export const PORT = process.env.PORT || 3000;
export const SESSION_SECRET = process.env.SESSION_SECRET || "secret";