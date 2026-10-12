import { useEffect, useId, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  animate,
  useInView,
  useReducedMotion,
} from "framer-motion";
import RSAF from "../../assets/icons/RSAF.svg";
import { roles, stats } from "../../data/profile";
import type { Role, Stat } from "../../data/profile";

const isRsaf = (org: string): boolean =>
  org.includes("RSAF") || org.includes("Republic of Singapore Air Force");

function CountUp({ stat, reduce }: { stat: Stat; reduce: boolean }): JSX.Element {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(reduce ? stat.value : 0);

  useEffect(() => {
    if (reduce) {
      setDisplay(stat.value);
      return;
    }
    if (!inView) return;
    const controls = animate(0, stat.value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, stat.value]);

  return (
    <span ref={ref} aria-label={`${stat.value}${stat.suffix ?? ""}`}>
      <span aria-hidden="true">
        {display}
        {stat.suffix}
      </span>
    </span>
  );
}

function RoleCard({
  role,
  index,
  reduce,
  defaultOpen,
}: {
  role: Role;
  index: number;
  reduce: boolean;
  defaultOpen: boolean;
}): JSX.Element {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const current = Boolean(role.current);

  return (
    <motion.li
      className="relative pl-8 xs:pl-10 min-w-0"
      initial={reduce ? false : { opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: reduce ? 0 : Math.min(index, 3) * 0.08 }}
    >
      {/* Timeline marker */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-4 flex h-5 w-5 items-center justify-center"
      >
        {current && !reduce && (
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-amber-300/70"
            animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeOut" }}
          />
        )}
        <span
          className={`relative h-3 w-3 rounded-full ring-2 ring-offset-2 ring-offset-neutral ${
            current
              ? "bg-amber-300 ring-amber-300 shadow-[0_0_12px_2px] shadow-amber-300/70"
              : "bg-primary ring-primary/60"
          }`}
        />
      </span>

      <div
        className={`rounded-xl border bg-base-200/60 backdrop-blur-sm transition-shadow ${
          current
            ? "border-amber-300/60 shadow-[0_0_18px_-4px] shadow-amber-300/50"
            : "border-base-content/10 hover:shadow-lg"
        }`}
      >
        <h3 className="m-0">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((o) => !o)}
            className="flex w-full items-start gap-2 rounded-xl p-3 xs:p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-secondary">
                <time>{role.start}</time>
                <span aria-hidden="true">&rarr;</span>
                {current ? (
                  <span className="badge badge-sm border-amber-300 bg-amber-300 font-bold text-black">
                    {role.end}
                  </span>
                ) : (
                  <time>{role.end}</time>
                )}
              </span>
              <span className="mt-1 block break-words text-sm font-extrabold leading-snug text-amber-300 md:text-lg">
                {role.title}
              </span>
              <span className="mt-1 flex items-center gap-2 break-words text-xs font-semibold md:text-base">
                {isRsaf(role.org) && (
                  <img
                    src={RSAF}
                    alt=""
                    className="h-5 w-5 shrink-0 rounded bg-white object-contain p-px"
                  />
                )}
                <span className="min-w-0">
                  {role.org}
                  {role.location ? ` · ${role.location}` : ""}
                </span>
              </span>
            </span>
            <motion.span
              aria-hidden="true"
              className="mt-1 shrink-0 text-primary"
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: reduce ? 0 : 0.25 }}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path
                  d="M5 8l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
            <span className="sr-only">{open ? "Collapse details" : "Expand details"}</span>
          </button>
        </h3>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              key="panel"
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-3 pb-3 xs:px-4 xs:pb-4">
                <ul className="list-disc space-y-2 pl-5 text-xs font-medium leading-relaxed marker:text-primary md:text-base">
                  {role.bullets.map((b) => (
                    <li key={b} className="break-words">
                      {b}
                    </li>
                  ))}
                </ul>
                {role.tags && role.tags.length > 0 && (
                  <ul
                    aria-label={`Technologies for ${role.title}`}
                    className="mt-3 flex flex-wrap gap-1.5"
                  >
                    {role.tags.map((t, i) => (
                      <motion.li
                        key={t}
                        initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: reduce ? 0 : i * 0.03, duration: 0.25 }}
                        className="badge badge-outline badge-sm h-auto whitespace-normal break-words border-secondary py-0.5 text-secondary md:badge-md"
                      >
                        {t}
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  );
}

export default function Career(): JSX.Element {
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
      {/* User prompt */}
      <AnimatePresence>
        {showFirstBubble && (
          <motion.div
            className="chat chat-end text-left"
            initial={{ opacity: 0, x: reduce ? 0 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduce ? 0 : 30 }}
            transition={{ duration: reduce ? 0 : 0.5 }}
          >
            <div className="chat-header text-sm md:text-xl font-extrabold">You</div>
            <div className="chat-bubble text-sm md:text-lg bg-primary my-3 text-black font-bold">
              Share with me your{" "}
              <span className="text-yellow-300 font-semibold">career</span> journey so far!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading dots */}
      <AnimatePresence>
        {showLoading && (
          <motion.div
            className="flex px-4"
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

      {/* Reply */}
      <AnimatePresence>
        {!showLoading && showFirstBubble && (
          <motion.div
            className="chat chat-start min-w-0"
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : 20 }}
            transition={{ duration: reduce ? 0 : 0.4 }}
          >
            <div className="chat-header text-sm md:text-xl font-extrabold">Gregory</div>

            <div className="chat-bubble my-3 w-full min-w-0 max-w-full bg-neutral px-2 py-3 text-left xs:px-4">
              <section aria-labelledby="career-heading" className="min-w-0">
                <h2
                  id="career-heading"
                  className="mb-3 break-words text-base font-extrabold text-amber-300 md:text-2xl"
                >
                  Career Timeline
                </h2>

                {/* Stats */}
                <ul
                  aria-label="Career highlights"
                  className="mb-5 grid grid-cols-2 gap-2 md:grid-cols-4"
                >
                  {stats.map((s, i) => (
                    <motion.li
                      key={s.label}
                      initial={reduce ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: reduce ? 0 : 0.1 + i * 0.1, duration: 0.4 }}
                      className="relative min-w-0 overflow-hidden rounded-lg border border-primary/40 bg-base-200/70 p-2 text-center"
                    >
                      <span className="block text-2xl font-extrabold text-amber-300 md:text-4xl">
                        <CountUp stat={s} reduce={reduce} />
                      </span>
                      <span className="mt-1 block break-words text-[10px] font-semibold leading-tight text-secondary xs:text-xs">
                        {s.label}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* Timeline */}
                <div className="relative">
                  <div
                    aria-hidden="true"
                    className="absolute bottom-2 left-[9px] top-2 w-0.5 rounded bg-base-content/15"
                  />
                  <motion.div
                    aria-hidden="true"
                    className="absolute bottom-2 left-[9px] top-2 w-0.5 origin-top rounded bg-gradient-to-b from-amber-300 via-primary to-secondary shadow-[0_0_10px_1px] shadow-primary/70"
                    initial={reduce ? false : { scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={{ duration: reduce ? 0 : 2.4, ease: "easeInOut" }}
                  />
                  <ol className="relative m-0 flex list-none flex-col gap-4 p-0">
                    {roles.map((role, i) => (
                      <RoleCard
                        key={`${role.org}-${role.start}`}
                        role={role}
                        index={i}
                        reduce={reduce}
                        defaultOpen={i === 0}
                      />
                    ))}
                  </ol>
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
