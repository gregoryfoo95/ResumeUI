import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Stack from "../../assets/icons/Stack.svg";

export default function TechStack(): JSX.Element {
  const [showFirstBubble, setShowFirstBubble] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setShowFirstBubble(true);
    const secondBubbleTimer = setTimeout(() => {
      setShowLoading(false);
    }, 1000);

    return () => clearTimeout(secondBubbleTimer);
  }, []);

  // Tech stack categories
  const techCategories = [
    {
      title: "Programming Languages",
      color: "badge-secondary",
      items: [
        "JavaScript",
        "TypeScript",
        "Python",
        "Java",
        "C++",
        "MATLAB",
        "VBA",
      ],
    },
    {
      title: "Frontend & Backend Development",
      color: "badge-warning",
      items: ["HTML", "CSS", "React", "Spring Boot", "Node.js", "Express.js"],
    },
    {
      title: "Databases",
      color: "badge-info",
      items: ["MongoDB", "PostgreSQL", "SQL Server"],
    },
    {
      title: "AI & Machine Learning",
      color: "badge-primary",
      items: ["Machine Learning", "LLMs", "Robotics"],
    },
    {
      title: "Tools & Miscellaneous",
      color: "badge-white",
      items: ["Git", "LuciadLightSpeed", "Docker"],
    },
  ];

  return (
    <motion.div
      className="flex flex-col gap-y-4"
      initial={{ opacity: 0, y: 30 }} // Starts off hidden and moves up
      animate={{ opacity: 1, y: 0 }} // Smooth fade-in and bounce effect
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* User Prompt */}
      {showFirstBubble && (
        <motion.div
          className="chat chat-end text-left"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0 }}
        >
          <div className="chat-header text-sm md:text-xl font-extrabold">
            You
          </div>
          <div className="chat-bubble text-sm md:text-lg bg-primary my-3 text-black font-bold">
            Show off your{" "}
            <span className="text-yellow-300 font-semibold">tech stack</span>!
          </div>
        </motion.div>
      )}

      {/* Loading Animation */}
      {showLoading && (
        <motion.div
          className="flex px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0 }}
        >
          <div className="loading loading-dots loading-lg self-start"></div>
        </motion.div>
      )}

      {/* Tech Stack Display */}
      {!showLoading && showFirstBubble && (
        <motion.div
          className="chat chat-start"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="chat-header text-sm md:text-xl font-extrabold">
            Gregory
          </div>
          <div className="chat-bubble bg-neutral my-3">
            <motion.div
              className="card w-full md:w-96 bg-neutral text-left leading-relaxed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <figure className="place-self-start mx-8">
                <motion.img
                  className="w-20 h-20 lg:w-35 lg:h-35"
                  src={Stack}
                  alt="Tech Stack"
                  initial={{ rotate: -15, scale: 0.5 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </figure>
              <div className="card-body px-3 px-0">
                <h2 className="card-title text-amber-300 text-md md:text-xl">
                  Tech Stacks
                </h2>
                <ul className="list">
                  {techCategories.map((category, catIndex) => (
                    <motion.div
                      key={category.title}
                      className="flex flex-wrap gap-2 my-2"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: catIndex * 0.2 }}
                    >
                      {category.items.map((tech) => (
                        <motion.li
                          key={tech}
                          className={`badge ${category.color} badge-outline text-xs md:text-sm lg:text-base`}
                          whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.4 },
                          }}
                        >
                          {tech}
                        </motion.li>
                      ))}
                    </motion.div>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
