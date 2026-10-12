import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface TypedTextProps {
  text: string;
  /** Milliseconds per word. */
  speed?: number;
  /** Skip the animation and render the full text immediately. */
  instant?: boolean;
  onDone?: () => void;
  className?: string;
}

// Reveals text word by word with a blinking caret. Screen readers receive the
// full string at once; the animated copy is aria-hidden. Unrevealed words are
// rendered invisibly so the bubble never changes size while typing.
export default function TypedText({ text, speed = 35, instant = false, onDone, className }: TypedTextProps): JSX.Element {
  const reduce = useReducedMotion() ?? false;
  const skip = instant || reduce;
  const words = text.split(" ");
  const [count, setCount] = useState(skip ? words.length : 0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (skip) {
      setCount(words.length);
      doneRef.current?.();
      return;
    }
    setCount(0);
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setCount(n);
      if (n >= words.length) {
        clearInterval(id);
        doneRef.current?.();
      }
    }, speed);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, skip]);

  const typing = !skip && count < words.length;
  const shown = words.slice(0, count).join(" ");
  const rest = words.slice(count).join(" ");

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {shown}
        {typing && <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-pulse bg-current" />}
        {rest && <span className="invisible">{count > 0 ? " " : ""}{rest}</span>}
      </span>
    </span>
  );
}
