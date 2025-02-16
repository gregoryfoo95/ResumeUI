import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  name: string;
  description: string;
  bgColor: string;
}

const projects: Project[] = [
  {
    name: "ASTRO",
    description: "Currency Tracking for Aircrew",
    bgColor: "bg-cyan-200",
  },
  {
    name: "SAGE",
    description: "ChatGPT Web App for Training Assistance",
    bgColor: "bg-secondary",
  },
  {
    name: "SAFEGUARD",
    description: "PoC Functional Prototype CCIS",
    bgColor: "bg-cyan-200",
  },
  {
    name: "Command & Control Information System (CCIS)",
    description: "System for Command and Control Operations",
    bgColor: "bg-secondary",
  },
  {
    name: "Sentinel",
    description: "Threat Reporting for Multi-Domain Operations",
    bgColor: "bg-cyan-200",
  },
];

const linkedinURL = "https://www.linkedin.com/in/gregoryfoo/";

export default function GitHubRepo(): JSX.Element {
  const [showFirstBubble, setShowFirstBubble] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(
    window.innerWidth >= 768,
  );

  useEffect(() => {
    setShowFirstBubble(true);
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1000);

    // Detect screen resize
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      className="flex flex-col gap-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* First Bubble - User Prompt */}
      <AnimatePresence>
        {showFirstBubble && (
          <motion.div
            className="chat chat-end text-left"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <div className="chat-header text-sm md:text-xl font-extrabold">
              You
            </div>
            <div className="chat-bubble text-sm md:text-lg bg-primary my-3 text-black font-bold">
              Any{" "}
              <span className="text-yellow-300 font-semibold">
                technical projects
              </span>{" "}
              that you've done?
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Animation */}
      <AnimatePresence>
        {showLoading && (
          <motion.div
            className="flex px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="loading loading-dots loading-lg self-start"
              animate={{ y: [0, -5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.5,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project List */}
      <AnimatePresence>
        {!showLoading && showFirstBubble && (
          <motion.div
            className="chat chat-start"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.2 },
              },
              exit: { opacity: 0, y: 20 },
            }}
          >
            <div className="chat-header text-sm md:text-xl font-extrabold">
              Gregory
            </div>

            <motion.div
              className="chat-bubble text-sm md:text-lg bg-neutral my-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div className="join join-vertical">
                {projects.map((project, index) => (
                  <motion.button
                    key={project.name}
                    className={`btn join-item ${project.bgColor} text-xs md:text-sm text-black border-none hover:bg-yellow-300`}
                    onClick={() => window.open(linkedinURL, "_blank")}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="font-extrabold">{project.name}</span>
                    {isLargeScreen && (
                      <span className="ml-2">- {project.description}</span>
                    )}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
