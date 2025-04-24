import express from 'express';

import { asyncHandler } from '../utils/asyncHandler';
import  authMiddleware   from '../middleware/authMiddleware';
import { PostCategoryController } from '../controllers/PostCategoryController';

const router = express.Router();
const postCategoryController = new PostCategoryController;


router.get('/postcategory', authMiddleware , asyncHandler(postCategoryController.getAll));

export default router;
