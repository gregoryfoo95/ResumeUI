import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ActiveComponent } from "../@types/ActiveComponent";
import AboutMeText from "./ChatContent/AboutMeText";
import GitHubRepo from "./ChatContent/GitHubRepo";
import PromptWindow from "./ChatContent/PromptWindow";
import ConvoStarter from "./ChatContent/ConvoStarter";
import Education from "./ChatContent/Education";
import Career from "./ChatContent/Career";
import TechStack from "./ChatContent/TechStack";
import MediaCoverage from "./ChatContent/MediaCoverage";
import ChatNavBar from "./ChatNavBar";
import { topics } from "./chatTopics";
import CommandPalette from "./CommandPalette";
import ClassificationBar from "./ClassificationBar";
import SocFeed from "./SocFeed";
import PayloadHeader from "./PayloadHeader";
import TeamSwitch from "../components/TeamSwitch";
import { openCommandPalette } from "./paletteEvent";
import { printResume } from "../components/printResume";

const renderComponent = (component: ActiveComponent): JSX.Element | null => {
  switch (component) {
    case ActiveComponent.AboutMe:
      return <AboutMeText />;
    case ActiveComponent.TechnicalExperience:
      return <GitHubRepo />;
    case ActiveComponent.Study:
      return <Education />;
    case ActiveComponent.CareerExperience:
      return <Career />;
    case ActiveComponent.TechStack:
      return <TechStack />;
    case ActiveComponent.MediaCoverage:
      return <MediaCoverage />;
    default:
      return null;
  }
};

const sectionId = (c: ActiveComponent) => `section-${c}`;

export default function InnerHomePageWindow(): JSX.Element {
  const [active, setActive] = useState<ActiveComponent[]>([]);
  const pendingScroll = useRef<ActiveComponent | null>(null);

  const scrollTo = (c: ActiveComponent) => {
    const el = document.getElementById(sectionId(c));
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const open = (c: ActiveComponent) => {
    if (active.includes(c)) {
      scrollTo(c);
      return;
    }
    pendingScroll.current = c;
    setActive((prev) => [...prev, c]);
  };

  // Scroll to a newly added section once it has rendered.
  useEffect(() => {
    if (pendingScroll.current) {
      scrollTo(pendingScroll.current);
      pendingScroll.current = null;
    }
  }, [active]);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  const pct = Math.round((active.length / topics.length) * 100);

  return (
    <div className="mockup-window overflow-visible bg-base-300">
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-primary to-amber-300"
      />
      <div className="relative isolate flex flex-col overflow-x-clip bg-base-200">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="aurora-blob absolute -left-1/4 top-0 h-[60vh] w-[70vw] rounded-full bg-primary/15 blur-[120px]" />
          <div className="aurora-blob absolute -right-1/4 bottom-0 h-[55vh] w-[60vw] rounded-full bg-amber-300/10 blur-[120px] [animation-delay:-9s]" />
        </div>
        <CommandPalette onOpenTopic={open} onReset={() => setActive([])} />
        <ClassificationBar />
        <ChatNavBar />
        <div className="border-b border-base-content/10 px-4 py-3 lg:hidden">
          <TeamSwitch />
        </div>
        <div className="flex min-h-[70vh] flex-1">
          <aside
            aria-label="Topics"
            className="sticky top-0 hidden h-screen w-72 flex-none flex-col gap-4 border-r border-base-content/10 p-6 lg:flex"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-base-content/60">
              Explore
            </p>
            <progress className="progress progress-primary h-1.5 w-full" value={pct} max={100} aria-label="Topics explored" />
            <p className="text-xs text-base-content/70" aria-live="polite">
              {active.length} of {topics.length} topics explored
            </p>
            <ol className="flex flex-col gap-1">
              {topics.map((t, i) => {
                const done = active.includes(t.id);
                return (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => open(t.id)}
                      className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300 ${
                        done
                          ? "border-primary/50 bg-primary/10"
                          : "border-transparent hover:bg-base-300"
                      }`}
                    >
                      <span className="font-mono text-xs text-base-content/50">0{i + 1}</span>
                      <span className="flex-1">{t.label}</span>
                      {done && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-success" role="img" aria-label="Viewed">
                          <path d="M5 12l5 5 9-10" />
                        </svg>
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
            <div className="mt-2 flex flex-col gap-3 border-t border-base-content/10 pt-4">
              <TeamSwitch />
              <SocFeed />
            </div>
            <div className="mt-2 flex flex-col gap-2 border-t border-base-content/10 pt-4">
              <button type="button" onClick={printResume} className="btn btn-primary btn-sm">
                Download PDF
              </button>
              <button
                type="button"
                onClick={openCommandPalette}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-base-content/20 px-3 py-1.5 text-xs text-base-content/70 transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300"
              >
                Command palette <kbd className="font-mono">Ctrl K</kbd>
              </button>
            </div>
            {active.length > 0 && (
              <button
                type="button"
                onClick={() => setActive([])}
                className="btn btn-outline btn-sm mt-auto"
              >
                Reset chat
              </button>
            )}
          </aside>

          <main className="flex min-w-0 flex-1 flex-col">
            <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-2 py-6 sm:px-8">
              <ConvoStarter />
              {active.map((c) => (
                <section key={c} id={sectionId(c)} className="scroll-mt-4">
                  <PayloadHeader file={`${topics.find((t) => t.id === c)?.label.toLowerCase().replace(/\s+/g, "_") ?? "payload"}.enc`} />
                  {renderComponent(c)}
                </section>
              ))}
              <p className="mt-6 border-t border-base-content/10 pt-4 text-center text-xs text-base-content/50">
                &copy; {new Date().getFullYear()} Gregory Foo. All rights reserved. Unauthorized use,
                distribution or reproduction of this content is prohibited unless permission is sought.
              </p>
            </div>
            <PromptWindow onPromptClick={open} activeComponents={active} />
          </main>
        </div>
      </div>
    </div>
  );
}
