'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { History, Loader2, ArrowRight, Brain, Clock, ChevronRight } from 'lucide-react';
import { fetchApi } from '@/lib/api';

export default function HistoryPage() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await fetchApi('/api/quiz/history/all');
        if (!res.ok) {
          throw new Error('Failed to load quiz history.');
        }
        const data = await res.json();
        setQuizzes(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong.');
      } finally {
        setIsLoading(false);
      }
    };
    loadHistory();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans p-6 pb-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12 mt-8">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2 flex items-center gap-3">
              <History className="w-10 h-10 text-blue-500" />
              Quiz History
            </h1>
            <p className="text-zinc-400 text-lg">
              Review and retake all your previously generated quizzes.
            </p>
          </div>
          <Link
            href="/generate"
            className="hidden sm:flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-white font-medium py-3 px-6 rounded-xl hover:bg-zinc-800 transition-colors"
          >
            Generate New
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {error && (
          <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200 mb-8">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-zinc-400">Loading your history...</p>
          </div>
        ) : quizzes.length === 0 ? (
          <div className="text-center py-32 bg-zinc-900/50 border border-zinc-800/50 rounded-3xl">
            <Brain className="w-16 h-16 text-zinc-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-zinc-300 mb-2">No quizzes found</h2>
            <p className="text-zinc-500 max-w-md mx-auto mb-8">
              You haven't generated any quizzes yet. Head over to the generator to create your first one!
            </p>
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors"
            >
              Start Generating
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Link href={`/quiz/${quiz.id}`} key={quiz.id} className="group">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-full hover:border-zinc-700 transition-all hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[40px] group-hover:bg-blue-500/10 transition-colors" />
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-400 text-xs font-medium uppercase tracking-wider">
                      <Clock className="w-3 h-3" />
                      {new Date(quiz.createdAt).toLocaleDateString()}
                    </div>
                    {quiz.difficulty && (
                      <div className={`px-2.5 py-1 rounded-md text-xs font-medium uppercase tracking-wider border ${
                        quiz.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        quiz.difficulty === 'Hard' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                      }`}>
                        {quiz.difficulty}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {quiz.title}
                  </h3>
                  <p className="text-zinc-400 text-sm mb-6 line-clamp-1">
                    {quiz.topic}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800/50">
                    <span className="text-sm font-medium text-zinc-500">
                      {quiz._count?.questions || 0} Questions
                    </span>
                    <span className="flex items-center text-blue-500 text-sm font-semibold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                      Retake
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
