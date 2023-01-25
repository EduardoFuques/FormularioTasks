import multer from "multer";
import path from "path";
import { FILE_SIZE } from "../config";

const hoy = new Date();
function formatoFecha(fecha, formato) {
  const map = {
    dd: fecha.getDate(),
    mm: fecha.getMonth() + 1,
    yyyy: fecha.getFullYear(),
    hh: fecha.getHours(),
    mi: fecha.getMinutes(),
    ss: fecha.getSeconds(),
  };

  return formato.replace(/dd|mm|yyyy|hh|mi|ss/gi, (matched) => map[matched]);
}
const hoyformateado = formatoFecha(hoy, "yyyymmddhhmiss-");

const storageCV = multer.diskStorage({
  destination: path.join(__dirname, "..", "files"),
  filename: (req, file, cb) => {
    cb(
      null,
      hoyformateado +
        req.user.usuario.toString() +
        path.extname(file.originalname).toLowerCase()
    );
  },
});

// const storageDNI = multer.diskStorage({
//   destination: path.join(__dirname, "..", "files"),
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       hoyformateado +
//         req.user.usuario.toString() +
//         +"-DNI" +
//         path.extname(file.originalname).toLowerCase()
//     );
//   },
// });

export const cvUpload = multer({
  storage: storageCV,
  limits: {
    fileSize: FILE_SIZE,
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|doc|docx|odt/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: tipo de archivo no soportado");
  },
  dest: path.join(__dirname, "..", "files"),
}).single("cvFile");

// export const dniUpload = multer({
//   storage: storageDNI,
//   limits: {
//     fileSize: FILE_SIZE,
//   },
//   fileFilter: (req, file, cb) => {
//     const filetypes = /pdf/;
//     const mimetype = filetypes.test(file.mimetype);
//     const extname = filetypes.test(path.extname(file.originalname));
//     if (mimetype && extname) {
//       return cb(null, true);
//     }
//     cb("Error: tipo de archivo no soportado");
//   },
//   dest: path.join(__dirname, "..", "files"),
// }).single("dniFile");
