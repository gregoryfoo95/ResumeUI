import CodeSnippetPage from "./CodeSnippetComponent/CodeSnippetPage";
import CommandPromptField from "./CodeSnippetComponent/CommandPromptField";


export default function HomePage(): JSX.Element {
    

    return  (
        <div className="flex flex-col gap-4">
            <div className="mockup-code h-auto w-full text-left ">
                <CodeSnippetPage/>
                <div className="px-4 py-4">
                    <CommandPromptField/>
                </div>
            </div>

        </div>
    );
};

