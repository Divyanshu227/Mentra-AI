import { Router } from 'express';
import { register, login, refreshToken, forgotPassword, resetPassword, logout } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/logout', logout);

router.get('/me', authenticate, (req, res) => {
  res.json({ message: 'Authenticated user details', user: (req as any).user });
});

export default router;
