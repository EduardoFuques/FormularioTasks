import { Router } from "express";

import {
  renderSignIn,
  renderSignUp,
  signInUser,
  signUpUser,
  logOut,
  autenticacion,
} from "../controllers/user.controller";

const router = Router();

router.get("/signup", renderSignUp);

router.post("/signup", signUpUser);

router.get("/", renderSignIn);

router.post("/", autenticacion);

router.get("/logout", logOut)

export default router;
