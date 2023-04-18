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
} from "../controllers/user.controller";
import helpers from "../helpers/auth";
import { cargaInicial } from "../libs/carga-inicial";

const router = Router();

router.get("/signup", renderSignUp);

router.post("/signup", signUpUser);

router.get("/", renderSignIn);

router.post("/", autenticacion);

router.get("/logout", helpers.isAuthenticated, logOut);

router.get("/password", renderPassword)

router.post("/password", restablecerPassword)

router.get("/reset-password/:token", resetPasswordController)

router.post("/reset-password/:token", updatePasswordController)

// router.post('/accept-terms', function(req, res) {
//   var accepted = req.body.accepted;
//   // Procesa la solicitud de aceptación de los términos y condiciones aquí.
//   res.render('ok');
// });

//router.get("/carga", cargaInicial)

export default router;
