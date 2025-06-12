// 📁 SignUp.jsx
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      setSuccess(true);
    } catch (error) {
      alert("⚠️ " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0b0f1a] overflow-hidden">
      {/* ✨ Fancy animated gradient background (angled lines) */}
      <div className="absolute w-full h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 via-purple-900 to-black opacity-80"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#4c1d95_1px,transparent_1px)] bg-[size:20px_20px] opacity-10 animate-pulse"></div>
      </div>

      {/* 🔙 Back to Home */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center text-indigo-300 hover:underline font-medium z-10"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Home
      </Link>

      {/* 🧊 Sign-Up Card */}
      <div className="z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl">
        {!success ? (
          <>
            <div className="text-center mb-6">
              <h1 className="text-4xl font-extrabold text-white mb-2">Create Account</h1>
              <p className="text-indigo-200">Join the SentiCode AI community</p>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

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

              <button
                onClick={handleSignUp}
                className="w-full py-3 bg-indigo-600 cursor-pointer text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </div>

            <div className="mt-6 text-center text-indigo-200 text-sm">
              Already have an account?{" "}
              <Link to="/signin" className="text-white font-semibold hover:underline">
                Sign In
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4 text-green-400">✅ Sign up successful!</h2>
            <p className="mb-6 text-indigo-100">Please sign in to continue to SentiCode.</p>
            <Link to="/signin">
              <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg">
                Go to Sign In
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
