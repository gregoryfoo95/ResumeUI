import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

// Decorative "classified document" strip with a live UTC clock.
export default function ClassificationBar(): JSX.Element {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const utc = `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}Z`;

  return (
    <div
      aria-hidden="true"
      className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-primary sm:px-10 sm:text-xs"
    >
      <span>Classification: public // clearance: recruiter</span>
      <span className="hidden sm:inline">Session 0x{(now.getUTCDate() * 4096 + 0x2a7f).toString(16)} · simulated</span>
      <span>{utc}</span>
    </div>
  );
}
