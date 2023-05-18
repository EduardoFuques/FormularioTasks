import { Router } from "express";
import {
  renderSignIn,
  renderSignUp,
  signUpUser,
  logOut,
  autenticacion,
  renderPassword,
  restablecerPassword,
  resetPasswordController,
  updatePasswordController,
  renderSignUpPJ,
  signUpPJ,
} from "../controllers/user.controller";
import helpers from "../helpers/auth";
import { cargaInicial } from "../libs/carga-inicial";

const router = Router();

router.get("/signup", renderSignUp);

router.post("/signup", signUpUser);

router.get("/signupPJ", renderSignUpPJ);

router.post("/signupPJ", signUpPJ);

router.get("/", renderSignIn);

router.post("/", autenticacion);

router.get("/logout", helpers.isAuthenticated, logOut);

router.get("/password", renderPassword);

router.post("/password", restablecerPassword);

router.get("/reset-password/:token", resetPasswordController);

router.post("/reset-password/:token", updatePasswordController);

//router.get("/carga", cargaInicial)

export default router;
