import express from "express";
import { createTask, deleteTask, filterTasksByStatus, getTasks, updateTask } from "../controller/taskController.js";

const router = express.Router();

router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/status/:status', filterTasksByStatus);

export default router