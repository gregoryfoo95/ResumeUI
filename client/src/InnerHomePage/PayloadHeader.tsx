import { useReducedMotion } from "framer-motion";
import { useScramble } from "../components/useScramble";

// One-line "decrypt" log shown above each section as it is added to the chat.
export default function PayloadHeader({ file }: { file: string }): JSX.Element {
  const reduce = useReducedMotion() ?? false;
  const line = useScramble(`[+] payload ${file} decrypted · aes-256-gcm · integrity OK`, !reduce, 1100);
  return (
    <p aria-hidden="true" className="mb-3 break-words font-mono text-[10px] tracking-wide text-primary/80 sm:text-xs">
      <span className="text-base-content/50">$ decrypt {file} --key=recruiter</span>
      <br />
      {line}
    </p>
  );
}
