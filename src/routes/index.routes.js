import { Router } from "express";
import {
  renderTask,
  createTask,
  renderTaskEdit,
  editTask,
  deleteTask,
  toggleTask,
} from "../controllers/task.controller";
import {
  renderSignIn,
  renderSignUp,
  signInUser,
  signUpUser,
} from "../controllers/login.controller";

const router = Router();

router.get("/task", renderTask);

router.post("/task/add", createTask);

router.get("/task/:id/edit", renderTaskEdit);

router.post("/task/:id/edit", editTask);

router.get("/task/:id/delete", deleteTask);

router.get("/task/:id/toggledone", toggleTask);

router.get("/signup", renderSignUp);

router.post("/signup", signUpUser);

router.get("/", renderSignIn);

router.post("/", signInUser);

export default router;
