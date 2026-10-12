import ArrowIcon from "../../assets/icons/ArrowIcon.svg";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { codeBlockProps } from "../../@types/codeBlock";
import { profile } from "../../data/profile";
import { FAKE_SCAN_LINES } from "./fakeScan";

export type Team = "green" | "red" | "blue";
type Props = {
  codeBlock?: codeBlockProps[];
  setCodeBlock: React.Dispatch<React.SetStateAction<codeBlockProps[]>>;
  onBurst?: () => void;
  onTeamChange?: (team: Team) => void;
};

const MAX_LEN = 80;
const HIRE_DELAY_MS = 1800;

const line = (code: string, color = "", prefix = "> "): codeBlockProps => ({
  code,
  prefix,
  color,
  shouldType: false,
});

const PROMPT_LINE = line("View Resume? (y/n)");

const BANNER = [
  "+------------------------------+",
  "|   PERMISSION GRANTED  \\o/    |",
  "|   greg has been hired.       |",
  "+------------------------------+",
  "Redirecting to resume...",
];

export default function CommandPromptField({
  setCodeBlock,
  onBurst,
  onTeamChange,
}: Props): JSX.Element {
  const navigate = useNavigate();

  const [rawCommand, setCommand] = useState<string>("");
  const history = useRef<string[]>([]);
  const histIdx = useRef<number>(-1);
  const hireTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(hireTimer.current), []);

  const append = (...lines: codeBlockProps[]) =>
    setCodeBlock((prev) => [...prev, ...lines]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    histIdx.current = -1;
    setCommand(event.target.value.toLowerCase().slice(0, MAX_LEN));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const h = history.current;
    if (event.key === "ArrowUp" && h.length) {
      event.preventDefault();
      histIdx.current =
        histIdx.current < 0 ? h.length - 1 : Math.max(0, histIdx.current - 1);
      setCommand(h[histIdx.current]);
    } else if (event.key === "ArrowDown" && histIdx.current >= 0) {
      event.preventDefault();
      if (histIdx.current >= h.length - 1) {
        histIdx.current = -1;
        setCommand("");
      } else {
        histIdx.current += 1;
        setCommand(h[histIdx.current]);
      }
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const command = rawCommand.trim().replace(/\s+/g, " ");
    setCommand("");
    histIdx.current = -1;
    if (!command) return;
    history.current.push(command);

    if (command === "y") {
      navigate("/Home", { replace: true });
      return;
    }
    if (command === "clear") {
      setCodeBlock([PROMPT_LINE]);
      return;
    }

    const echo = line(command, "", "$ ");
    switch (command) {
      case "n":
        append(line(`You are unable to proceed without typing 'y'.`, "text-warning"));
        break;
      case "help":
        append(
          echo,
          line("Commands: y, n, help, whoami, ls, cat resume.pdf, clear, matrix"),
          line("Theatre: nmap resume.example, whois greg, ping hire.me, red, blue, hack"),
          line("Also try: sudo hire greg. Arrow keys recall history."),
        );
        break;
      case "whoami":
        append(echo, line(`${profile.nameZh} (${profile.name}), ${profile.currentRole}`));
        break;
      case "ls":
        append(echo, line("career/  projects/  education/  resume.pdf"));
        break;
      case "cat resume.pdf":
        append(
          echo,
          line("Binary file. Nice try, though: just type 'y' like everyone else.", "text-warning"),
        );
        break;
      case "matrix":
        append(echo, line("Following the white rabbit..."));
        onBurst?.();
        break;
      case "nmap resume.example":
      case "nmap greg":
        append(echo, ...FAKE_SCAN_LINES.map((t) => line(t, t.includes("open") ? "text-warning" : "")));
        break;
      case "whois greg":
        append(
          echo,
          line(`Name:     ${profile.name} (${profile.nameZh})`),
          line(`Role:     ${profile.currentRole}`),
          line(`Location: ${profile.location}`),
        );
        break;
      case "ping hire.me":
        append(
          echo,
          line("PING hire.me (203.0.113.7): 56 data bytes (fictional)"),
          line("64 bytes from 203.0.113.7: seq=0 ttl=64 time=0.1 ms (enthusiasm)"),
          line("64 bytes from 203.0.113.7: seq=1 ttl=64 time=0.2 ms (still waiting)"),
          line("64 bytes from 203.0.113.7: seq=2 ttl=64 time=0.1 ms (resume unread)"),
          line("64 bytes from 203.0.113.7: seq=3 ttl=64 time=0.0 ms (type sudo hire greg)"),
        );
        break;
      case "hack":
      case "exploit":
        append(
          echo,
          line("Nice try. This console is decorative; try sudo hire greg.", "text-warning"),
        );
        break;
      case "red":
      case "blue":
        append(echo, line(command === "red" ? "Red team mode engaged" : "Blue team mode engaged", command === "red" ? "text-error" : "text-info"));
        onTeamChange?.(command);
        break;
      case "sudo hire greg":
        append(echo, ...BANNER.map((b, i) => line(b, i === BANNER.length - 1 ? "" : "text-success")));
        window.clearTimeout(hireTimer.current);
        hireTimer.current = window.setTimeout(
          () => navigate("/Home", { replace: true }),
          HIRE_DELAY_MS,
        );
        break;
      default:
        append(line(`"${command}" is not a registered command. Please try again.`, "text-warning"));
    }
  };

  return (
    <div>
      <form className="flex flex-row gap-4" onSubmit={handleSubmit}>
        <input
          name="command"
          value={rawCommand}
          type="text"
          maxLength={MAX_LEN}
          className="input input-bordered w-full min-w-0 max-w-full font-mono focus-visible:outline focus-visible:outline-2 focus-visible:outline-success"
          aria-label="Type y to view the resume, or n to decline. Try help for more commands."
          placeholder="y / n / help"
          autoFocus
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          name="submit"
          type="submit"
          className="btn btn-success btn-square btn-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          aria-label="Submit command"
        >
          <img src={ArrowIcon} alt=""></img>
        </button>
      </form>
    </div>
  );
}
