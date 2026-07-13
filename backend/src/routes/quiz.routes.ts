import { Router } from 'express';
import multer from 'multer';
import { generateQuiz, getQuiz } from '../controllers/quiz.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Routes
router.post('/generate', authenticate, upload.single('file'), generateQuiz);
router.get('/:id', authenticate, getQuiz);

export default router;
