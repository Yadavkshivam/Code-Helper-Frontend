import { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import { motion } from "framer-motion";
import "./App.css";

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);
  const [review, setReview] = useState(``);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    const response = await axios.post(`${import.meta.env.VITE_API}/ai/get-review`, {
      code,
    });
    setReview(response.data);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 flex items-center justify-center p-6">
      <main className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        {/* Code Editor Card */}
        <motion.div
          className="bg-gray-800 rounded-3xl p-6 shadow-2xl transform hover:rotate-y-3 hover:scale-105 transition-all duration-500 w-full lg:w-1/2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-blue-400 mb-4">💻 Code Editor</h2>
          <div className="border text-gray-200 border-gray-700 rounded-xl overflow-hidden shadow-inner">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={14}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 16,
                minHeight: "400px",
                backgroundColor: "#1e1e1e",
              }}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05, rotateZ: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={reviewCode}
            className="mt-5 w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all text-white"
          >
            🚀 Review Code
          </motion.button>
        </motion.div>

        {/* AI Review Card */}
        <motion.div
          className="bg-gray-800 rounded-3xl p-6 shadow-2xl transform hover:rotate-y-3 hover:scale-105 transition-all duration-500 w-full lg:w-1/2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-green-400 mb-4">🧐 AI Review</h2>
          <div className=" text-gray-300 prose prose-invert max-w-none overflow-auto min-h-[400px]">
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default App;
