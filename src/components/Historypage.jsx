// HistoryPage.jsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

const HistoryPage = ({ history }) => {
  const sentimentCount = history.reduce(
    (acc, item) => {
      acc[item.sentiment] += 1;
      return acc;
    },
    { Positive: 0, Neutral: 0, Negative: 0 }
  );

  const sentimentData = [
    { name: "Positive", value: sentimentCount.Positive },
    { name: "Neutral", value: sentimentCount.Neutral },
    { name: "Negative", value: sentimentCount.Negative },
  ];

  return (
    <div className="mt-16 text-white">
      <h2 className="text-3xl font-bold text-center mb-6">📚 History Analysis</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-72">
          <h3 className="text-lg mb-2">Pie Chart: Sentiment Distribution</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={sentimentData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="h-72">
          <h3 className="text-lg mb-2">Bar Chart: Sentiment History</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sentimentData}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis allowDecimals={false} stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">📝 Recent History Logs</h3>
        <ul className="bg-white/10 rounded-lg p-4 max-h-64 overflow-y-auto space-y-2">
          {history.length === 0 ? (
            <li className="text-gray-300 italic">No history available</li>
          ) : (
            history.map((entry, index) => (
              <li key={index} className="border-b border-gray-500 pb-2">
                <span className="font-semibold text-purple-300">Input:</span> {entry.input}<br />
                <span className="font-semibold text-green-400">Sentiment:</span> {entry.sentiment}, 
                <span className="font-semibold text-yellow-300">Confidence:</span> {entry.confidence.toFixed(2)}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default HistoryPage;
