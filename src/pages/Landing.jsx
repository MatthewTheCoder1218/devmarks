import { Link } from 'react-router-dom'
import {
  Code2,
  Bookmark,
  User,
  Terminal,
  Palette,
  MessageCircle,
  LayoutDashboard
} from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-white relative overflow-hidden">
      {/* Animated Lucide Icons – show only a few on mobile */}
      <Code2 className="absolute top-20 left-6 w-6 h-6 md:w-10 md:h-10 text-indigo-400 animate-float" />
      <Bookmark className="absolute bottom-20 right-6 w-6 h-6 text-pink-400 animate-rotate" />
      <User className="hidden sm:block absolute top-[45%] left-[10%] sm:w-8 sm:h-8 w-8 h-8 md:w-10 md:h-10 text-green-400 animate-pulse-slow" />
      <Terminal className="hidden sm:block absolute top-35 right-10 w-8 h-8 md:w-10 md:h-10 text-yellow-400 animate-bounce-slow" />
      <Palette className="hidden sm:block absolute bottom-10 left-10 sm:w-8 sm:h-8 w-8 h-8 md:w-10 md:h-10 text-red-400 animate-float" />
      <MessageCircle className="hidden md:block absolute top-[65%] right-[25%] sm:w-8 sm:h-8 w-8 h-8 md:w-10 md:h-10 text-cyan-400 animate-pulse-slow" />
      <LayoutDashboard className="hidden md:block absolute bottom-[20%] left-[30%] w-8 h-8 md:w-10 md:h-10 text-purple-400 animate-rotate" />

      {/* Header */}
      <header className="w-full px-4 sm:px-6 py-6 max-w-6xl mx-auto flex flex-row sm:flex-row z-30 items-center justify-between">
        <h1 className="text-2xl font-bold text-white">DevMarks</h1>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <Link
            to="/login"
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white transition text-sm sm:text-base"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="border border-indigo-600 px-4 py-2 rounded text-indigo-400 hover:bg-indigo-800 transition text-sm sm:text-base"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="text-center px-4 mt-16 sm:mt-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6">
          Bookmark smarter. Build faster.
        </h2>
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-10">
          Save your favorite dev docs, tools, threads, and tutorials. Organize them by tags.
          Access them anytime. DevMarks is your personal developer resource hub.
        </p>
        <Link
          to="/signup"
          className="bg-indigo-600 hover:bg-indigo-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium transition"
        >
          Get Started
        </Link>
      </main>

      {/* Features Section */}
      <section className="mt-24 max-w-6xl mx-auto px-4 sm:px-6">
        <h3 className="text-2xl font-semibold mb-10 text-center">🔥 Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[#1f1f1f] p-6 rounded-lg border border-gray-800 shadow-lg">
            <h4 className="text-xl font-semibold mb-2">🔖 Save anything</h4>
            <p className="text-gray-400 text-sm">
              Docs, blogs, tools, code snippets. Add bookmarks with previews and tags.
            </p>
          </div>
          <div className="bg-[#1f1f1f] p-6 rounded-lg border border-gray-800 shadow-lg">
            <h4 className="text-xl font-semibold mb-2">🧠 Organize easily</h4>
            <p className="text-gray-400 text-sm">
              Use tags to group related bookmarks. Keep your dev brain clear.
            </p>
          </div>
          <div className="bg-[#1f1f1f] z-10 p-6 rounded-lg border border-gray-800 shadow-lg">
            <h4 className="text-xl font-semibold mb-2">🚀 Access anytime</h4>
            <p className="text-gray-400 text-sm">
              Everything syncs to the cloud with Supabase. Fast and secure.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 mt-24 py-10 border-t border-gray-800 text-sm sm:text-base px-4">
        Made with 💻 by Little Prince – © {new Date().getFullYear()} DevMarks
      </footer>
    </div>
  )
}
