import CodeSnippetPage from "../CodeSnippetComponent/CodeSnippet";
import CommandPromptField from "../CodeSnippetComponent/CommandPromptField";


export default function HomePage(): JSX.Element {

    return  (
        <div className="flex flex-col">
            <div className="mockup-code h-auto w-full text-left relative">
                <CodeSnippetPage/>
                <div className="px-4 py-4">
                    <CommandPromptField/>
                </div>
            </div>
        </div>
    );
};

