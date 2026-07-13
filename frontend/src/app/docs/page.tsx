import React from 'react';
import Link from 'next/link';
import { BookOpen, KeyRound, Lightbulb, Image as ImageIcon, FileText, ArrowRight } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans pb-32">
      {/* Header section for docs */}
      <div className="border-b border-zinc-900 bg-zinc-950 pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Official Documentation</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white">
            Mentra AI Guide
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl">
            Everything you need to know to get the most out of your AI-powered learning journey. Learn how to generate quizzes from any material.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-16 grid gap-16">
        
        {/* Section 1 */}
        <section className="scroll-mt-24" id="authentication">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <KeyRound className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold">Authentication</h2>
          </div>
          <div className="prose prose-invert max-w-none text-zinc-300">
            <p className="mb-4">
              To use Mentra AI, you must create a free account. Your account securely stores your generated quizzes and learning progress.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Click the <strong>Sign In</strong> button on the top right.</li>
              <li>If you don't have an account, click <strong>Sign up</strong> at the bottom of the login form.</li>
              <li>Once logged in, you can click on your Avatar to change your profile picture or log out safely.</li>
            </ul>
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-100 text-sm">
              <strong>Security Note:</strong> We use industry standard JWT access tokens (15m expiry) and secure, HttpOnly refresh cookies (7 day expiry) to keep your sessions perfectly safe.
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="scroll-mt-24" id="generating-quizzes">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
            </div>
            <h2 className="text-2xl font-bold">Generating Quizzes</h2>
          </div>
          <div className="prose prose-invert max-w-none text-zinc-300">
            <p className="mb-4">
              Mentra AI's core feature is transforming raw information into interactive assessments. You can generate a quiz using three different input methods:
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 my-8">
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                <FileText className="w-6 h-6 text-green-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">1. Text Prompts</h3>
                <p className="text-sm text-zinc-400">
                  Simply type a topic or detailed instructions. E.g., "Create a hard quiz about React Server Components focusing on caching strategies."
                </p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                <ImageIcon className="w-6 h-6 text-purple-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">2. File Uploads</h3>
                <p className="text-sm text-zinc-400">
                  Upload PDF documents (like lecture slides or research papers) or Images (like screenshots of notes). We extract the text automatically.
                </p>
              </div>
            </div>

            <p className="mb-4">
              You can also toggle the <strong>Web Search</strong> feature. When enabled, Mentra AI will search the internet for the most up-to-date information regarding your prompt before generating the quiz.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="scroll-mt-24" id="taking-quizzes">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold">Taking a Quiz</h2>
          </div>
          <div className="prose prose-invert max-w-none text-zinc-300">
            <p className="mb-4">
              Once generated, you will be redirected to the interactive quiz player.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Read the question and select the best answer from the options provided.</li>
              <li>You will instantly see whether your answer was correct (marked in green) or incorrect (marked in red).</li>
              <li>An <strong>Explanation</strong> box will appear below the options to help you understand the core concepts.</li>
              <li>Click <strong>Next Question</strong> to proceed. At the end, you'll receive your final score!</li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to test your knowledge?</h2>
          <p className="text-zinc-400 mb-8 max-w-md mx-auto">
            Stop passively reading and start actively learning. Generate your first quiz today.
          </p>
          <Link
            href="/generate"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold text-lg py-3 px-8 rounded-full hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
          >
            Go to Generator
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
