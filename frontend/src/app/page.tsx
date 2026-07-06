import Link from "next/link";
import { Sparkles, Brain, Zap, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between py-6 px-10 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-blue-500" />
          <span className="text-xl font-bold tracking-tight">Mentra AI</span>
        </div>
        <div className="flex gap-4">
          <Link href="/generate" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Quiz Generator
          </Link>
          <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center py-32 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 animate-fade-in-up">
          <Sparkles className="w-4 h-4" />
          <span>Introducing AI Quiz Generator</span>
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl bg-gradient-to-br from-white to-zinc-500 text-transparent bg-clip-text leading-tight">
          Master any topic with AI-generated quizzes.
        </h1>
        
        <p className="text-xl text-zinc-400 max-w-2xl mb-12">
          Upload a PDF, paste an image, or just type a prompt. Mentra AI builds a custom, interactive quiz in seconds to test your knowledge.
        </p>

        <Link
          href="/generate"
          className="group flex items-center justify-center gap-2 bg-white text-black font-semibold text-lg py-4 px-8 rounded-full hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95"
        >
          Start Generating Free
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </main>

      {/* Features */}
      <section className="py-24 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-3xl">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Brain className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Adaptive Learning</h3>
            <p className="text-zinc-400">Quizzes that match your desired difficulty, helping you grasp complex concepts faster.</p>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-3xl">
            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Instant Feedback</h3>
            <p className="text-zinc-400">Get immediate explanations for your answers, ensuring you learn from every mistake.</p>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-3xl">
            <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Any Material</h3>
            <p className="text-zinc-400">Upload lecture slides (PDF) or a screenshot of your notes, and we handle the rest.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
