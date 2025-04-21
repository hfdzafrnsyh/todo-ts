import express from 'express';

import { UserController } from '../controllers/UserController';
import { asyncHandler } from '../utils/asyncHandler';
import  authMiddleware   from '../middleware/authMiddleware';

const router = express.Router();
const userController = new UserController();


router.post('/register', asyncHandler(userController.create));
router.post('/login', asyncHandler(userController.login));
router.get('/users', authMiddleware, asyncHandler(userController.userAll));



export default router;
