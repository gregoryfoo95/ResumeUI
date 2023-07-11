
export default function CodeSnippetPage(): JSX.Element {

    const codeSnippet = [   
                            {code: "npm i hackGregResume", color: "", prefix: "$"},
                            {code: "installing...", color: "text-warning", prefix: ">"},
                            {code: "installation complete", color: "text-success", prefix: ">"},
                            {code: "Run program? (y/n)", color: "", prefix: ">"},
                        ];
    return  (
        <div>
            {codeSnippet.map((line) => {
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

