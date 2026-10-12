import { useState, useEffect, useRef, type FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ActiveComponent } from "../../@types/ActiveComponent";
import { topics, findTopic } from "../chatTopics";

type PromptWindowProps = {
  onPromptClick: (component: ActiveComponent) => void;
  activeComponents: ActiveComponent[];
};

// Bottom "prompt dock": suggestion chips above a free-text composer.
export default function PromptWindow({
  onPromptClick,
  activeComponents,
}: PromptWindowProps): JSX.Element {
  const reduce = useReducedMotion();
  const [draft, setDraft] = useState("");
  const [miss, setMiss] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // "/" focuses the composer from anywhere (unless already typing in a field).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const q = draft.trim().toLowerCase();
  const chips = topics.filter(
    (t) =>
      !activeComponents.includes(t.id) &&
      (!q || t.prompt.toLowerCase().includes(q) || t.label.toLowerCase().includes(q)),
  );

  const ask = (id: ActiveComponent) => {
    onPromptClick(id);
    setDraft("");
    setMiss(false);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    const hit = findTopic(draft, activeComponents);
    if (hit) ask(hit.id);
    else setMiss(true);
  };

  const allDone = activeComponents.length >= topics.length;

  return (
    <div className="sticky bottom-0 z-20 border-t border-base-content/10 bg-base-200 px-3 pb-4 pt-3 shadow-[0_-12px_24px_-12px_rgba(0,0,0,0.8)] sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-3">
        <div role="group" aria-label="Suggested questions" className="flex flex-nowrap gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
          <AnimatePresence initial={false}>
            {chips.map((t) => (
              <motion.button
                key={t.id}
                layout={!reduce}
                type="button"
                onClick={() => ask(t.id)}
                initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.9 }}
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.96 }}
                className="inline-flex min-h-[44px] flex-none items-center gap-2 whitespace-nowrap rounded-full border border-primary/70 bg-base-300 px-4 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 sm:text-sm"
              >
                {t.prompt}
                <span aria-hidden="true">→</span>
              </motion.button>
            ))}
          </AnimatePresence>
          {allDone && (
            <p className="py-2 text-sm text-amber-300">
              You've seen everything. Thanks for stopping by!
            </p>
          )}
        </div>

        <form
          onSubmit={submit}
          className="flex items-center gap-2 rounded-full border border-base-content/20 bg-base-300 py-1.5 pl-5 pr-1.5 shadow-lg focus-within:border-primary"
        >
          <label htmlFor="ask-greg" className="sr-only">
            Ask Gregory
          </label>
          <input
            id="ask-greg"
            ref={inputRef}
            type="text"
            value={draft}
            maxLength={80}
            autoComplete="off"
            onChange={(e) => {
              setDraft(e.target.value);
              setMiss(false);
            }}
            placeholder="Ask about career, projects, tech stack…  (press / to type)"
            className="min-w-0 flex-1 bg-transparent py-2 text-sm text-base-content placeholder:text-base-content/50 focus:outline-none sm:text-base"
          />
          <button
            type="submit"
            aria-label="Send"
            className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-primary text-black transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </form>
        <p role="status" aria-live="polite" className="min-h-[1rem] px-5 text-xs text-amber-300">
          {miss ? "Nothing matched. Try “career”, “projects”, “education”, “tech stack” or “media”." : ""}
        </p>
      </div>
    </div>
  );
}
