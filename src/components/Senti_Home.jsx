import React, { useState, useEffect } from "react";
import { auth, signOut } from "../firebaseConfig.js";
import { useNavigate } from "react-router-dom";
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
import { motion } from "framer-motion";
import Historypage from "./Historypage"; // 🟢 Import Historypage

const COLORS = ["#6a0dad", "#0f9d58", "#d93025", "#ff9800", "#2196f3"];

const SentiHome = () => {
  const [inputMode, setInputMode] = useState("text");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [sentiment, setSentiment] = useState("Neutral");
  const [confidence, setConfidence] = useState(0);
  const [emotion, setEmotion] = useState([]);
  const [summary, setSummary] = useState("");
  const [sentimentScores, setSentimentScores] = useState([
    { name: "Positive", value: 0 },
    { name: "Neutral", value: 0 },
    { name: "Negative", value: 0 },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [history, setHistory] = useState([]); // 🟢 Add history state

  const navigate = useNavigate();

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  useEffect(() => {
    if (auth.currentUser) {
      setUserName(auth.currentUser.displayName || "User");
    }
  }, []);

  useEffect(() => {
    if (!recognition) return;

    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue((prev) => prev + " " + transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert("Speech recognition error or not supported.");
    };

    recognition.onend = () => setIsListening(false);
  }, [recognition]);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  const GEMINI_API_KEY = "AIzaSyDpxbWMLGsfBwmsHpjGVK0ytk1l-2LaXVw";

  const fetchTextFromURL = async (url) => {
    try {
      const res = await fetch(
        `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
      );
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
    setSentimentScores([
      { name: "Positive", value: 0 },
      { name: "Neutral", value: 0 },
      { name: "Negative", value: 0 },
    ]);

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
                  text: `Analyze the sentiment of this text: "${textToAnalyze}". Respond strictly in this JSON format:
{
  "sentiment_scores": { "Positive": <float>, "Negative": <float>, "Neutral": <float> },
  "top_sentiment": "<Positive|Negative|Neutral>",
  "confidence": <0.0 to 1.0>,
  "emotions": ["happy", "sad", ...],
  "summary": "<short analysis>"
}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    let parsed = {};
    try {
      parsed = JSON.parse(reply);
    } catch (err) {
      alert("Unexpected response format from Gemini.");
      setLoading(false);
      return;
    }

    const {
      sentiment_scores = {},
      top_sentiment = "Neutral",
      confidence = 0,
      emotions = [],
      summary = "No summary available",
    } = parsed;

    setSentiment(top_sentiment);
    setConfidence(confidence);
    setSummary(summary);
    setEmotion(emotions.map((e) => ({ name: e, value: 1 })));
    setSentimentScores([
      { name: "Positive", value: sentiment_scores.Positive || 0 },
      { name: "Neutral", value: sentiment_scores.Neutral || 0 },
      { name: "Negative", value: sentiment_scores.Negative || 0 },
    ]);
    setResult(JSON.stringify(parsed, null, 2));

    // 🟢 Push result to history
    setHistory((prev) => [
      ...prev,
      {
        input: textToAnalyze,
        sentiment: top_sentiment,
        confidence: parseFloat(confidence),
        summary: summary,
      },
    ]);

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f0036] via-[#2c003e] to-[#3a0056] text-white">
      {/* Header */}
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
          <p className="text-indigo-200">
            Select an option and enter text or a URL to analyze its sentiment.
          </p>
        </div>

        <div className="flex justify-center mb-4">
          <select
            className="bg-purple-900 text-white px-4 py-2 rounded-lg shadow-md"
            value={inputMode}
            onChange={(e) => setInputMode(e.target.value)}
          >
            <option value="text">Text Analysis</option>
            <option value="url">URL Analysis</option>
          </select>
        </div>

        <textarea
          className="w-full h-36 p-4 border rounded-lg mb-2 bg-white/10 text-white placeholder-gray-300 focus:outline-none"
          placeholder={
            inputMode === "text"
              ? "Type or paste your text here..."
              : "Paste the full URL of a news article or blog..."
          }
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => {
              if (!recognition) {
                alert("Speech recognition is not supported in this browser.");
                return;
              }
              setIsListening(true);
              recognition.start();
            }}
            className={`flex items-center px-4 py-2 rounded-full shadow-md transition ${
              isListening ? "bg-red-600" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            🎙️ {isListening ? "Listening..." : "Speak"}
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={analyzeSentiment}
            disabled={loading || !inputValue.trim()}
            className={`mb-10 px-6 py-2 ${
              loading ? "bg-gray-600" : "bg-purple-600 hover:bg-purple-700"
            } text-white rounded shadow transition duration-300`}
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
            <h3 className="text-2xl font-bold text-white mb-2">🎯 Analysis Result</h3>
            <p className="text-white text-lg mt-2">
              <span className="font-semibold text-purple-300">Sentiment:</span>{" "}
              <span className="font-bold text-yellow-300">{sentiment}</span>
            </p>
            <p className="text-white text-lg mt-1">
              <span className="font-semibold text-purple-300">Confidence:</span>{" "}
              <span className="text-green-400">{confidence}</span>
            </p>
            <p className="text-white text-lg mt-1">
              <span className="font-semibold text-purple-300">Summary:</span>{" "}
              <span className="italic">{summary}</span>
            </p>
            <p className="text-white text-lg mt-1">
              <span className="font-semibold text-purple-300">Emotions:</span>{" "}
              <span className="text-pink-400">
                {emotion.map((e) => e.name).join(", ") || "None"}
              </span>
            </p>
          </motion.div>
        )}

        {/* Charts */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="h-64">
            <h3 className="text-white text-lg mb-2">📊 Sentiment Overview</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sentimentScores}>
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis domain={[0, 1]} stroke="#ccc" />
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
        <div className="mt-12">
          <Historypage history={history} />
        </div>
      </main>
    </div>
  );
};

export default SentiHome;
