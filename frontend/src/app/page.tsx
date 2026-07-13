import Link from "next/link";
import { Sparkles, Brain, Zap, ArrowRight, BookOpen, Layers, CheckCircle2, FileText, Search } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-blue-500/30 overflow-hidden">
      
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-40 pb-32 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 backdrop-blur-md border border-zinc-800 text-zinc-300 text-sm font-medium mb-8 hover:bg-zinc-800/50 transition-colors cursor-default">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>The Next Generation of Learning</span>
        </div>
        
        <h1 className="text-6xl sm:text-8xl font-extrabold tracking-tighter mb-8 max-w-5xl leading-[1.1]">
          Master any topic with <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text">
            AI-generated quizzes.
          </span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-zinc-400 max-w-3xl mb-12 font-medium leading-relaxed">
          Upload a PDF, paste an image, or type a prompt. Mentra AI builds a custom, interactive assessment in seconds to solidify your knowledge.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            href="/generate"
            className="group flex items-center justify-center gap-2 bg-white text-black font-semibold text-lg py-4 px-10 rounded-full hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
          >
            Start Generating Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/docs"
            className="flex items-center justify-center gap-2 bg-zinc-900/50 backdrop-blur-md text-white border border-zinc-800 font-medium text-lg py-4 px-10 rounded-full hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95"
          >
            Read the Docs
          </Link>
        </div>
      </main>

      {/* How it Works - Timeline */}
      <section className="relative z-10 py-32 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold tracking-tight mb-4">How Mentra Works</h2>
            <p className="text-xl text-zinc-400">From raw material to mastery in three simple steps.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 p-8 rounded-3xl h-full flex flex-col relative z-10">
                <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-8">
                  <FileText className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">1. Provide Material</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Upload your lecture slides (PDF), paste a screenshot of your notes, or simply type a prompt describing what you want to learn.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 p-8 rounded-3xl h-full flex flex-col relative z-10">
                <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center mb-8">
                  <Brain className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">2. AI Processing</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Our advanced AI engine analyzes the context, optionally searches the web for up-to-date facts, and constructs challenging questions.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 p-8 rounded-3xl h-full flex flex-col relative z-10">
                <div className="w-14 h-14 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center mb-8">
                  <CheckCircle2 className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">3. Test Yourself</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Take the interactive quiz. Get immediate feedback and detailed explanations for every answer to reinforce your learning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Box Features Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Everything you need to learn faster.</h2>
            <p className="text-xl text-zinc-400">Powerful features packed into a beautifully simple interface.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            {/* Feature 1 - Large */}
            <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-10 flex flex-col justify-end relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] group-hover:bg-blue-500/20 transition-colors" />
              <Layers className="w-12 h-12 text-blue-400 mb-6" />
              <h3 className="text-3xl font-bold mb-4">Adaptive Difficulty</h3>
              <p className="text-zinc-400 text-lg">
                Choose between Easy, Medium, Hard, or Mixed difficulties. Mentra AI tailors the complexity of the questions to match your current proficiency level.
              </p>
            </div>

            {/* Feature 2 - Small Top */}
            <div className="md:col-span-2 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-[60px] group-hover:bg-purple-500/20 transition-colors" />
              <Search className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Live Web Search</h3>
              <p className="text-zinc-400">
                Enable web search to let the AI pull in the most recent articles and facts before generating your quiz.
              </p>
            </div>

            {/* Feature 3 - Small Bottom Left */}
            <div className="md:col-span-1 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group">
              <Zap className="w-8 h-8 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-zinc-400 text-sm">
                Quizzes are generated in seconds, not minutes.
              </p>
            </div>

            {/* Feature 4 - Small Bottom Right */}
            <div className="md:col-span-1 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group">
              <BookOpen className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Deep Explanations</h3>
              <p className="text-zinc-400 text-sm">
                Understand the 'why' behind every correct answer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-900 bg-zinc-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span className="text-lg font-bold tracking-tight">Mentra AI</span>
          </div>
          
          <div className="flex gap-8">
            <Link href="/generate" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
              Generator
            </Link>
            <Link href="/docs" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
              Documentation
            </Link>
            <Link href="/login" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
              Sign In
            </Link>
          </div>
          
          <div className="text-zinc-600 text-sm">
            &copy; {new Date().getFullYear()} Mentra AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
