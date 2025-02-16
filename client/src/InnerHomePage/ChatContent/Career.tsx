import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RSAF from "../../assets/icons/RSAF.svg";

export default function Career(): JSX.Element {
  const [showFirstBubble, setShowFirstBubble] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setShowFirstBubble(true);
    const secondBubbleTimer = setTimeout(() => setShowLoading(false), 1000);
    return () => clearTimeout(secondBubbleTimer);
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
              Share with me your{" "}
              <span className="text-yellow-300 font-semibold">career</span>{" "}
              journey so far!
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

      {/* Career Details */}
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
              className="chat-bubble bg-neutral my-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="card w-full text-xs md:text-lg bg-neutral text-left font-bold">
                {/* Animated Image */}
                <figure className="xs:w-36 sm:w-60 md:w-96 self-center">
                  <motion.img
                    src={RSAF}
                    alt="RSAF"
                    className="rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                </figure>

                <div className="flex flex-col">
                  <div className="card-body text-xs md:text-lg m-auto leading-relaxed px-0">
                    <h2 className="card-title text-sm md:text-xl lg:text-2xl text-amber-300">
                      Republic of Singapore Air Force (RSAF)
                    </h2>

                    {/* Roles Section */}
                    <p className="underline">Roles</p>
                    <ul className="list-decimal px-5">
                      {[
                        {
                          date: "May 23 - Present",
                          role: "Senior Software Engineer @ RSAF Agile innovation Digital (RAiD)",
                        },
                        {
                          date: "Oct 20 - Apr 23",
                          role: "OC (Acting for 6 Mths) & OIC @ Aircraft Weapons Operations Department",
                        },
                        {
                          date: "May 19 - Sep 20",
                          role: "Project Officer @ Aerodynamics Department",
                        },
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                          <a className="underline">{item.date}</a>
                          <br />
                          <span className="font-bold">{item.role}</span>
                          <br />
                          <br />
                        </motion.li>
                      ))}
                    </ul>

                    {/* Awards & Technical Projects Section */}
                    <p className="underline">Awards & Technical Projects</p>
                    <ul className="list-decimal px-5">
                      {[
                        "Exemplary Innovator Award in MINDEF IGNITE Awards 2022",
                        "Equipment Management App (VBA): Dashboard and Userform function for rapid computation of wartime decisions",
                        "Predictive Maintenance Machine Learning Model applied on Aircraft Data: Data extraction through web-parsing of HTML file, logistic regression and K-Nearest Neighbors for predictive failure forecasting",
                        "Reliability Management of Aircraft Systems using Power BI",
                        "Key Management Web-App: Accounting of Physical keys within department, utilized streamlit library and data visualizations within Python",
                        "Telegram Bot for Work Process Reporting: Rapid access to key data for decision making, developed in Python",
                      ].map((project, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                          {project}
                          <br />
                          <br />
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
