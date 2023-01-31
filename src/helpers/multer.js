import multer from "multer";
import path from "path";
import { FILE_SIZE } from "../config";

var hoy = new Date();
var hoyformateado = hoy
  .toISOString()
  .replace(/[^0-9]/g, "")
  .slice(0, -5);

const storage = multer.diskStorage({
  destination: path.join(__dirname, "..", "files"),
  filename: function (req, file, cb) {
    cb(
      null,
      `${req.user.usuario.toString()}-${file.fieldname.toUpperCase()}-${hoyformateado}${path
        .extname(file.originalname)
        .toLowerCase()}`
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

export const uploadFile = multer(options).fields([
  { name: "cvFile", maxCount: 1 },
  { name: "dniFile", maxCount: 1 },
]);
