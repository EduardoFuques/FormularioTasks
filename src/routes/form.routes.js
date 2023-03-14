import { Router } from "express";
import { captureEditFormEm, captureFormEm, renderFormem, renderPDFEm } from "../controllers/empresa.controller";
import {
  captureForm,
  renderForm,
  captureEditForm,
  renderPDF,
} from "../controllers/form.controller";
import { adminPF, adminPJ } from "../controllers/admin.controller";
import helpers from "../helpers/auth";
import { uploadFile, uploadFileEm } from "../helpers/multer";
import { verifyRole } from "../helpers/roles";

const router = Router();

// PERSONAS FISICAS
router.get("/form", helpers.isAuthenticated, verifyRole('normal'), renderForm);

router.post("/form", helpers.isAuthenticated, verifyRole('normal'), uploadFile, captureForm);

router.post("/edit", helpers.isAuthenticated, verifyRole('normal'), uploadFile, captureEditForm);

router.get("/pdf", helpers.isAuthenticated, verifyRole('normal'),renderPDF);


// PERSONAS JURIDICAS
router.get("/formEm", helpers.isAuthenticated, verifyRole('perJur'), renderFormem);

router.post("/formEm", helpers.isAuthenticated, verifyRole('perJur'), uploadFileEm, captureFormEm);

router.post("/editEm", helpers.isAuthenticated, verifyRole('perJur'), uploadFileEm, captureEditFormEm);

router.get("/pdfEm", helpers.isAuthenticated, verifyRole('perJur'), renderPDFEm);

// ADMINISTRACION
//router.get("/administracion/PJ", adminPJ);

//router.get("/administracion/PF", adminPF);

export default router;
