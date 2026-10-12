import { useState, useEffect } from "react";
import { motion, AnimatePresence, animate, useReducedMotion } from "framer-motion";
import { profile, stats } from "../../data/profile";
import type { Stat } from "../../data/profile";
import TypedText from "../../components/TypedText";

function CountUp({ stat, reduce }: { stat: Stat; reduce: boolean }): JSX.Element {
  const [n, setN] = useState(reduce ? stat.value : 0);
  useEffect(() => {
    if (reduce) {
      setN(stat.value);
      return;
    }
    const controls = animate(0, stat.value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [stat.value, reduce]);
  return (
    <div className="min-w-0 rounded-lg bg-base-300/60 p-3 text-center">
      <div className="text-2xl font-extrabold text-primary tabular-nums sm:text-3xl">
        {n}
        {stat.suffix}
      </div>
      <div className="mt-1 text-xs leading-tight opacity-80 break-words">{stat.label}</div>
    </div>
  );
}

export default function AboutMeText(): JSX.Element {
  const reduce = useReducedMotion() ?? false;
  const [isFirstBubbleVisible, setFirstBubbleVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    setFirstBubbleVisible(true);
    const loadingTimer = setTimeout(() => setLoading(false), reduce ? 0 : 1000);
    return () => clearTimeout(loadingTimer);
  }, [reduce]);

  const rise = reduce ? { opacity: 0 } : { opacity: 0, y: 20 };

  return (
    <motion.div
      className="flex min-w-0 flex-col gap-y-4"
      initial={rise}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.6, ease: "easeOut" }}
    >
      <AnimatePresence>
        {isFirstBubbleVisible && (
          <motion.div
            className="chat chat-end text-left"
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.5 }}
          >
            <div className="chat-header text-sm font-extrabold md:text-xl">You</div>
            <div className="chat-bubble my-3 bg-primary text-sm font-bold text-black md:text-xl">
              Tell me <span className="font-semibold text-yellow-300">about yourself</span>, Greg...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLoading && (
          <motion.div className="flex px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0 }}>
            <span className="loading loading-dots loading-lg self-start" role="status" aria-label="Typing" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && isFirstBubbleVisible && (
          <motion.div
            className="chat chat-start min-w-0"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: reduce ? 0 : 0.25 } },
              exit: { opacity: 0 },
            }}
          >
            <div className="chat-header text-sm font-extrabold md:text-xl">{profile.name}</div>

            {profile.summary.map((para, i) =>
              i <= doneCount ? (
                <motion.div
                  key={para.slice(0, 24)}
                  className="chat-bubble my-3 max-w-full bg-neutral text-left text-sm leading-relaxed md:text-lg"
                  variants={{
                    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.5 } },
                  }}
                >
                  <TypedText text={para} onDone={() => setDoneCount((c) => Math.max(c, i + 1))} />
                </motion.div>
              ) : null,
            )}

            {doneCount >= profile.summary.length && (
            <motion.div
              className="chat-bubble my-3 max-w-full bg-neutral text-left"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.5 }}
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="badge badge-primary h-auto whitespace-normal py-1 text-left font-semibold">
                  Currently: {profile.currentRole}
                </span>
                {profile.languages.map((l) => (
                  <span key={l.name} className="badge badge-outline h-auto whitespace-normal py-1" title={l.level}>
                    {l.name}
                  </span>
                ))}
              </div>
              <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Career highlights">
                {stats.map((s) => (
                  <div key={s.label} className="min-w-0">
                    <CountUp stat={s} reduce={reduce} />
                  </div>
                ))}
              </dl>
            </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
