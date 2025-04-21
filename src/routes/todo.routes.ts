import express from 'express';

import { asyncHandler } from '../utils/asyncHandler';
import  authMiddleware   from '../middleware/authMiddleware';
import { TodoController } from '../controllers/TodoController';

const router = express.Router();
const todoController = new TodoController();

router.get('/todo' , authMiddleware , asyncHandler(todoController.getAllTodo));
router.get('/todo/:id' , authMiddleware , asyncHandler(todoController.detail));
router.post('/todo/add' , authMiddleware , asyncHandler(todoController.create));
router.delete('/todo/:id/delete' , authMiddleware , asyncHandler(todoController.delete));
router.put('/todo/:id/update' , authMiddleware , asyncHandler(todoController.update));


export default router;
