import { Router } from 'express';
import { register, login, refreshToken, forgotPassword, resetPassword, logout, getMe, uploadAvatar } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/logout', logout);

router.get('/me', authenticate, getMe);
router.post('/avatar', authenticate, upload.single('avatar'), uploadAvatar);

export default router;
