import express from 'express';

import { CategoryController } from '../controllers/CategoryController';
import { asyncHandler } from '../utils/asyncHandler';
import  authMiddleware   from '../middleware/authMiddleware';

const router = express.Router();
const categoryController = new CategoryController();


router.post('/category/create', authMiddleware , asyncHandler(categoryController.create));


export default router;
