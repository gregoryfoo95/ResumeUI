import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { skills } from "../../data/profile";

const ALL = "All";

interface Chip {
  label: string;
  category: string;
}

export default function TechStack(): JSX.Element {
  const reduce = useReducedMotion();
  const [showLoading, setShowLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState("");
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const t = setTimeout(() => setShowLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const tabs = useMemo(() => [ALL, ...skills.map((g) => g.title)], []);

  const chips: Chip[] = useMemo(() => {
    const source = active === 0 ? skills : [skills[active - 1]];
    return source.flatMap((g) => g.items.map((label) => ({ label, category: g.title })));
  }, [active]);

  const q = query.trim().toLowerCase();
  const matches = (c: Chip) => q === "" || c.label.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
  const matchCount = chips.filter(matches).length;

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const tabId = (i: number) => `${baseId}-tab-${i}`;
  const panelId = `${baseId}-panel`;

  return (
    <motion.div
      className="flex flex-col gap-y-4 min-w-0"
      initial={reduce ? false : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="chat chat-end text-left"
        initial={reduce ? false : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="chat-header text-sm md:text-xl font-extrabold">You</div>
        <div className="chat-bubble bg-primary text-sm md:text-lg my-3 text-black font-bold">
          Show off your <span className="text-amber-300 font-semibold">tech stack</span>!
        </div>
      </motion.div>

      {showLoading && (
        <div className="flex px-4" role="status" aria-label="Gregory is typing">
          <div className="loading loading-dots loading-lg self-start" />
        </div>
      )}

      {!showLoading && (
        <motion.div
          className="chat chat-start min-w-0"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="chat-header text-sm md:text-xl font-extrabold">Gregory</div>
          <div className="chat-bubble bg-neutral my-3 min-w-0 max-w-full w-full md:w-[34rem] text-left">
            <h2 className="text-amber-300 font-extrabold text-base md:text-xl mb-3">Tech Constellation</h2>

            <label className="relative block mb-3">
              <span className="sr-only">Filter skills</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter skills..."
                className="input input-bordered input-sm md:input-md w-full bg-base-200 focus:border-primary focus:outline-primary"
              />
            </label>

            <div
              role="tablist"
              aria-label="Skill categories"
              className="flex gap-2 overflow-x-auto pb-2 mb-3 -mx-1 px-1"
            >
              {tabs.map((t, i) => {
                const selected = i === active;
                return (
                  <button
                    key={t}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    id={tabId(i)}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    aria-controls={panelId}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className={`relative shrink-0 rounded-full px-3 py-1 text-xs md:text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300 ${
                      selected ? "text-black" : "text-base-content hover:bg-base-300"
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId={`${baseId}-pill`}
                        className="absolute inset-0 rounded-full bg-primary"
                        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative">{t}</span>
                  </button>
                );
              })}
            </div>

            <div id={panelId} role="tabpanel" aria-labelledby={tabId(active)} tabIndex={0} className="min-w-0 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300">
              <ul key={`${active}`} className="flex flex-wrap gap-2 list-none p-0 m-0">
                {chips.map((c, i) => {
                  const hit = matches(c);
                  return (
                    <motion.li
                      key={`${c.category}-${c.label}`}
                      className="max-w-full"
                      initial={reduce ? false : { opacity: 0, scale: 0.4, y: 12 }}
                      animate={{ opacity: hit ? 1 : 0.2, scale: hit ? 1 : 0.94, y: 0 }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 22, delay: i * 0.035 }
                      }
                    >
                      <button
                        type="button"
                        onClick={() => setQuery((cur) => (cur === c.label ? "" : c.label))}
                        title={active === 0 ? c.category : undefined}
                        className="badge badge-outline badge-secondary h-auto max-w-full whitespace-normal break-words py-1 text-xs md:text-sm transition-all duration-200 hover:bg-secondary hover:text-black hover:shadow-lg hover:shadow-secondary/60 hover:-translate-y-0.5 focus-visible:bg-secondary focus-visible:text-black focus-visible:shadow-lg focus-visible:shadow-secondary/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300"
                      >
                        {c.label}
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            <p className="mt-3 text-xs text-base-content/70" role="status" aria-live="polite">
              {q ? `${matchCount} of ${chips.length} skills match` : `${chips.length} skills`}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
