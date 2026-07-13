import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

import authRoutes from './routes/auth.routes';
import quizRoutes from './routes/quiz.routes';

app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Mentra AI Backend is up and running!');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Mentra AI backend is running.' });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
