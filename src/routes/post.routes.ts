import express from 'express';

import { asyncHandler } from '../utils/asyncHandler';
import  authMiddleware   from '../middleware/authMiddleware';
import { PostController } from '../controllers/PostController';

const router = express.Router();
const postController = new PostController();


router.post('/post/create', authMiddleware , asyncHandler(postController.create));
router.get('/post/:id/detail', authMiddleware , asyncHandler(postController.detail));
router.put('/post/:id/update', authMiddleware , asyncHandler(postController.updatePost));
router.delete('/post/:id/delete', authMiddleware , asyncHandler(postController.delete));

export default router;
