import CodeSnippetPage from "./CodeSnippetComponent/CodeSnippetPage";
import CommandPromptField from "./CodeSnippetComponent/CommandPromptField";
import codeSnippet from "../@classes/codeSnippet";
import { codeBlockProps } from "../@types/codeBlock";
import { useState } from "react";
import { motion } from "framer-motion";

export default function HomePage(): JSX.Element {
  const [codeBlock, setCodeBlock] = useState<codeBlockProps[]>([
    new codeSnippet("chmod +x run_greg_resume.sh && ./run_greg_resume.sh", "$ ", "", true),
    new codeSnippet("Executing run_greg_resume.sh...", "> ", "text-warning", false),
    new codeSnippet("Loading dependencies...", "> ", "text-warning", false),
    new codeSnippet("Process completed successfully.", "> ", "text-success", false),
    new codeSnippet("View Resume? (y/n)", "> ", "", false),
  ]);

  return (
    <div className="relative flex flex-col gap-4 overflow-hidden h-screen bg-black">
      
      {/* 🔥 Glitch Background Animation */}
      <motion.div 
        className="absolute inset-0 bg-black opacity-60"
        initial={{ opacity: 0.5, scale: 1 }}
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.02, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />

      {/* 💻 Matrix-style falling code effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 10 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute font-mono text-sm md:text-md opacity-50"
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{ repeat: Infinity, duration: Math.random() * 12 + 8, ease: "linear" }}
            style={{ 
              color: "#00ff41",
              left: `${Math.random() * 100}%`, 
              whiteSpace: "nowrap",
              writingMode: "vertical-rl"
            }}
          >
            {Array(20).fill("010101111101001").join("")}
          </motion.div>
        ))}
      </div>

      {/* 🖥️ Code Snippet Terminal UI */}
      <motion.div
        className="relative mockup-code h-auto w-full text-left text-sm md:text-base bg-black text-green-400 shadow-lg border border-green-500 p-4 rounded-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <CodeSnippetPage codeBlock={codeBlock} setCodeBlock={setCodeBlock} />
        <div className="px-4 py-4">
          <CommandPromptField codeBlock={codeBlock} setCodeBlock={setCodeBlock} />
        </div>
      </motion.div>

    </div>
  );
}
