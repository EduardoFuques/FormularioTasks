import { Router } from "express";
import {
  captureForm,
  renderForm,
  captureEditForm,
  renderPDF,
} from "../controllers/form.controller";
import helpers from "../helpers/auth";
import { uploadFile } from "../helpers/multer";

const router = Router();

router.get("/form", helpers.isAuthenticated, renderForm);

router.get("/formem", helpers.isAuthenticated, renderFormem);

router.post("/form", helpers.isAuthenticated, uploadFile, captureForm);

router.post("/edit", helpers.isAuthenticated, uploadFile, captureEditForm);

router.get("/pdf", helpers.isAuthenticated, renderPDF);

export default router;
