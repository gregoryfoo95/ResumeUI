// "Has this tab session already seen the intro?" sessionStorage is per tab and
// cleared when the tab closes. If storage is blocked we fall back to memory,
// which still lets in-app navigation work (a reload then replays the intro).
const KEY = "introSeen";
let memory = false;

export function hasSeenIntro(): boolean {
  if (memory) return true;
  try {
    return window.sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function markIntroSeen(): void {
  memory = true;
  try {
    window.sessionStorage.setItem(KEY, "1");
  } catch {
    /* storage unavailable: memory flag above still covers this page load */
  }
}
