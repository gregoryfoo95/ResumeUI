import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { profile, projects } from "../../data/profile";
import type { Project } from "../../data/profile";
import SafeLink from "../../components/SafeLink";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

function StackChips({ stack, size = "xs" }: { stack: readonly string[]; size?: "xs" | "sm" }): JSX.Element {
  return (
    <ul className="flex flex-wrap gap-1.5 list-none p-0 m-0">
      {stack.map((s) => (
        <li
          key={s}
          className={`badge badge-outline badge-secondary h-auto max-w-full whitespace-normal break-words py-0.5 ${
            size === "sm" ? "text-xs md:text-sm" : "text-xs"
          }`}
        >
          {s}
        </li>
      ))}
    </ul>
  );
}

function ProjectCard({
  project,
  index,
  reduce,
  onOpen,
}: {
  project: Project;
  index: number;
  reduce: boolean;
  onOpen: (p: Project, trigger: HTMLElement) => void;
}): JSX.Element {
  const px = useMotionValue(50);
  const py = useMotionValue(50);
  const rx = useSpring(0, { stiffness: 200, damping: 20 });
  const ry = useSpring(0, { stiffness: 200, damping: 20 });
  const [spot, setSpot] = useState(false);
  const spotlight = useMotionTemplate`radial-gradient(180px circle at ${px}% ${py}%, hsl(var(--p) / 0.28), transparent 70%)`;

  const move = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    px.set(x * 100);
    py.set(y * 100);
    if (!reduce) {
      ry.set((x - 0.5) * 12);
      rx.set((0.5 - y) * 12);
    }
  };
  const leave = () => {
    setSpot(false);
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.li
      className="list-none min-w-0"
      style={{ perspective: 800 }}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? { duration: 0 } : { duration: 0.5, delay: index * 0.12 }}
    >
      <motion.button
        type="button"
        onClick={(e) => onOpen(project, e.currentTarget)}
        onPointerEnter={(e) => e.pointerType !== "touch" && setSpot(true)}
        onPointerMove={move}
        onPointerLeave={leave}
        aria-haspopup="dialog"
        style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        whileTap={reduce ? undefined : { scale: 0.98 }}
        className="group relative block w-full min-w-0 overflow-hidden rounded-xl border border-base-content/20 bg-base-200 p-3 text-left transition-colors hover:border-primary focus-visible:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300"
      >
        {spot && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: spotlight }}
          />
        )}
        <span className="relative block">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-extrabold text-amber-300 text-sm md:text-lg break-words">{project.name}</span>
            {project.highlight && (
              <span className="badge badge-accent badge-sm font-bold text-black">{project.highlight}</span>
            )}
          </span>
          <span className="block text-xs text-base-content/70 mb-2 break-words">{project.org}</span>
          <span className="block text-xs md:text-sm mb-2 line-clamp-2 break-words">{project.blurb}</span>
          <span className="block">
            <StackChips stack={project.stack.slice(0, 5)} />
          </span>
          <span className="mt-2 block text-xs text-primary font-semibold group-hover:underline">
            View details
          </span>
        </span>
      </motion.button>
    </motion.li>
  );
}

// Only same-origin relative assets are allowed (CSP is default-src 'self').
const isLocalAsset = (s: string | undefined): s is string =>
  !!s && ((s.startsWith("/") && !s.startsWith("//")) || s.startsWith("images/"));

function ProjectDemo({ demo }: { demo: Project["demo"] }): JSX.Element | null {
  if (!demo || !isLocalAsset(demo.src) || !demo.alt) return null;
  const cls = "mt-4 block h-auto w-full max-w-full max-h-64 rounded-lg bg-base-300 object-contain aspect-video";
  if (demo.type === "image") {
    return <img src={demo.src} alt={demo.alt} loading="lazy" width={1280} height={720} className={cls} />;
  }
  return (
    <video
      src={demo.src}
      poster={isLocalAsset(demo.poster) ? demo.poster : undefined}
      aria-label={demo.alt}
      controls
      preload="none"
      playsInline
      width={1280}
      height={720}
      className={cls}
    />
  );
}

function ProjectModal({
  project,
  reduce,
  onClose,
}: {
  project: Project;
  reduce: boolean;
  onClose: () => void;
}): JSX.Element {
  const titleId = useId();
  const descId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== "Tab") return;
    const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (!nodes || nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    const cur = document.activeElement;
    if (e.shiftKey && cur === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && cur === last) {
      e.preventDefault();
      first.focus();
    } else if (!panelRef.current?.contains(cur)) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.2 }}
      onKeyDown={onKeyDown}
    >
      <div className="absolute inset-0 bg-base-100/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-t-2xl sm:rounded-2xl border border-primary bg-neutral p-4 md:p-6 text-left shadow-2xl shadow-primary/30"
        initial={reduce ? false : { opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.95 }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 28 }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 id={titleId} className="text-lg md:text-2xl font-extrabold text-amber-300 break-words">
              {project.name}
            </h2>
            <p className="text-xs md:text-sm text-base-content/70 break-words">{project.org}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="btn btn-circle btn-ghost btn-md shrink-0"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>
        {project.highlight && (
          <span className="badge badge-accent font-bold text-black mt-3">{project.highlight}</span>
        )}
        <p id={descId} className="mt-3 text-sm md:text-base leading-relaxed break-words">
          {project.blurb}
        </p>
        <ProjectDemo demo={project.demo} />
        <h3 className="mt-4 mb-2 text-xs font-bold uppercase tracking-wider text-secondary">Stack</h3>
        <StackChips stack={project.stack} size="sm" />
        <div className="mt-5 flex flex-wrap gap-2">
          {project.links?.map((l) => (
            <SafeLink key={l.url} href={l.url} className="btn btn-accent btn-sm min-h-[44px] text-black">
              {l.label}
            </SafeLink>
          ))}
          <SafeLink href={profile.links.github} className="btn btn-primary btn-sm min-h-[44px] text-black">
            GitHub
          </SafeLink>
          <SafeLink href={profile.links.linkedin} className="btn btn-outline btn-secondary btn-sm min-h-[44px]">
            LinkedIn
          </SafeLink>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function GitHubRepo(): JSX.Element {
  const reduce = useReducedMotion() ?? false;
  const [showLoading, setShowLoading] = useState(true);
  const [selected, setSelected] = useState<Project | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setShowLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const open = useCallback((p: Project, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setSelected(p);
  }, []);

  const close = useCallback(() => {
    setSelected(null);
    const el = triggerRef.current;
    // Restore focus once the dialog has unmounted from the DOM.
    requestAnimationFrame(() => el?.focus());
  }, []);

  return (
    <motion.div
      className="flex flex-col gap-y-4 min-w-0"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="chat chat-end text-left"
        initial={reduce ? false : { opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="chat-header text-sm md:text-xl font-extrabold">You</div>
        <div className="chat-bubble bg-primary text-sm md:text-lg my-3 text-black font-bold">
          Any <span className="text-amber-300 font-semibold">technical projects</span> that you've done?
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
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="chat-header text-sm md:text-xl font-extrabold">Gregory</div>
          <div className="chat-bubble bg-neutral my-3 min-w-0 max-w-full w-full md:w-[34rem] text-left">
            <h2 className="text-amber-300 font-extrabold text-base md:text-xl mb-3">Project Showcase</h2>
            <ul className="grid grid-cols-1 gap-3 p-0 m-0">
              {projects.map((p, i) => (
                <ProjectCard key={p.name} project={p} index={i} reduce={reduce} onOpen={open} />
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <SafeLink href={profile.links.github} className="btn btn-primary btn-sm min-h-[44px] text-black">
                More on GitHub
              </SafeLink>
              <SafeLink href={profile.links.linkedin} className="btn btn-outline btn-secondary btn-sm min-h-[44px]">
                LinkedIn
              </SafeLink>
            </div>
          </div>
        </motion.div>
      )}

      {createPortal(
        <AnimatePresence>
          {selected && <ProjectModal key={selected.name} project={selected} reduce={reduce} onClose={close} />}
        </AnimatePresence>,
        document.body,
      )}
    </motion.div>
  );
}
