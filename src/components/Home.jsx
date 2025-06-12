import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden text-white bg-[#1a102c]">
      {/* 🟣 Soft Static Gradient Blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[500px] h-[500px] bg-purple-700 rounded-full opacity-30 blur-[180px] top-10 left-[-150px]"></div>
        <div className="absolute w-[400px] h-[400px] bg-fuchsia-600 rounded-full opacity-20 blur-[160px] bottom-10 right-[-120px]"></div>
        <div className="absolute w-[300px] h-[300px] bg-pink-500 rounded-full opacity-10 blur-[140px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Header */}
      <header className="w-full flex justify-between items-center px-10 py-4 bg-white/10 backdrop-blur-md border-b border-white/10 z-10">
        <h1 className="text-2xl font-extrabold text-purple-300">SentiCode AI</h1>
        <div className="space-x-4">
          <Link to="/signin">
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow">
              Sign Up
            </button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg"
        >
          Welcome to SentiCode AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-purple-200 max-w-2xl mb-8 text-lg leading-relaxed"
        >
          SentiCode AI is a lightweight AI-powered web app that analyzes your text
          and detects emotional sentiment instantly. Whether it's your personal journal,
          tweets, or product reviews — understand the emotions hidden in your words.
          Track your mood and communicate better with smart insights.
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Link to="/signin">
            <button className="px-8 py-3 bg-purple-700 hover:bg-purple-800 text-white text-lg font-medium rounded-lg shadow-xl transition duration-300">
              Get Started
            </button>
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="text-sm text-purple-300 py-4 z-10">© 2025 SentiCode AI. All rights reserved.</footer>
    </div>
  );
};

export default Home;
