import CodeSnippetPage from "./CodeSnippetComponent/CodeSnippetPage";
import { applyTeam, loadTeam } from "../components/team";
import { markIntroSeen } from "../components/introSeen";
import CommandPromptField, { Team } from "./CodeSnippetComponent/CommandPromptField";
import MatrixRain from "./CodeSnippetComponent/MatrixRain";
import BootSequence from "./CodeSnippetComponent/BootSequence";
import codeSnippet from "../@classes/codeSnippet";
import { codeBlockProps } from "../@types/codeBlock";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const TEAM_COLORS: Record<Team, string> = {
  green: "#1eb854",
  red: "#ef4444",
  blue: "#38bdf8",
};

export default function HomePage(): JSX.Element {
  const reduce = useReducedMotion() ?? false;
  const [team, setTeam] = useState<Team>(() => {
    const saved = loadTeam();
    return saved === "forest" ? "green" : saved;
  });
  // Mirror the choice site-wide (and persist it) so the resume itself is retinted.
  const changeTeam = useCallback((t: Team) => {
    setTeam(t);
    applyTeam(t === "green" ? "forest" : t);
  }, []);
  const [booted, setBooted] = useState(false);
  // Single shell: the scripted boot log stays on screen and the prompt appears beneath it.
  const [codeBlock, setCodeBlock] = useState<codeBlockProps[]>([
    new codeSnippet("View Resume? (y/n)", "> ", "", false),
  ]);

  // Keep the prompt in view as command output grows the shell.
  useEffect(() => {
    if (booted) window.scrollTo({ top: document.documentElement.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [booted, codeBlock.length, reduce]);

  // Finishing or skipping the intro counts as having seen it for this tab session.
  useEffect(() => {
    if (booted) markIntroSeen();
  }, [booted]);

  const finishBoot = useCallback(() => setBooted(true), []);

  const [intense, setIntense] = useState(false);
  const burstTimer = useRef<number | undefined>(undefined);
  const burst = useCallback(() => {
    if (reduce) return;
    window.clearTimeout(burstTimer.current);
    setIntense(true);
    burstTimer.current = window.setTimeout(() => setIntense(false), 3000);
  }, [reduce]);
  useEffect(() => () => window.clearTimeout(burstTimer.current), []);

  // Konami code: up up down down left right left right B A.
  useEffect(() => {
    const seq = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === seq[pos]) pos += 1;
      else pos = k === seq[0] ? 1 : 0;
      if (pos === seq.length) {
        pos = 0;
        burst();
        setCodeBlock((prev) => [
          ...prev,
          new codeSnippet("Konami accepted. +30 lives.", "> ", "text-success", false),
        ]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [burst]);

  // Keyboard: Enter / Escape / y / n / Space skip the boot sequence.
  useEffect(() => {
    if (booted) return;
    const onKey = (e: KeyboardEvent) => {
      if (["Enter", "Escape", " ", "y", "Y", "n", "N"].includes(e.key)) {
        e.preventDefault();
        setBooted(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [booted]);

  return (
    <div className="relative flex min-h-screen min-h-[100dvh] w-full flex-col justify-center overflow-hidden bg-black p-3 sm:p-6">
      <MatrixRain reducedMotion={reduce} intense={intense} color={TEAM_COLORS[team]} />

      {/* CRT overlay: scanlines + vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            "repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0, rgba(0,0,0,0) 2px, rgba(0,0,0,0.18) 3px), radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      <button
        type="button"
        onClick={() => setBooted(true)}
        className={`btn btn-xs sm:btn-sm btn-outline btn-success absolute right-3 top-3 z-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success ${
          booted ? "hidden" : ""
        }`}
      >
        Skip intro
      </button>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-3xl rounded-lg border border-success/60 bg-black/85 p-4 text-left text-sm text-success shadow-[0_0_30px_rgba(30,184,84,0.25)] backdrop-blur-sm md:text-base"
        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="mb-3 flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-error" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning" />
          <span className="h-2.5 w-2.5 rounded-full bg-success" />
          <span className="ml-2 font-mono text-xs opacity-60">greg@resume: ~</span>
        </div>
        <BootSequence reducedMotion={reduce} onDone={finishBoot} complete={booted} />
        {booted && (
          <div className="mt-3 font-mono text-[11px] leading-5 sm:text-sm">
            <CodeSnippetPage codeBlock={codeBlock} setCodeBlock={setCodeBlock} />
            <div className="pt-4">
              <CommandPromptField codeBlock={codeBlock} setCodeBlock={setCodeBlock} onBurst={burst} onTeamChange={changeTeam} />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
