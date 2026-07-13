import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

// Will be initialized inside the function to ensure env vars are loaded
let genAI: GoogleGenerativeAI;

export const generateQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt, useWebSearch, questionCount, difficulty, tone, language } = req.body;
    const file = req.file; // From multer

    if (!prompt && !file) {
      res.status(400).json({ error: 'Prompt or file is required.' });
      return;
    }

    if (!genAI) {
      genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    }

    // Determine the model
    const modelName = 'gemini-2.5-flash';
    // For now, web search might require specific tools config for gemini
    const tools = useWebSearch === 'true' ? [{ googleSearch: {} }] : undefined;
    const model = genAI.getGenerativeModel({ model: modelName, tools });

    const parts: any[] = [];

    const numQuestions = questionCount ? parseInt(questionCount) : 5;
    const diffText = difficulty ? difficulty : 'Medium';
    const toneText = tone ? tone : 'Academic';
    const langText = language ? language : 'English';

    const baseInstruction = `Generate a quiz with EXACTLY ${numQuestions} questions. 
    The difficulty level must be ${diffText}. 
    The tone and style of the questions and explanations must be ${toneText}.
    The entire quiz (questions, options, explanations) MUST be written in ${langText}.`;

    // Add prompt
    if (prompt) {
      parts.push({ text: `${baseInstruction}\nBased on the following instructions: ${prompt}` });
    } else {
       parts.push({ text: `${baseInstruction}\nBased on the provided document.` });
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

    console.log('--- Generating Quiz ---');
    console.log('Model:', modelName);
    console.log('Prompt exists:', !!prompt, 'File exists:', !!file);
    console.log('Calling Gemini API...');

    const result = await model.generateContent(parts);
    console.log('Received response from Gemini');
    
    const responseText = result.response.text();
    console.log('Raw AI Response:', responseText.substring(0, 200) + '...');
    
    // Extract JSON block
    const firstBrace = responseText.indexOf('{');
    const lastBrace = responseText.lastIndexOf('}');
    let cleanedJson = responseText;
    
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanedJson = responseText.substring(firstBrace, lastBrace + 1);
    }
    
    let quizData;
    try {
      quizData = JSON.parse(cleanedJson);
      console.log('Successfully parsed JSON:', quizData.title);
    } catch (parseError) {
      console.error('Failed to parse AI response. Cleaned JSON was:', cleanedJson);
      res.status(500).json({ error: 'AI returned invalid format.' });
      return;
    }

    // Determine userId if logged in (from auth middleware, assuming req.user exists if we use it)
    const userId = (req as any).user?.id || null;

    console.log('Saving quiz to database...');
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
      console.log('Cleaning up temporary file:', file.path);
      fs.unlinkSync(file.path);
    }

    console.log('Quiz generated and saved successfully:', savedQuiz.id);
    res.status(200).json(savedQuiz);
  } catch (error: any) {
    console.error('!!! ERROR in generateQuiz !!!');
    console.error(error);
    res.status(500).json({ error: error.message || 'Failed to generate quiz.' });
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

export const getUserQuizzes = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const quizzes = await prisma.quiz.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { questions: true }
        }
      }
    });

    res.status(200).json(quizzes);
  } catch (error) {
    console.error('Error fetching user quizzes:', error);
    res.status(500).json({ error: 'Failed to fetch quizzes.' });
  }
};
