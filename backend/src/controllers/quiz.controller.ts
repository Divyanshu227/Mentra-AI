import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const generateQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt, useWebSearch } = req.body;
    const file = req.file; // From multer

    if (!prompt && !file) {
      res.status(400).json({ error: 'Prompt or file is required.' });
      return;
    }

    // Determine the model
    const modelName = 'gemini-1.5-flash';
    // For now, web search might require specific tools config for gemini
    const tools = useWebSearch === 'true' ? [{ googleSearch: {} }] : undefined;
    const model = genAI.getGenerativeModel({ model: modelName, tools });

    const parts: any[] = [];

    // Add prompt
    if (prompt) {
      parts.push({ text: `Generate a quiz based on the following instructions: ${prompt}` });
    } else {
       parts.push({ text: `Generate a quiz based on the provided document.` });
    }
    
    // Add strict instructions for JSON format
    parts.push({ text: `
You must respond with a strict JSON object (and absolutely nothing else) in the following format:
{
  "title": "Quiz Title",
  "topic": "Topic Name",
  "difficulty": "easy/medium/hard",
  "questions": [
    {
      "text": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option B",
      "explanation": "Why this is correct."
    }
  ]
}
` });

    // Add file if uploaded (Image or PDF)
    if (file) {
      const mimeType = file.mimetype;
      // In-memory or file system depending on multer config
      const fileData = fs.readFileSync(file.path);
      
      parts.push({
        inlineData: {
          data: fileData.toString('base64'),
          mimeType,
        },
      });
    }

    const result = await model.generateContent(parts);
    const responseText = result.response.text();
    
    // Clean up JSON block if present
    const cleanedJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let quizData;
    try {
      quizData = JSON.parse(cleanedJson);
    } catch (parseError) {
      console.error('Failed to parse AI response:', cleanedJson);
      res.status(500).json({ error: 'AI returned invalid format.' });
      return;
    }

    // Determine userId if logged in (from auth middleware, assuming req.user exists if we use it)
    const userId = (req as any).user?.id || null;

    // Save to DB
    const savedQuiz = await prisma.quiz.create({
      data: {
        title: quizData.title,
        topic: quizData.topic,
        difficulty: quizData.difficulty,
        userId: userId,
        questions: {
          create: quizData.questions.map((q: any) => ({
            text: q.text,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
          })),
        },
      },
      include: {
        questions: true,
      }
    });

    // Clean up temporary file
    if (file) {
      fs.unlinkSync(file.path);
    }

    res.status(200).json(savedQuiz);
  } catch (error) {
    console.error('Error generating quiz:', error);
    res.status(500).json({ error: 'Failed to generate quiz.' });
  }
};

export const getQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: { questions: true },
    });

    if (!quiz) {
      res.status(404).json({ error: 'Quiz not found' });
      return;
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ error: 'Failed to fetch quiz.' });
  }
};
