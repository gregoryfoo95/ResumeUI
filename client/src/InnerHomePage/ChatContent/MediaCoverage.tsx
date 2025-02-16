import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MediaItem {
  title: string;
  description: string;
  mediaType: "video" | "image";
  mediaSrc: string;
  mediaUrl?: string;
}

const mediaCoverage: MediaItem[] = [
  {
    title: "Exercise Wallaby 2024 - Youtube",
    description:
      "I had the privilege of being interviewed by the RSAF media team regarding my work in rapid software development within the RSAF. It was an insightful experience sharing my thoughts on the importance of agility in the defense industry.",
    mediaType: "video",
    mediaSrc: "https://www.youtube.com/embed/v-i3PYCUTPo",
  },
  {
    title: "Exercise Wallaby 2024 - LinkedIn",
    description:
      "I had the privilege of being interviewed by the RSAF media team regarding my work in rapid software development within the RSAF. It was an insightful experience sharing my thoughts on the importance of agility in the defense industry.",
    mediaType: "image",
    mediaSrc: "images/xwb.jpeg",
    mediaUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:7260626815856058368/",
  },
  {
    title: "CCIS Showcase on Straits Times",
    description: "Brief introduction to CCIS development in the RSAF.",
    mediaType: "image",
    mediaSrc: "images/ccis.jpeg",
    mediaUrl:
      "https://www.straitstimes.com/singapore/ai-data-analytics-improve-decision-making-process-but-human-touch-still-key-at-saf-exercise",
  },
];

export default function MediaCoverage(): JSX.Element {
  const [showContent, setShowContent] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setShowContent(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="flex flex-col gap-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* User Prompt */}
      <AnimatePresence>
        {showContent && (
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
              Have you been featured in any{" "}
              <span className="text-yellow-300 font-semibold">
                media coverage
              </span>
              ?
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Animation */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="flex justify-start px-6"
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

      {/* Media Coverage List */}
      <AnimatePresence>
        {!loading && showContent && (
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
              className="chat-bubble text-sm md:text-lg bg-neutral text-left my-3 p-4 rounded-lg shadow-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p>
                I have had the privilege of being featured in various media
                outlets, sharing my journey in software engineering, and defense
                technology innovations. Here are some highlights:
              </p>

              <motion.div className="mt-4 space-y-6">
                {mediaCoverage.map((media, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-100 rounded-lg p-4 shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <h3 className="text-lg font-bold text-indigo-600">
                      {media.title}
                    </h3>
                    <p className="text-sm text-gray-700 mt-2">
                      {media.description}
                    </p>

                    {/* Media Type Handling */}
                    {media.mediaType === "image" ? (
                      <a
                        href={media.mediaUrl || "#"}
                        target={media.mediaUrl ? "_blank" : ""}
                        rel="noopener noreferrer"
                        className="block mt-4"
                      >
                        <motion.img
                          src={media.mediaSrc}
                          alt={media.title}
                          className="w-full h-56 object-cover rounded-lg hover:opacity-80 transition-opacity duration-200"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.6 }}
                          onError={(e) =>
                            (e.currentTarget.style.display = "none")
                          }
                        />
                      </a>
                    ) : (
                      <motion.iframe
                        src={media.mediaSrc}
                        title={media.title}
                        className="w-full h-56 rounded-lg mt-4"
                        allowFullScreen
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                      />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
