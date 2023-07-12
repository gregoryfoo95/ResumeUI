import CodeSnippetPage from "./CodeSnippetComponent/CodeSnippetPage";
import CommandPromptField from "./CodeSnippetComponent/CommandPromptField";
import HomeTypeWriter from "./HomeTypeWriter";

export default function HomePage(): JSX.Element {
    const roles = [
        {
            prep: 'a',
            suffix: 'Full Stack Web Developer'
        },
        {
            prep: 'an',
            suffix: 'Aerospace Engineer'
        },
        {
            prep: 'a',
            suffix: "RAiDer"
        }
      ];

    return  (
        <div className="flex flex-col gap-4">
            <HomeTypeWriter appendClass="" roles={roles} prefix="" />
            <div className="mockup-code h-auto w-full text-left ">
                <CodeSnippetPage/>
                <div className="px-4 py-4">
                    <CommandPromptField/>
                </div>
            </div>

        </div>
    );
};

