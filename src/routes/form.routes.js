import { Router } from "express";
import { renderForm } from "../controllers/form.controller";
import helpers from "../helpers/auth";

const router = Router();

router.get("/form", helpers.isAuthenticated, renderForm);

export default router;