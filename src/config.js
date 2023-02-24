import dotenv from "dotenv";

dotenv.config();
export const MONGODB_URI = process.env.MONGODB_URI;
export const PORT = process.env.PORT || 3000;
export const SESSION_SECRET = process.env.SESSION_SECRET || "secret";
export const FILE_SIZE = process.env.FILE_SIZE || 1000000
export const SESSION_MAX_AGE = process.env.SESSION_MAX_AGE || 1800000