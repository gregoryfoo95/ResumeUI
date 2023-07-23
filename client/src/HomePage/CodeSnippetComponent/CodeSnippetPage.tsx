import { useState, useEffect } from 'react';
import { codeBlockProps } from '../../@types/codeBlock';
type Props = {
  codeBlock: codeBlockProps[],
  setCodeBlock: React.Dispatch<React.SetStateAction<codeBlockProps[]>>
}
export default function CodeSnippetPage({codeBlock, setCodeBlock}: Props): JSX.Element {
  

  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (currentLine < codeBlock.length) {
      const timeout = setTimeout(() => {
        setCurrentLine(prevLine => prevLine + 1);
      }, 
      (currentLine === 0) 
      ? codeBlock[currentLine].code.length * 40 
      : codeBlock[currentLine].code.length * 15);
  
      return () => clearTimeout(timeout);
    }
  }, [currentLine, codeBlock]);

  return (
    <div>
      {codeBlock.map((line, index) => (
        <pre key={index}>
          {index <= currentLine && (
            <TypeWriter
              code={line.code}
              prefix={line.prefix}
              color={line.color}
              shouldType={line.shouldType}
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
      shouldType
    } : codeBlockProps
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
        
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <pre className={color}>
      <code>
        {prefix}
        {shouldType ? currentText : code}
      </code>
    </pre>
  );
}
