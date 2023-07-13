import CodeSnippetPage from "./CodeSnippetComponent/CodeSnippetPage";
import CommandPromptField from "./CodeSnippetComponent/CommandPromptField";
import codeSnippet from "../@classes/codeSnippet";
import { codeBlockProps } from "../@types/codeBlock";
import { useState } from 'react';
export default function HomePage(): JSX.Element {
    
    const [codeBlock, setCodeBlock] = useState<codeBlockProps[]>([
        new codeSnippet('npm i hackGregResume', '$ ', ''),
        new codeSnippet('installing in C://User/Downloads...', '> ', 'text-warning'),
        new codeSnippet('installation complete', '> ', 'text-success'),
        new codeSnippet('Run program? (y/n)', '> ', ''),
      ]);

    return  (
        <div className="flex flex-col gap-4">
            <div className="mockup-code h-auto w-full text-left ">
                <CodeSnippetPage codeBlock={codeBlock} setCodeBlock={setCodeBlock}/>
                <div className="px-4 py-4">
                    <CommandPromptField codeBlock={codeBlock} setCodeBlock={setCodeBlock}/>
                </div>
            </div>

        </div>
    );
};

