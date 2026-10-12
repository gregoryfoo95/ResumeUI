import { useEffect, useState } from "react";
import { profile } from "../../data/profile";
import { FAKE_SCAN_LINES } from "./fakeScan";

// All of this is scripted theatre: no real scanning, targets or credentials.
const BOOT_LINES: { text: string; cls?: string }[] = [
  { text: "[    0.000000] Linux version 6.1.0-greg (gcc 12.2) #1 SMP PREEMPT" },
  { text: "[    0.042113] Command line: BOOT_IMAGE=/vmlinuz root=/dev/career ro quiet" },
  { text: "[ OK ] mounting /dev/education: Imperial College London", cls: "text-success" },
  { text: "[ OK ] loading aerospace.ko, fullstack.ko, autonomy.ko", cls: "text-success" },
  { text: "[BLUE] intrusion-detection: armed", cls: "text-info" },
  { text: "[RED ] recon module loaded (decorative)", cls: "text-error" },
  { text: "[ OK ] SIEM feed connected (simulated)", cls: "text-success" },
  { text: "[RED ] target: resume.example (192.0.2.1)", cls: "text-error" },
  ...FAKE_SCAN_LINES.slice(1, 6).map((text) => ({
    text,
    cls: text.includes("open") ? "text-warning" : "opacity-80",
  })),
  { text: "[BLUE] 0 real threats. 1 impatient viewer.", cls: "text-info" },
];

const LINE_MS = 130;
const BAR_WIDTH = 20;
const BAR_MS = 35;
const SCRAMBLE_TICK_MS = 40;
const REVEAL_EVERY = 2;
const SCRAMBLE_GLYPHS = "01ABCDEFGHJKLMNPQRSTUVWXYZ#$%&*<>{}[]=/;符傑雄アイウエオ";

type Props = {
  reducedMotion: boolean;
  onDone: () => void;
  /** When true, jump straight to the finished state (used by "Skip intro"). */
  complete?: boolean;
};

const randomGlyph = () => SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)];

const scramble = (full: string, revealed: number) =>
  Array.from(full)
    .map((ch, i) => (i < revealed || ch === " " ? ch : randomGlyph()))
    .join("");

export default function BootSequence({ reducedMotion, onDone, complete = false }: Props): JSX.Element {
  const fullName = `${profile.name.toUpperCase()} ${profile.nameZh}`;
  const nameLen = Array.from(fullName).length;
  const [lines, setLines] = useState(reducedMotion ? BOOT_LINES.length : 0);
  const [progress, setProgress] = useState(reducedMotion ? BAR_WIDTH : 0);
  const [ticks, setTicks] = useState(reducedMotion ? nameLen * REVEAL_EVERY : 0);
  const [shown, setShown] = useState(reducedMotion ? fullName : "");
  const [granted, setGranted] = useState(reducedMotion);

  // Skip: fast-forward every stage so the log, name and banner stay on screen.
  useEffect(() => {
    if (!complete) return;
    setLines(BOOT_LINES.length);
    setProgress(BAR_WIDTH);
    setTicks(nameLen * REVEAL_EVERY);
    setShown(fullName);
    setGranted(true);
  }, [complete, nameLen, fullName]);

  useEffect(() => {
    if (lines >= BOOT_LINES.length) return;
    const t = setTimeout(() => setLines((n) => n + 1), LINE_MS);
    return () => clearTimeout(t);
  }, [lines]);

  useEffect(() => {
    if (lines < BOOT_LINES.length || progress >= BAR_WIDTH) return;
    const t = setTimeout(() => setProgress((n) => n + 1), BAR_MS);
    return () => clearTimeout(t);
  }, [lines, progress]);

  // Decrypt effect: glyphs cycle, then settle left to right.
  const decrypting = progress >= BAR_WIDTH && ticks < nameLen * REVEAL_EVERY;
  useEffect(() => {
    if (progress < BAR_WIDTH) return;
    const revealed = Math.floor(ticks / REVEAL_EVERY);
    setShown(scramble(fullName, revealed));
    if (!decrypting) return;
    const t = setTimeout(() => setTicks((n) => n + 1), SCRAMBLE_TICK_MS);
    return () => clearTimeout(t);
  }, [progress, ticks, decrypting, fullName]);

  useEffect(() => {
    if (progress < BAR_WIDTH || decrypting || granted) return;
    const t = setTimeout(() => setGranted(true), 250);
    return () => clearTimeout(t);
  }, [progress, decrypting, granted]);

  useEffect(() => {
    if (!granted) return;
    const t = setTimeout(onDone, reducedMotion ? 0 : 800);
    return () => clearTimeout(t);
  }, [granted, onDone, reducedMotion]);

  const pct = Math.round((progress / BAR_WIDTH) * 100);
  const authStarted = lines >= BOOT_LINES.length;

  return (
    <div className="font-mono text-[11px] leading-5 sm:text-sm text-success/90 break-words whitespace-pre-wrap" aria-live="polite">
      {BOOT_LINES.slice(0, lines).map((l, i) => (
        <div key={i} className={l.cls}>
          {l.text}
        </div>
      ))}
      {authStarted && (
        <div className="mt-1">
          <span>AUTHENTICATING… </span>
          <span aria-hidden="true">
            [{"#".repeat(progress)}
            {".".repeat(BAR_WIDTH - progress)}]
          </span>{" "}
          <span>{pct}%</span>
        </div>
      )}
      {progress >= BAR_WIDTH && (
        <h1 className="mt-4 text-xl sm:text-3xl md:text-4xl font-bold tracking-widest text-success [text-shadow:0_0_12px_currentColor] break-words">
          <span aria-label={fullName}>{shown || fullName.replace(/./gu, " ")}</span>
          <span className="caret-blink" aria-hidden="true">
            █
          </span>
        </h1>
      )}
      {granted && (
        <div className="mt-2 inline-block max-w-full border border-success px-2 py-1 font-bold tracking-widest text-success [text-shadow:0_0_8px_currentColor]">
          ACCESS GRANTED
        </div>
      )}
    </div>
  );
}
