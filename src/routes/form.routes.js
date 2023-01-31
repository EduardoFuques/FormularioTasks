import { Router } from "express";
import { captureForm, renderForm, captureEditForm } from "../controllers/form.controller";
import helpers from "../helpers/auth";
import { cvUpload } from "../helpers/recFiles";
import { dniUpload } from "../helpers/recFiles";

const router = Router();

router.get("/form", helpers.isAuthenticated, renderForm);

router.post("/form", helpers.isAuthenticated, cvUpload, captureForm);

router.post("/edit", helpers.isAuthenticated, cvUpload, captureEditForm);

export default router;