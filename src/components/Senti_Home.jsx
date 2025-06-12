// ✅ Full updated and fixed SentiHome.jsx
import React, { useState, useEffect } from "react";
import { auth, signOut } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Mic, MicOff } from "lucide-react";
import Historypage from "./Historypage";

const COLORS = ["#6a0dad", "#0f9d58", "#d93025", "#ff9800", "#2196f3"];

export default function SentiHome() {
  const navigate = useNavigate();
  const [inputMode, setInputMode] = useState("text");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(null);
  const [sentiment, setSentiment] = useState("Neutral");
  const [confidence, setConfidence] = useState(0);
  const [emotion, setEmotion] = useState([]);
  const [summary, setSummary] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [history, setHistory] = useState([]);

  const GEMINI_API_KEY = "AIzaSyDpxbWMLGsfBwmsHpjGVK0ytk1l-2LaXVw";

  useEffect(() => {
    if (auth.currentUser) {
      setUserName(auth.currentUser.displayName || "User");
    }
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  const fetchTextFromURL = async (url) => {
    try {
      const res = await fetch(`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`);
      const html = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const allText = Array.from(doc.querySelectorAll("p"))
        .map((p) => p.textContent.trim())
        .filter(Boolean)
        .join(" ")
        .slice(0, 3000);

      return allText || "No extractable content.";
    } catch (err) {
      throw new Error("Unable to extract content from URL");
    }
  };

  const analyzeSentiment = async () => {
    setLoading(true);
    setResult(null);
    setSentiment("Neutral");
    setConfidence(0);
    setEmotion([]);
    setSummary("");

    let textToAnalyze = inputValue;

    if (inputMode === "url") {
      try {
        textToAnalyze = await fetchTextFromURL(inputValue);
      } catch (err) {
        alert("Failed to fetch or analyze the URL.");
        setLoading(false);
        return;
      }
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Analyze the sentiment of this text: "${textToAnalyze}". Respond in this format:\nSentiment: <Positive|Negative|Neutral>\nEmotion: <comma separated emotions>\nConfidence: <0 to 1>\nSummary: <short analysis>`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    setResult(reply);

    const sentimentMatch = reply.match(/sentiment\s*[:\-]?\s*(Positive|Negative|Neutral)/i);
    const confidenceMatch = reply.match(/confidence\s*[:\-]?\s*(0\.\d+|1(\.0)?)/i);
    const emotionMatch = reply.match(/emotion\s*[:\-]?\s*([^\n]+)/i);
    const summaryMatch = reply.match(/summary\s*[:\-]?\s*(.+)/i);

    const parsedSentiment = sentimentMatch?.[1] || "Neutral";
    const parsedConfidence = parseFloat(confidenceMatch?.[1]) || 0;
    const parsedSummary = summaryMatch?.[1] || "No summary available";

    setSentiment(parsedSentiment);
    setConfidence(parsedConfidence);
    setSummary(parsedSummary);

    const emotionList = emotionMatch?.[1]
      ?.split(",")
      ?.map((e) => ({ name: e.trim(), value: 1 })) || [];

    setEmotion(emotionList);

    // ✅ Push to history
    setHistory((prev) => [
      ...prev,
      {
        input: textToAnalyze,
        sentiment: parsedSentiment,
        confidence: parsedConfidence,
        summary: parsedSummary,
      },
    ]);

    setLoading(false);
  };

  // 🎤 Speech Recognition
  const handleMicClick = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onstart = () => setListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
    };
    recognition.onend = () => setListening(false);

    recognition.start();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f0036] via-[#2c003e] to-[#3a0056] text-white">
      <header className="flex items-center justify-between px-8 py-4 bg-[#2a0050] shadow-md">
        <h1 className="text-2xl font-extrabold tracking-wide text-indigo-100">SentiCode AI</h1>
        <button
          onClick={handleSignOut}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md"
        >
          Sign Out
        </button>
      </header>

      <main className="p-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-1">Welcome, {userName} 👋</h2>
          <p className="text-indigo-200">Enter some text or a URL to analyze its sentiment.</p>
        </div>

        <div className="flex justify-center mb-4 gap-4">
          <select
            className="bg-purple-900 text-white px-4 py-2 rounded-lg shadow-md"
            value={inputMode}
            onChange={(e) => setInputMode(e.target.value)}
          >
            <option value="text">Text</option>
            <option value="url">URL</option>
          </select>
          <button onClick={handleMicClick} className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg">
            {listening ? <MicOff /> : <Mic />}
          </button>
        </div>

        <textarea
          className="w-full h-36 p-4 border rounded-lg mb-4 bg-white/10 text-white placeholder-gray-300"
          placeholder={inputMode === "text" ? "Type your text..." : "Paste the URL here..."}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <div className="text-center">
          <button
            onClick={analyzeSentiment}
            disabled={loading || !inputValue.trim()}
            className={`mb-10 px-6 py-2 ${
              loading ? "bg-gray-600" : "bg-purple-600 hover:bg-purple-700"
            } text-white rounded shadow`}
          >
            {loading ? "Analyzing..." : "Analyze Sentiment"}
          </button>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-r from-[#31005a] to-[#450080] p-6 rounded-lg shadow-lg mb-10"
          >
            <h3 className="text-2xl font-bold mb-2">🎯 Analysis Result</h3>
            <p className="text-lg"><strong>Sentiment:</strong> <span className="text-yellow-300">{sentiment}</span></p>
            <p className="text-lg"><strong>Confidence:</strong> <span className="text-green-400">{confidence}</span></p>
            <p className="text-lg"><strong>Summary:</strong> <span className="italic">{summary}</span></p>
            <p className="text-lg"><strong>Emotions:</strong> <span className="text-pink-400">{emotion.map(e => e.name).join(", ") || "None"}</span></p>
          </motion.div>
        )}

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="h-64">
            <h3 className="text-white text-lg mb-2">📊 Sentiment Overview</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{ name: sentiment, value: 1 }]}>
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="value" fill="#6a0dad" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="h-64">
            <h3 className="text-white text-lg mb-2">🧠 Emotion Breakdown</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={emotion}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {emotion.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="h-64">
            <h3 className="text-white text-lg mb-2">📶 Confidence Level</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{ name: "Confidence", value: parseFloat(confidence) }]}>
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis domain={[0, 1]} stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="value" fill="#0f9d58" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 🕘 History Section */}
        <Historypage history={history} />
      </main>
    </div>
  );
}
