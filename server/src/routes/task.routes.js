import express from 'express';
const router = express.Router();
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/task.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import validate from '../middlewares/validate.middleware.js';

router.route('/')
  .get(protect, getTasks)
  .post(protect, validate(['title']), createTask);

router.route('/:id')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

export default router;
