import { Router } from "express";
import {
  renderTask,
  createTask,
  renderTaskEdit,
  editTask,
  deleteTask,
  toggleTask,
} from "../controllers/task.controller";
import helpers from "../helpers/auth";

const router = Router();

router.get("/task", helpers.isAuthenticated, renderTask);

router.post("/task/add", helpers.isAuthenticated, createTask);

router.get("/task/:id/edit", helpers.isAuthenticated, renderTaskEdit);

router.post("/task/:id/edit", helpers.isAuthenticated, editTask);

router.get("/task/:id/delete", helpers.isAuthenticated, deleteTask);

router.get("/task/:id/toggledone", helpers.isAuthenticated, toggleTask);

export default router;
