import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ActiveComponent } from "../@types/ActiveComponent";
import { profile } from "../data/profile";
import { isSafeUrl } from "../components/isSafeUrl";
import { printResume } from "../components/printResume";
import { topics } from "./chatTopics";
import { OPEN_PALETTE_EVENT } from "./paletteEvent";

interface Action {
  id: string;
  label: string;
  hint: string;
  run: () => void;
}

type Props = {
  onOpenTopic: (c: ActiveComponent) => void;
  onReset: () => void;
};

function openExternal(url: string) {
  if (isSafeUrl(url)) window.open(url, "_blank", "noopener,noreferrer");
}

// Ctrl/Cmd+K command palette (combobox pattern: focus stays in the input,
// the highlighted row is exposed via aria-activedescendant).
export default function CommandPalette({ onOpenTopic, onReset }: Props): JSX.Element {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [notice, setNotice] = useState("");
  const returnFocus = useRef<HTMLElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = () => {
    setOpen(false);
    setQuery("");
    setCursor(0);
    returnFocus.current?.focus();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        returnFocus.current = document.activeElement as HTMLElement | null;
        setOpen((o) => !o);
      }
    };
    const onOpen = () => {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const actions: Action[] = useMemo(
    () => [
      ...topics.map<Action>((t) => ({
        id: `topic-${t.id}`,
        label: `Go to ${t.label}`,
        hint: "Topic",
        run: () => onOpenTopic(t.id),
      })),
      { id: "pdf", label: "Download resume (PDF)", hint: "Action", run: () => printResume() },
      { id: "github", label: "Open GitHub", hint: "Link", run: () => openExternal(profile.links.github) },
      { id: "linkedin", label: "Open LinkedIn", hint: "Link", run: () => openExternal(profile.links.linkedin) },
      {
        id: "copy",
        label: "Copy LinkedIn URL",
        hint: "Action",
        run: () => {
          navigator.clipboard
            ?.writeText(profile.links.linkedin)
            .then(() => setNotice("LinkedIn URL copied"))
            .catch(() => setNotice("Copy blocked by the browser"));
        },
      },
      { id: "top", label: "Scroll to top", hint: "Action", run: () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }) },
      { id: "reset", label: "Reset chat", hint: "Action", run: onReset },
    ],
    [onOpenTopic, onReset, reduce],
  );

  const q = query.trim().toLowerCase();
  const results = actions.filter((a) => !q || a.label.toLowerCase().includes(q) || a.hint.toLowerCase().includes(q));
  const active = Math.min(cursor, Math.max(results.length - 1, 0));

  const run = (a: Action | undefined) => {
    if (!a) return;
    a.run();
    // Keep the palette open only to show the "copied" notice.
    if (a.id !== "copy") close();
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-start justify-center bg-black/70 px-3 pt-[12vh] backdrop-blur-sm"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-primary/40 bg-base-200 shadow-[0_0_40px_rgba(30,184,84,0.2)]"
              initial={reduce ? false : { y: -16, scale: 0.97 }}
              animate={{ y: 0, scale: 1 }}
            >
              <input
                ref={inputRef}
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={results[active] ? `palette-${results[active].id}` : undefined}
                aria-label="Search commands"
                value={query}
                maxLength={60}
                autoComplete="off"
                placeholder="Type a command or topic…"
                className="w-full border-b border-base-content/10 bg-transparent px-5 py-4 text-base text-base-content placeholder:text-base-content/50 focus:outline-none"
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCursor(0);
                  setNotice("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    e.preventDefault();
                    close();
                  } else if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setCursor((c) => Math.min(c + 1, results.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setCursor((c) => Math.max(c - 1, 0));
                  } else if (e.key === "Enter") {
                    e.preventDefault();
                    run(results[active]);
                  } else if (e.key === "Tab") {
                    e.preventDefault(); // keep focus inside the dialog
                  }
                }}
              />
              <ul id="palette-list" role="listbox" aria-label="Commands" className="max-h-72 overflow-y-auto p-2">
                {results.length === 0 && <li className="px-4 py-6 text-center text-sm text-base-content/60">No matching command</li>}
                {results.map((a, i) => (
                  <li
                    key={a.id}
                    id={`palette-${a.id}`}
                    role="option"
                    aria-selected={i === active}
                    onMouseEnter={() => setCursor(i)}
                    onClick={() => run(a)}
                    className={`flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-sm ${
                      i === active ? "bg-primary text-black" : "text-base-content"
                    }`}
                  >
                    <span className="font-semibold">{a.label}</span>
                    <span className={`text-xs ${i === active ? "text-black/70" : "text-base-content/50"}`}>{a.hint}</span>
                  </li>
                ))}
              </ul>
              <p role="status" aria-live="polite" className="min-h-[1.5rem] px-5 pb-3 text-xs text-amber-300">
                {notice}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
