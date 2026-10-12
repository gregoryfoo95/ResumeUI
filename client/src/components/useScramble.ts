import { useEffect, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#0123456789ABCDEF";

// Decrypt-style text reveal: characters cycle through glyphs, then settle left to right.
export function useScramble(text: string, enabled: boolean, durationMs = 900): string {
  const [out, setOut] = useState(enabled ? "" : text);

  useEffect(() => {
    if (!enabled) {
      setOut(text);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / durationMs, 1);
      const settled = Math.floor(p * text.length);
      let s = text.slice(0, settled);
      for (let i = settled; i < text.length; i++) {
        s += text[i] === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, enabled, durationMs]);

  return out;
}
