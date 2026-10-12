import { useEffect, useId, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ImperialCollege from "../../assets/icons/ImperialCollege.svg";
import NTU from "../../assets/icons/NTU.svg";
import { education, certifications, honors } from "../../data/profile";
import type { Education as EducationItem } from "../../data/profile";

const LOGOS: Record<string, string> = {
  imperial: ImperialCollege,
  ntu: NTU,
};

function Thesis({ text, reduce }: { text: string; reduce: boolean }): JSX.Element {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="mt-3">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-md px-1 py-1 text-xs font-bold text-secondary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 md:text-base"
      >
        <motion.span
          aria-hidden="true"
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
        >
          &#9656;
        </motion.span>
        Thesis
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            key="thesis"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-2 break-words border-l-2 border-primary pl-3 text-xs font-medium italic leading-relaxed md:text-base">
              {text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EduCard({
  edu,
  index,
  reduce,
}: {
  edu: EducationItem;
  index: number;
  reduce: boolean;
}): JSX.Element {
  const logo = edu.logo ? LOGOS[edu.logo] : undefined;
  return (
    <motion.li
      className="relative min-w-0"
      initial={reduce ? false : { opacity: 0, y: 24, rotateX: -8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      whileHover={reduce ? undefined : { y: -3 }}
      transition={{ duration: 0.5, delay: reduce ? 0 : Math.min(index, 3) * 0.08 }}
    >
      {/* Layered backing cards */}
      <span
        aria-hidden="true"
        className="absolute inset-x-3 -bottom-1.5 top-2 rounded-xl bg-primary/20"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-1.5 -bottom-0.5 top-1 rounded-xl bg-secondary/20"
      />
      <article className="relative min-w-0 rounded-xl border border-base-content/10 bg-base-200 p-3 shadow-md xs:p-4">
        <div className="flex items-start gap-3">
          {logo && (
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white p-1 xs:h-16 xs:w-16">
              <img
                src={logo}
                alt={`${edu.institution} logo`}
                className="h-full w-full object-contain"
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="break-words text-sm font-extrabold leading-snug text-amber-300 md:text-xl">
              {edu.degree}
            </h3>
            <p className="mt-0.5 break-words text-xs font-semibold md:text-base">
              {edu.institution}
            </p>
            <p className="mt-0.5 text-xs text-secondary">
              <time>{edu.years}</time>
            </p>
          </div>
        </div>

        {edu.grade && (
          <p className="mt-3 flex flex-wrap items-center gap-2 text-xs md:text-base">
            <span className="sr-only">Grade:</span>
            <span className="badge h-auto max-w-full whitespace-normal break-words border-primary bg-primary py-1 text-left font-bold text-black">
              <span aria-hidden="true" className="mr-1">
                &#9733;
              </span>
              {edu.grade}
            </span>
          </p>
        )}

        {edu.awards && edu.awards.length > 0 && (
          <div className="mt-3">
            <h4 className="text-xs font-bold uppercase tracking-wide text-secondary">
              Awards
            </h4>
            <ul className="mt-1 space-y-2">
              {edu.awards.map((a) => (
                <li
                  key={a}
                  className="relative overflow-hidden break-words rounded-md border border-amber-300/50 bg-amber-300/10 px-3 py-2 text-xs font-semibold md:text-base"
                >
                  {!reduce && (
                    <motion.span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent"
                      initial={{ left: "-40%" }}
                      animate={{ left: "140%" }}
                      transition={{
                        repeat: Infinity,
                        repeatDelay: 3,
                        duration: 1.6,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                  <span aria-hidden="true" className="mr-1 text-amber-300">
                    &#10022;
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        )}

        {edu.thesis && <Thesis text={edu.thesis} reduce={reduce} />}
      </article>
    </motion.li>
  );
}

function ChipList({
  label,
  items,
  reduce,
}: {
  label: string;
  items: string[];
  reduce: boolean;
}): JSX.Element {
  const headingId = useId();
  return (
    <section aria-labelledby={headingId} className="min-w-0">
      <h3
        id={headingId}
        className="mb-2 text-sm font-extrabold text-amber-300 md:text-xl"
      >
        {label}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <motion.li
            key={item}
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: reduce ? 0 : Math.min(i, 8) * 0.04, duration: 0.3 }}
            className="badge badge-outline h-auto max-w-full whitespace-normal break-words border-secondary py-1 text-left text-xs text-secondary md:text-sm"
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

export default function Education(): JSX.Element {
  const reduce = useReducedMotion() ?? false;
  const [showFirstBubble, setShowFirstBubble] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setShowFirstBubble(true);
    const timer = setTimeout(() => setShowLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="flex min-w-0 flex-col gap-y-4"
      initial={{ opacity: 0, y: reduce ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.6, ease: "easeOut" }}
    >
      <AnimatePresence>
        {showFirstBubble && (
          <motion.div
            className="chat chat-end text-left"
            initial={{ opacity: 0, x: reduce ? 0 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduce ? 0 : 30 }}
            transition={{ duration: reduce ? 0 : 0.5 }}
          >
            <div className="chat-header text-sm md:text-lg font-extrabold">You</div>
            <div className="chat-bubble text-sm md:text-lg bg-primary my-3 text-black font-bold">
              Could you tell me more about your{" "}
              <span className="text-yellow-300 font-semibold">education</span>?
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLoading && (
          <motion.div
            className="flex justify-start px-6"
            role="status"
            aria-label="Gregory is typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
          >
            <motion.div
              className="loading loading-dots loading-lg self-start"
              animate={reduce ? undefined : { y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showLoading && showFirstBubble && (
          <motion.div
            className="chat chat-start min-w-0"
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : 20 }}
            transition={{ duration: reduce ? 0 : 0.4 }}
          >
            <div className="chat-header text-sm md:text-lg font-extrabold">Gregory</div>

            <div className="chat-bubble my-3 w-full min-w-0 max-w-full bg-neutral px-2 py-3 text-left xs:px-4">
              <section aria-labelledby="education-heading" className="min-w-0">
                <h2
                  id="education-heading"
                  className="mb-4 break-words text-base font-extrabold text-amber-300 md:text-2xl"
                >
                  Education
                </h2>
                <ol className="m-0 flex list-none flex-col gap-6 p-0 pb-2">
                  {education.map((edu, i) => (
                    <EduCard
                      key={`${edu.institution}-${edu.years}`}
                      edu={edu}
                      index={i}
                      reduce={reduce}
                    />
                  ))}
                </ol>

                <div className="mt-6 flex flex-col gap-5">
                  <ChipList label="Certifications" items={certifications} reduce={reduce} />
                  <ChipList label="Honors & Awards" items={honors} reduce={reduce} />
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
