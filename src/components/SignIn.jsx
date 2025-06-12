import React, { useState } from "react";
import { auth } from "../firebaseConfig";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/senti");
    } catch (error) {
      alert("⚠️ " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#130c1c]">
      {/* 🎨 Soft Static Gradient Blobs (No Animation) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute w-[500px] h-[500px] bg-purple-700 rounded-full opacity-30 blur-[180px] top-10 left-[-150px]"></div>
        <div className="absolute w-[400px] h-[400px] bg-fuchsia-600 rounded-full opacity-20 blur-[160px] bottom-10 right-[-120px]"></div>
        <div className="absolute w-[300px] h-[300px] bg-pink-500 rounded-full opacity-10 blur-[140px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* 🔙 Back to Home Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center text-indigo-300 hover:underline font-medium z-10"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Home
      </Link>

      {/* 🧊 Sign-In Card */}
      <div className="z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-white mb-2">Welcome Back</h1>
          <p className="text-indigo-200">Sign in to your SentiCode AI account</p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-end text-sm text-indigo-200 hover:underline cursor-pointer">
            <span onClick={() => alert("Reset password feature coming soon!")}>Forgot Password?</span>
          </div>

          <button
            onClick={handleSignIn}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>

        <div className="mt-6 text-center text-indigo-200 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-white font-semibold hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
