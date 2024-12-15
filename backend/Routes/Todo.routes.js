import { Router } from "express";
import { verifyJWT } from "../Middlewares/authorization.middleware.js";
import { addTodo, updateTodo, deleteTodo, toggleTodo, getTodos } from "../Controllers/Todo.controller.js";

const router = Router();

// Secured routes
router.post("/add", addTodo);
router.delete("/delete", verifyJWT, deleteTodo);
router.put("/update", verifyJWT, updateTodo);
router.put("/toggle", verifyJWT, toggleTodo);
router.get('/get/:userId', verifyJWT, getTodos);

export default router;
