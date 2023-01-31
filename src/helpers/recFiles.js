import multer from "multer";
import path from "path";
import { FILE_SIZE } from "../config";


const hoy = new Date();
const hoyformateado = hoy.toISOString().replace(/[^0-9]/g, "-").slice(0, -5);

const storage = multer.diskStorage({
  destination: path.join(__dirname, "..", "files"),
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname.toUpperCase()}-${hoyformateado}-${req.user.usuario.toString()}${path.extname(file.originalname).toLowerCase()}`
    );
  },
});

const fileFilter = (filetypes) => (req, file, cb) => {
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname));
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb("Error: tipo de archivo no soportado");
};

const options = {
  storage,
  limits: {
    fileSize: FILE_SIZE,
  },
  fileFilter: fileFilter(/pdf|doc|docx|odt/),
  dest: path.join(__dirname, "..", "files"),
};

export const cvUpload = multer(options).single("cvFile");

options.fileFilter = fileFilter(/pdf/);
export const dniUpload = multer(options).single("dniFile");