import { Router } from "express";
import {
  captureForm,
  renderForm,
  captureEditForm,
} from "../controllers/form.controller";
import helpers from "../helpers/auth";
import { uploadFile } from "../helpers/multer";
import { cvUpload } from "../helpers/recFiles";
import { dniUpload } from "../helpers/recFiles";

const router = Router();

router.get("/form", helpers.isAuthenticated, renderForm);

router.post("/form", helpers.isAuthenticated, uploadFile, captureForm);

router.post("/edit", helpers.isAuthenticated, uploadFile, captureEditForm);

export default router;
