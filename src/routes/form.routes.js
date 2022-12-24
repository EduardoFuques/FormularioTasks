import { Router } from "express";
import { captureForm, renderForm, captureEditForm } from "../controllers/form.controller";
import helpers from "../helpers/auth";
import { fileUpload } from "../helpers/multer";

const router = Router();

router.get("/form", helpers.isAuthenticated, renderForm);

router.post("/form", helpers.isAuthenticated, fileUpload, captureForm);

router.post("/edit", helpers.isAuthenticated, fileUpload, captureEditForm);

export default router;