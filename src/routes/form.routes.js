import { Router } from "express";
import {
  captureForm,
  renderForm,
  captureEditForm,
  renderPDF,
} from "../controllers/form.controller";
import helpers from "../helpers/auth";
import { uploadFile } from "../helpers/multer";
import { verifyRole } from "../helpers/roles";

const router = Router();

// PERSONAS FISICAS
router.get("/form", helpers.isAuthenticated, verifyRole('normal'), renderForm);

router.post("/form", helpers.isAuthenticated, verifyRole('normal'), uploadFile, captureForm);

router.post("/edit", helpers.isAuthenticated, verifyRole('normal'), uploadFile, captureEditForm);

router.get("/pdf", helpers.isAuthenticated, renderPDF);


// PERSONAS JURIDICAS
router.get("/formEm", helpers.isAuthenticated, verifyRole('perJur'), function(req, res) {
  res.send('PerJur formulario');
});

router.post("/formEm", helpers.isAuthenticated, verifyRole('perJur'), function(req, res) {
  res.send('PerJur post formulario');
});

router.post("/editEm", helpers.isAuthenticated, verifyRole('perJur'), function(req, res) {
  res.send('PerJur post edit');
});

router.get("/pdfEm", helpers.isAuthenticated, verifyRole('perJur'), function(req, res) {
  res.send('PerJur post formulario');
});

export default router;
