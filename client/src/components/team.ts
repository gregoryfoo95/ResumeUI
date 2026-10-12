// "Team" is a purely cosmetic colour mode (Forest / Blue team / Red team).
export type Team = "forest" | "blue" | "red";

export const TEAMS: { id: Team; label: string; tagline: string }[] = [
  { id: "forest", label: "Forest", tagline: "DEFAULT // STEALTH" },
  { id: "blue", label: "Blue", tagline: "DEFENSE // DETECT & RESPOND" },
  { id: "red", label: "Red", tagline: "OFFENSE // ADVERSARY SIM" },
];

const KEY = "team";

export function isTeam(v: unknown): v is Team {
  return v === "forest" || v === "blue" || v === "red";
}

export function loadTeam(): Team {
  try {
    const v = window.localStorage.getItem(KEY);
    return isTeam(v) ? v : "forest";
  } catch {
    return "forest";
  }
}

export function applyTeam(team: Team, persist = true): void {
  const root = document.documentElement;
  if (team === "forest") root.removeAttribute("data-team");
  else root.setAttribute("data-team", team);
  window.dispatchEvent(new CustomEvent("team-change", { detail: team }));
  if (!persist) return;
  try {
    window.localStorage.setItem(KEY, team);
  } catch {
    /* storage unavailable (private mode etc.): the mode just won't persist */
  }
}

export function currentTeam(): Team {
  const v = document.documentElement.getAttribute("data-team");
  return isTeam(v) ? v : "forest";
}
