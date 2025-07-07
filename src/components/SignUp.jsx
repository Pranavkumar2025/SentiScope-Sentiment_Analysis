import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!email || !password || !name) {
      alert("Please fill in all fields.");
      return;
    }

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSignUp();
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0b0f1a] overflow-hidden px-4">
      {/* Background */}
      <div className="absolute w-full h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 via-purple-900 to-black opacity-80"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#4c1d95_1px,transparent_1px)] bg-[size:20px_20px] opacity-10 animate-pulse"></div>
      </div>

      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center text-indigo-300 hover:underline font-medium z-10"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Home
      </Link>

      {/* Card */}
      <div className="z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl">
        {!success ? (
          <>
            <div className="text-center mb-6">
              <h1 className="text-3xl font-extrabold text-white mb-2">Create Account</h1>
              <p className="text-indigo-200">Join the SentiCode AI community</p>
            </div>

            <div className="space-y-4" onKeyDown={handleKeyDown}>
              {/* Name */}
              <div>
                <label className="block text-sm text-white mb-1" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-white mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              {/* Password with toggle */}
              <div>
                <label className="block text-sm text-white mb-1" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 pr-12 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-white/60 hover:text-white"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Sign Up Button */}
              <button
                onClick={handleSignUp}
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </div>

            {/* Already have account */}
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
