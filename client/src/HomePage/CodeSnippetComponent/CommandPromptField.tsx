import ArrowIcon from '../../assets/icons/ArrowIcon.svg'
import {useState} from 'react';
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { HomePageVisibilityContext } from "../../App";
import { codeBlockProps } from '../../@types/codeBlock';
type Props = {
  codeBlock: codeBlockProps[],
  setCodeBlock: React.Dispatch<React.SetStateAction<codeBlockProps[]>>
}

export default function CommandPromptField({codeBlock, setCodeBlock}: Props): JSX.Element {

    const navigate = useNavigate();

    const setHomePageVisibility = useContext<React.Dispatch<
        React.SetStateAction<boolean>
    > | null>(HomePageVisibilityContext);

    const [command, setCommand] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setCommand(value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (command === "y" && setHomePageVisibility) {
            setHomePageVisibility(false);
            navigate("/Home", { replace: true })
        } else if (command === "n") {
            setCodeBlock((prevCodeBlock) => 
            [
                ...prevCodeBlock, 
                { 
                    code: `Your rejection is rejected. Please key in y.`, 
                    prefix: '> ', 
                    color: 'text-warning' 
                }
            ]);
            setCommand("");
        } else {
            setCodeBlock((prevCodeBlock) => 
            [
                ...prevCodeBlock, 
                { 
                    code: `"${command}" is not a registered command. Please try again.`, 
                    prefix: '> ', 
                    color: 'text-warning' 
                }
            ]);
            setCommand("");
        }

    };
    
    return  (
        <div>
            <form className="flex flex-row gap-4" onSubmit={handleSubmit}>
                <input 
                    name="command" 
                    value={command}
                    type="text" 
                    className="input input-bordered w-full max-w-full font-sans" 
                    onChange={handleInputChange}
                />
                <button
                    name="submit"
                    type="submit"
                    className="btn btn-secondary btn-square btn-md"
                >
                    <img src={ArrowIcon} alt="ArrowIcon"></img>
                </button>
            </form>
        </div>
    );
};

