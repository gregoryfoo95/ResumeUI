import { useState, useEffect } from 'react';
import codeSnippet from "../../@classes/codeSnippet";
export default function CodeSnippetPage(): JSX.Element {
  const codeBlock = [
    new codeSnippet('npm i hackGregResume', '$ ', ''),
    new codeSnippet('installing in C://User/Downloads...', '> ', 'text-warning'),
    new codeSnippet('installation complete', '> ', 'text-success'),
    new codeSnippet('Run program? (y/n)', '> ', ''),

  ];

  return (
    <div>
      {codeBlock.map((line, index) => {
        if (index === 0) {
          return <TypeWriter key={index} code={line.code} prefix={line.prefix} color={line.color} />;
        } else {
          return (
            <pre key={index} className={line.color}>
              <code>
                {line.prefix}
                {line.code}
              </code>
            </pre>
          );
        }
      })}
    </div>
  );
}

function TypeWriter({ code, prefix, color }: { code: string; prefix: string; color: string }) {
  const [currentText, setCurrentText] = useState('');
  let currentIndex = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      currentIndex++;
      setCurrentText(prevText => {
        const nextText = prevText + code[currentIndex-1];

        if (currentIndex === code.length) {
            clearInterval(interval);
        }
        console.log(currentIndex);

        return nextText;
      });
        
    }, 80);

    return () => clearInterval(interval);
  }, [code]);

  return (
    <pre className={color}>
      <code>
        {prefix}
        {currentText}
      </code>
    </pre>
  );
}
