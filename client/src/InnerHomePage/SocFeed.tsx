import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Entirely fictional telemetry. IPs are RFC 5737 documentation ranges; nothing here is real.
const EVENTS: { tag: "INFO" | "WARN" | "BLOCK" | "RED" | "BLUE"; text: string }[] = [
  { tag: "BLOCK", text: "203.0.113.7 -> :22 policy=social-life" },
  { tag: "INFO", text: "session recruiter@198.51.100.4 authenticated" },
  { tag: "WARN", text: "coffee level below threshold" },
  { tag: "RED", text: "recon: resume.example 443/tcp open" },
  { tag: "BLUE", text: "detection: curiosity spike (benign)" },
  { tag: "INFO", text: "payload career.enc requested" },
  { tag: "BLOCK", text: "192.0.2.19 -> :8080 reason=too-many-ideas" },
  { tag: "BLUE", text: "alert triaged: false positive" },
  { tag: "RED", text: "simulated phish: 'free pizza' (blocked)" },
  { tag: "INFO", text: "heartbeat OK · uptime 99.9% (vibes)" },
  { tag: "WARN", text: "scroll velocity high, hire-ability rising" },
];

const color: Record<string, string> = {
  INFO: "text-base-content/60",
  WARN: "text-warning",
  BLOCK: "text-error",
  RED: "text-red-400",
  BLUE: "text-sky-400",
};

const MAX = 9;

export default function SocFeed(): JSX.Element {
  const reduce = useReducedMotion();
  const [cursor, setCursor] = useState(MAX);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setCursor((c) => c + 1), 1800);
    return () => window.clearInterval(id);
  }, [reduce]);

  const rows = Array.from({ length: MAX }, (_, i) => {
    const n = cursor - MAX + i;
    return { n, ev: EVENTS[((n % EVENTS.length) + EVENTS.length) % EVENTS.length] };
  });

  return (
    <div aria-hidden="true" className="rounded-xl border border-primary/30 bg-black/60 p-3 font-mono text-[10px] leading-relaxed">
      <div className="mb-2 flex items-center justify-between text-primary">
        <span className="tracking-widest">SOC FEED</span>
        <span className="rounded border border-primary/40 px-1 text-[9px] text-primary/80">SIMULATED</span>
      </div>
      <ul className="flex flex-col gap-0.5 overflow-hidden">
        {rows.map(({ n, ev }) => (
          <li key={n} className="truncate">
            <span className={`mr-1 ${color[ev.tag]}`}>[{ev.tag.padEnd(5, " ")}]</span>
            <span className="text-base-content/70">{ev.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
