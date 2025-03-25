import express from "express";
import {
  changeTodoStatus,
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/todosController.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/new", createTodo);
router.delete("/delete/:id", deleteTodo);
router.put("/update/:id", updateTodo);
router.patch("/status/:id", changeTodoStatus);

export default router;
