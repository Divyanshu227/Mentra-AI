import { Router } from 'express';
import multer from 'multer';
import { generateQuiz, getQuiz } from '../controllers/quiz.controller';

const router = Router();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Routes
router.post('/generate', upload.single('file'), generateQuiz);
router.get('/:id', getQuiz);

export default router;
