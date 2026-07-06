'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/quiz/${id}`);
        if (!res.ok) throw new Error('Failed to fetch quiz');
        const data = await res.json();
        setQuiz(data);
      } catch (err: any) {
        setError(err.message || 'Error loading quiz');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchQuiz();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-400">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p>Loading your quiz...</p>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-red-400">
        <p className="mb-4">{error || 'Quiz not found'}</p>
        <button onClick={() => router.push('/generate')} className="text-blue-500 hover:underline">
          Go back to generator
        </button>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);
    if (option === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center py-20 px-6">
        <div className="max-w-xl w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-2">Quiz Completed!</h2>
          <p className="text-zinc-400 mb-8">{quiz.title}</p>
          
          <div className="w-32 h-32 rounded-full border-4 border-blue-500 flex flex-col items-center justify-center mx-auto mb-8">
            <span className="text-4xl font-bold text-white">{score}</span>
            <span className="text-sm text-zinc-400">out of {quiz.questions.length}</span>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push('/generate')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Generate New Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center py-20 px-6">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <div className="mb-8 flex justify-between items-end border-b border-zinc-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">{quiz.title}</h1>
            <p className="text-zinc-400 text-sm">Topic: {quiz.topic || 'General'} • Difficulty: {quiz.difficulty || 'Mixed'}</p>
          </div>
          <div className="text-zinc-500 text-sm font-medium">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl mb-8">
          <h2 className="text-xl text-zinc-100 font-medium mb-8 leading-relaxed">
            {currentQuestion.text}
          </h2>

          <div className="flex flex-col gap-3 mb-8">
            {currentQuestion.options.map((option: string, idx: number) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              
              let buttonStyles = "border-zinc-700 bg-zinc-950 text-zinc-300 hover:border-blue-500 hover:bg-zinc-900";
              
              if (isAnswered) {
                if (isCorrect) {
                  buttonStyles = "border-green-500 bg-green-500/10 text-green-400";
                } else if (isSelected && !isCorrect) {
                  buttonStyles = "border-red-500 bg-red-500/10 text-red-400";
                } else {
                  buttonStyles = "border-zinc-800 bg-zinc-950 text-zinc-600 opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex justify-between items-center ${buttonStyles}`}
                >
                  <span>{option}</span>
                  {isAnswered && isCorrect && <CheckCircle className="w-5 h-5 text-green-500" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="p-4 rounded-xl bg-blue-900/20 border border-blue-900/50 text-blue-100 text-sm mb-6 animate-in fade-in slide-in-from-bottom-2">
              <span className="font-semibold block mb-1">Explanation:</span>
              {currentQuestion.explanation || 'No explanation provided.'}
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className="bg-white text-black font-medium py-3 px-8 rounded-xl transition-all hover:bg-zinc-200 disabled:opacity-0 disabled:translate-y-2 flex items-center gap-2"
            >
              {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
