import { useEffect, useState } from "react";
import { TEAMS, applyTeam, currentTeam, isTeam, type Team } from "./team";

const dot: Record<Team, string> = {
  forest: "bg-[hsl(141_72%_42%)]",
  blue: "bg-[hsl(199_89%_55%)]",
  red: "bg-[hsl(0_84%_60%)]",
};

// Segmented radio group to switch the colour mode.
export default function TeamSwitch(): JSX.Element {
  const [team, setTeam] = useState<Team>(currentTeam());

  useEffect(() => {
    const onChange = (e: Event) => {
      const t = (e as CustomEvent).detail;
      if (isTeam(t)) setTeam(t);
    };
    window.addEventListener("team-change", onChange);
    return () => window.removeEventListener("team-change", onChange);
  }, []);

  const active = TEAMS.find((t) => t.id === team);

  return (
    <div className="flex flex-col gap-2">
      <div role="radiogroup" aria-label="Console colour mode" className="flex gap-1 rounded-full border border-base-content/20 bg-base-300 p-1">
        {TEAMS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={team === t.id}
            aria-label={t.id === "forest" ? "Forest (default)" : `${t.label} team`}
            onClick={() => applyTeam(t.id)}
            className={`flex min-h-[44px] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-2 py-1.5 text-[11px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300 ${
              team === t.id ? "bg-primary text-black" : "text-base-content/70 hover:text-base-content"
            }`}
          >
            <span aria-hidden="true" className={`h-2 w-2 rounded-full ${dot[t.id]}`} />
            {t.label}
          </button>
        ))}
      </div>
      <p className="font-mono text-[10px] tracking-widest text-primary/80" aria-live="polite">
        MODE: {active?.tagline}
      </p>
    </div>
  );
}
