import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BarChart4, Bot, Code, Mic, FileText, ArrowLeftCircle } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const AboutProject = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: <Bot className="text-violet-600" size={32} />,
      title: 'Machine Learning ',
      items: [
        'Uses Google Gemini 2.0 Flash LLM for sentiment, emotion, confidence & summaries',
        'Structured prompt engineering with reliable NLP output formatting',
        'Handles voice and text inputs with robust parsing',
        'Emotion detection with chart-based breakdown',
        'Confidence scores (0–1) from LLM predictions',
        'URL scraping + content preprocessing using DOM parsing',
      ],
    },
    {
      icon: <Code className="text-teal-500" size={32} />,
      title: 'Frontend Development',
      items: [
        'Built in React.js with Tailwind CSS and Framer Motion',
        'Dynamic charts (Recharts) for sentiment/emotion/score visualization',
        'Responsive layout supporting desktop & mobile views',
        'Mic button with Web Speech API integration',
        'User-friendly dropdown for input type toggle (Text/URL)',
        'Firebase Auth for user login/logout',
      ],
    },
    {
      icon: <BarChart4 className="text-amber-500" size={32} />,
      title: 'Visualization & UI Highlights',
      items: [
        'Animated chart cards for sentiment and confidence levels',
        'Pie chart for emotion breakdown per sentence or text',
        'Scroll-based query history stored live per session',
        'Hover effects and animated input transitions',
      ],
    },
    {
      icon: <Mic className="text-red-500" size={32} />,
      title: 'Voice Input Integration',
      items: [
        'Uses browser-native Web Speech API',
        'Converts speech to text instantly before analysis',
        'Speech input is passed to Gemini with same structured prompt',
      ],
    },
    {
      icon: <FileText className="text-sky-500" size={32} />,
      title: 'Gemini Prompt Format',
      items: [
        `Prompt: "Give output in format: Sentiment:, Emotion:, Confidence:, Summary:"`,
        'Regex parsing ensures consistent JSON-like return parsing',
        'Handles model failure or 503 errors with fallback UX',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white py-12 px-6 md:px-20">
      
      {/* Back Button */}
      <div className="mb-10">
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-sky-400 hover:text-white border border-sky-500 px-4 py-2 rounded-full transition duration-300"
        >
          <ArrowLeftCircle size={20} />
          Back to Home
        </motion.button>
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center mb-12 text-sky-400"
      >
        📊 About <span className="text-white">SentiCode AI</span>
      </motion.h1>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {sections.map((section, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="bg-slate-900 rounded-2xl shadow-xl border border-slate-700 p-6 hover:shadow-2xl hover:border-sky-600 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              {section.icon}
              <h2 className="text-xl font-semibold text-sky-300">{section.title}</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              {section.items.map((item, idx) => (
                <li key={idx} className="hover:text-white transition duration-200">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Footer Paragraph */}
      <div className="mt-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-slate-400 text-lg max-w-3xl mx-auto"
        >
          SentiCode AI is a blend of cutting-edge language modeling and modern web engineering.
          Whether you're analyzing feedback, articles, or spoken thoughts — this app intelligently deciphers the emotion and sentiment behind every word.
        </motion.p>
      </div>
    </div>
  );
};

export default AboutProject;
