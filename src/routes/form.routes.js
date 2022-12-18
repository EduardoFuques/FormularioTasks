import { Router } from "express";
import { captureForm, renderForm } from "../controllers/form.controller";
import { renderMail, sendMail } from "../controllers/mail.controller";
import helpers from "../helpers/auth";

const router = Router();

router.get("/form", helpers.isAuthenticated, renderForm);

router.post("/form", helpers.isAuthenticated, captureForm);

router.get("/email", renderMail)

router.post("/send", sendMail)

export default router;