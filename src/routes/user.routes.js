import { Router } from "express";

import {
  renderSignIn,
  renderSignUp,
  signInUser,
  signUpUser,
  logOut,
} from "../controllers/user.controller";

const router = Router();

router.get("/signup", renderSignUp);

router.post("/signup", signUpUser);

router.get("/", renderSignIn);

router.post("/", signInUser);

router.get("/logout", logOut)

export default router;
