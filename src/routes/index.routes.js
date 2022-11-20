import { Router } from "express";
import {renderTask, createTask, renderTaskEdit, editTask, deleteTask, toggleTask} from '../controllers/task.controller'

const router = Router();

router.get("/", renderTask);

router.post("/task/add", createTask);

router.get("/task/:id/edit", renderTaskEdit);

router.post("/task/:id/edit", editTask);

router.get("/task/:id/delete", deleteTask);

router.get("/task/:id/toggledone", toggleTask);

export default router;
