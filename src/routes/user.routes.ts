import express from 'express';

import { UserController } from '../controllers/UserController';
import { asyncHandler } from '../utils/asyncHandler';
import  authMiddleware   from '../middleware/authMiddleware';
import { updatePhoto } from '../middleware/updatePhoto';
import { errorImageHandler } from '../middleware/errorImageHandler';

const router = express.Router();
const userController = new UserController();


router.post('/register', asyncHandler(userController.create));
router.post('/login', asyncHandler(userController.login));
router.get('/users', authMiddleware, asyncHandler(userController.userAll));
router.get('/user/profile', authMiddleware, asyncHandler(userController.profile));
router.put('/user/profile/update', authMiddleware,updatePhoto,errorImageHandler, asyncHandler(userController.updateProfile));




export default router;
