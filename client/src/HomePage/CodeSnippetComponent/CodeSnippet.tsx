import codeSnippet from "../../@classes/codeSnippet";
export default function CodeSnippetPage(): JSX.Element {
    
    const codeBlock = [   
                            new codeSnippet("npm i hackGregResume", "", "$"),
                            new codeSnippet("installing in C:/User/Downloads...", "text-warning", ">"),
                            new codeSnippet("installation complete", "text-success", ">"),
                            new codeSnippet("Run program? (y/n)", "", ">"),
                        ];
    return  (
        <div>
            {codeBlock.map((line) => {
                return (
                    <pre
                        data-prefix={line.prefix}
                        className={line.color}
                    >
                        <code>
                            {line.code}
                        </code> 
                    </pre>
                )
            })}
        </div>
    );
};

