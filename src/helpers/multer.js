import multer from "multer";
import path from "path";
import { FILE_SIZE } from "../config";
import fs from "fs";

var hoy = new Date();
var hoyformateado = hoy
  .toISOString()
  .replace(/[^0-9]/g, "")
  .slice(0, -5);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const codigoRepa = req.user.codigoRepa;
      const dir = path.join(__dirname, "..", "files", codigoRepa);
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const usuario = req.user.usuario;
      const codigoRepa = req.user.codigoRepa;
      const fieldName = file.fieldname.toUpperCase();
      const extension = path.extname(file.originalname).toLowerCase();
      const timestamp = hoyformateado;
      const filename = `${usuario}-${fieldName}-${timestamp}${extension}`;
      cb(null, filename);
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
  fileFilter: fileFilter(/pdf|doc|docx|odt|PDF|DOC|DOCX|ODT/),
  dest: path.join(__dirname, "..", "files"),
};

export const uploadFile = multer(options).fields([
  { name: "cvFile", maxCount: 1 },
  { name: "dniFile", maxCount: 1 },
]);

export const uploadFileEm = multer(options).fields([
  { name: "estatutoFile", maxCount: 1 },
  { name: "dniFile", maxCount: 1 },
]);
