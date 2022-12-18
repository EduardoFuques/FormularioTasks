import { Router } from "express";
import { captureForm, renderForm } from "../controllers/form.controller";
import helpers from "../helpers/auth";

const router = Router();

router.get("/form", helpers.isAuthenticated, renderForm);

router.post("/form", helpers.isAuthenticated, captureForm);

export default router;