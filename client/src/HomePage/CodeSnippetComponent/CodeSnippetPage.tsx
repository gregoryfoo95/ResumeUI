import { useState, useEffect } from 'react';
import codeSnippet from "../../@classes/codeSnippet";
export default function CodeSnippetPage(): JSX.Element {
  const codeBlock = [
    new codeSnippet('npm i hackGregResume', '$ ', ''),
    new codeSnippet('installing in C://User/Downloads...', '> ', 'text-warning'),
    new codeSnippet('installation complete', '> ', 'text-success'),
    new codeSnippet('Run program? (y/n)', '> ', ''),
  ];

  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (currentLine < codeBlock.length) {
      const timeout = setTimeout(() => {
        setCurrentLine(prevLine => prevLine + 1);
      }, codeBlock[currentLine].code.length * 50);
  
      return () => clearTimeout(timeout);
    }
  }, [currentLine]);

  return (
    <div>
      {codeBlock.map((line, index) => (
        <pre key={index}>
          {index <= currentLine && (
            <TypeWriter
              code={line.code}
              prefix={line.prefix}
              color={line.color}
            />
          )}
        </pre>
      ))}
    </div>
  );
}


function TypeWriter(
    { 
      code, 
      prefix, 
      color, 
    }: { 
      code: string; 
      prefix: string; 
      color: string; 
    }
  ) {
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
        return nextText;
      });
        
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <pre className={color}>
      <code>
        {prefix}
        {currentText}
      </code>
    </pre>
  );
}
