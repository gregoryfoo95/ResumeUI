import ArrowIcon from '../assets/icons/ArrowIcon.svg'
import {useState} from 'react';
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { HomePageVisibilityContext } from "../../src/App";

export default function CommandPromptField(): JSX.Element {

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
            navigate("/AboutMe", { replace: true })
        } else {
            console.log("error");
        }

    };
    
    console.log("command: ", command);
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
                    className="btn btn-secondary btn-square"
                >
                    <img src={ArrowIcon} alt="ArrowIcon"></img>
                </button>
            </form>
        </div>
    );
};

