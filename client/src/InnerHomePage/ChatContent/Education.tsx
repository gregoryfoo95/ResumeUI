import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImperialCollege from "../../assets/icons/ImperialCollege.svg";
import NTU from "../../assets/icons/NTU.svg";

interface EducationItem {
  institution: string;
  degree: string;
  grade: string;
  awards?: string[];
  thesis: string;
  imageSrc: string;
}

const educationHistory: EducationItem[] = [
  {
    institution: "Imperial College London",
    degree: "MSc Advanced Aeronautical Engineering",
    grade: "Distinction",
    awards: [
      "Airbus Prize for Best Individual MSc Project across 3 MSc Degrees",
      "Airbus Prize for Best Student in MSc Advanced Aeronautical Engineering",
    ],
    thesis:
      "Using Data Driven Algorithms to extract Reduced Order Models (ROMs) from Turbulent Channel Flow (Extended Dynamic Mode Decomposition - Discrete Linear-Quadratic state-feedback Regulator).",
    imageSrc: ImperialCollege,
  },
  {
    institution: "Nanyang Technological University",
    degree: "BEng Aerospace Engineering",
    grade: "First Class Honours",
    thesis:
      "CFD Simulation of Helicopter with Underslung Load (Presented in Singapore Aerospace Technology and Engineering Conference (SATEC) 2020).",
    imageSrc: NTU,
  },
];

export default function Education(): JSX.Element {
  const [showFirstBubble, setShowFirstBubble] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setShowFirstBubble(true);
    const timer = setTimeout(() => setShowLoading(false), 1000);
    return () => clearTimeout(timer);
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
            <div className="chat-header text-sm md:text-lg font-extrabold">
              You
            </div>
            <div className="chat-bubble text-sm md:text-lg bg-primary my-3 text-black font-bold">
              Could you tell me more about your{" "}
              <span className="text-yellow-300 font-semibold">education</span>?
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Animation */}
      <AnimatePresence>
        {showLoading && (
          <motion.div
            className="flex justify-start px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
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

      {/* Education List */}
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
            <div className="chat-header text-sm md:text-lg font-extrabold">
              Gregory
            </div>

            {educationHistory.map((edu, index) => (
              <motion.div
                key={index}
                className="chat-bubble text-sm md:text-lg bg-neutral my-4 p-4 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="card w-full bg-neutral text-left font-bold">
                  <figure className="w-36 sm:w-60 md:w-96 self-center bg-white">
                    <motion.img
                      src={edu.imageSrc}
                      alt={edu.institution}
                      className="rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                  </figure>
                  <div className="card-body text-white font-bold leading-relaxed px-0">
                    <h2 className="card-title text-amber-300 text-sm lg:text-2xl">
                      {edu.degree}
                    </h2>
                    <p className="underline">Institution: {edu.institution}</p>
                    <p className="underline">Grade: {edu.grade}</p>

                    {/* Awards Section */}
                    {edu.awards && (
                      <>
                        <p className="underline">Awards and Achievements:</p>
                        <ul className="list-decimal px-5">
                          {edu.awards.map((award, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                              {award}
                            </motion.li>
                          ))}
                        </ul>
                      </>
                    )}

                    {/* Thesis Section */}
                    <p className="underline">Thesis:</p>
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      {edu.thesis}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
