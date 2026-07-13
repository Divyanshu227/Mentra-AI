'use client';

import React, { useState } from 'react';
import { Upload, Loader2, Sparkles, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { fetchApi } from '@/lib/api';

export default function GenerateQuiz() {
  const [prompt, setPrompt] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [useWebSearch, setUseWebSearch] = useState(false);
  const [questionCount, setQuestionCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt && !file) {
      setError('Please provide a prompt or upload a file.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      const formData = new FormData();
      if (prompt) formData.append('prompt', prompt);
      if (file) formData.append('file', file);
      formData.append('useWebSearch', useWebSearch.toString());
      formData.append('questionCount', questionCount.toString());

      const res = await fetchApi('/api/quiz/generate', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to generate quiz.');
      }

      const data = await res.json();
      router.push(`/quiz/${data.id}`);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col items-center py-20 px-6">
      <div className="max-w-2xl w-full">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4 flex items-center justify-center gap-2">
            <Sparkles className="text-blue-500" />
            AI Quiz Generator
          </h1>
          <p className="text-zinc-400 text-lg">
            Create an interactive quiz from any topic, PDF, or image in seconds.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Topic or Instructions
            </label>
            <textarea
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              rows={4}
              placeholder="e.g. Create a hard difficulty quiz about Quantum Mechanics focusing on entanglement..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Upload Material (Optional)
            </label>
            <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:border-zinc-500 transition-colors cursor-pointer bg-zinc-950/50 group">
              <input
                type="file"
                className="hidden"
                id="file-upload"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept=".pdf,image/*"
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                <Upload className="w-8 h-8 text-zinc-500 group-hover:text-zinc-300 mb-3 transition-colors" />
                <span className="text-zinc-300 font-medium">
                  {file ? file.name : 'Click to upload a PDF or Image'}
                </span>
                {!file && <span className="text-zinc-500 text-sm mt-1">or drag and drop</span>}
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Number of Questions
            </label>
            <select
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
            >
              <option value={5}>5 Questions (Quick Test)</option>
              <option value={10}>10 Questions (Standard)</option>
              <option value={15}>15 Questions (Deep Dive)</option>
              <option value={20}>20 Questions (Mastery)</option>
            </select>
          </div>

          <div className="mb-8 flex items-center gap-3 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-zinc-200 flex items-center gap-2">
                <Search className="w-4 h-4 text-zinc-400" />
                Allow Web Search
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                Let AI search the internet for the most up-to-date information.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={useWebSearch}
                onChange={(e) => setUseWebSearch(e.target.checked)}
              />
              <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Quiz... (This may take a few seconds)
              </>
            ) : (
              'Generate Quiz'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
