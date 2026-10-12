import { useEffect, useRef } from "react";

const GLYPHS =
  "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン符傑雄<>{}[]=/;";
const FONT_SIZE = 16;
const MAX_DPR = 2;

type Props = { reducedMotion?: boolean; intense?: boolean; color?: string };

// Canvas code rain. Math.random is used for visuals only.
export default function MatrixRain({
  reducedMotion = false,
  intense = false,
  color = "#1eb854",
}: Props): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intenseRef = useRef(false);
  intenseRef.current = intense && !reducedMotion;
  const colorRef = useRef(color);
  colorRef.current = color;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let drops: number[] = [];
    let last = 0;
    const FRAME_MS = 55;
    const FAST_MS = 25;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);
      const cols = Math.ceil(width / FONT_SIZE);
      drops = Array.from({ length: cols }, () => -Math.random() * (height / FONT_SIZE));
    };

    const step = () => {
      const hot = intenseRef.current;
      ctx.fillStyle = hot ? "rgba(0, 0, 0, 0.08)" : "rgba(0, 0, 0, 0.12)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${FONT_SIZE}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;
        // bright head, themed green trail
        ctx.fillStyle = Math.random() > (hot ? 0.8 : 0.96) ? "#ffffff" : colorRef.current;
        ctx.fillText(glyph, x, y);
        if (y > height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += hot ? 2 : 1;
      }
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - last < (intenseRef.current ? FAST_MS : FRAME_MS)) return;
      last = t;
      step();
    };

    const start = () => {
      if (!raf && !reducedMotion) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    if (reducedMotion) {
      for (let i = 0; i < 40; i++) step(); // single static frame
    } else {
      start();
    }
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-40 pointer-events-none"
    />
  );
}
