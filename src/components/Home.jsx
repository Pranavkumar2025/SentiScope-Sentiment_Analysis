import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden text-white bg-gradient-to-br from-[#1a102c] via-[#1e1537] to-[#110824]">
      
      {/* 🌌 Glowing Animated Blobs */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-purple-700 rounded-full opacity-30 blur-[200px] top-10 left-[-100px]"
        />
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] bg-fuchsia-600 rounded-full opacity-20 blur-[180px] bottom-10 right-[-80px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-pink-500 rounded-full opacity-10 blur-[160px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* 🔮 Header */}
      <header className="w-full flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 lg:px-10 py-4 bg-white/10 backdrop-blur-md border-b border-white/10 z-10 shadow-sm gap-2 sm:gap-0">
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-400 animate-pulse drop-shadow">
          SentiCode AI
        </h1>
        <div className="flex flex-wrap gap-2 sm:gap-4 justify-center sm:justify-end">
          {[
            { path: "/signin", label: "Sign In", bg: "bg-purple-600" },
            { path: "/signup", label: "Sign Up", bg: "bg-emerald-500" },
            { path: "/about", label: "About Project", bg: "bg-blue-500" },
          ].map(({ path, label, bg }) => (
            <Link to={path} key={label}>
              <button
                className={`group relative px-4 py-2 ${bg} hover:brightness-110 text-white rounded-lg shadow transition duration-300 text-sm sm:text-base`}
              >
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
              </button>
            </Link>
          ))}
        </div>
      </header>

      {/* 🎉 Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 sm:px-8 lg:px-16 py-10 sm:py-16 z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-300 text-transparent bg-clip-text mb-6 drop-shadow-xl leading-tight"
        >
          Welcome to SentiCode AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-purple-200 max-w-2xl text-base sm:text-lg md:text-xl mb-8 leading-relaxed px-2"
        >
          SentiCode AI is a smart AI-powered platform that analyzes your emotions
          through your text — be it tweets, journal entries, or reviews. Understand
          your tone, improve communication, and reflect with better clarity.
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Link to="/signin">
            <button className="px-8 py-3 text-sm sm:text-base bg-gradient-to-r from-purple-700 to-indigo-600 hover:brightness-110 text-white font-medium rounded-xl shadow-xl transition duration-300">
              🚀 Get Started
            </button>
          </Link>
        </motion.div>
      </main>

      {/* ⚡ Footer */}
      <footer className="text-xs sm:text-sm text-purple-300 text-center py-4 z-10 tracking-wide px-4">
        © 2025 SentiCode AI · Crafted with ❤️ for emotion-aware interactions.
      </footer>
    </div>
  );
};

export default Home;
