import { Router } from "express";
import {
  renderSignIn,
  renderSignUp,
  signUpUser,
  logOut,
  autenticacion,
} from "../controllers/user.controller";
import helpers from "../helpers/auth";

const router = Router();

router.get("/signup", renderSignUp);

router.post("/signup", signUpUser);

router.get("/", renderSignIn);

router.post("/", autenticacion);

router.get("/logout", helpers.isAuthenticated, logOut);

export default router;
