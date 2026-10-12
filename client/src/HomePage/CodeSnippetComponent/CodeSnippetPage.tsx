import { useEffect, useState } from "react";
import { codeBlockProps } from "../../@types/codeBlock";

type Props = {
  codeBlock: codeBlockProps[];
  setCodeBlock?: React.Dispatch<React.SetStateAction<codeBlockProps[]>>;
};

// Renders the interactive part of the shell: the y/n prompt and every command's output.
export default function CodeSnippetPage({ codeBlock }: Props): JSX.Element {
  return (
    <div>
      {codeBlock.map((line, index) => (
        <div key={index}>
          <TypeWriter
            code={line.code}
            prefix={line.prefix}
            color={line.color}
            shouldType={line.shouldType}
          />
        </div>
      ))}
    </div>
  );
}

function TypeWriter({ code, prefix, color, shouldType }: codeBlockProps) {
  const [count, setCount] = useState(shouldType ? 0 : code.length);

  useEffect(() => {
    if (!shouldType) return;
    const interval = setInterval(() => {
      setCount((c) => {
        if (c >= code.length) {
          clearInterval(interval);
          return c;
        }
        return c + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [code, shouldType]);

  // Hanging layout: the prompt marker gets its own column, so wrapped lines
  // stay inside the terminal instead of relying on a negative text-indent.
  return (
    <div className={`flex gap-2 font-mono ${color}`}>
      <span aria-hidden="true" className="w-[2ch] flex-none select-none">
        {prefix.trim()}
      </span>
      <span className="min-w-0 whitespace-pre-wrap break-words">{code.slice(0, count)}</span>
    </div>
  );
}
