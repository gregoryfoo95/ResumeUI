import AboutMeButton from "../AboutMePage/AboutMeButton";
import IPhone from "../assets/icons/IPhone.svg"
import { useContext } from "react";
import { HomePageVisibilityContext } from "../../src/App";

export default function HomePage(): JSX.Element {

    const setHomePageVisibility = useContext<React.Dispatch<
    React.SetStateAction<boolean>
  > | null>(HomePageVisibilityContext);

    const handleClick = async(event: React.MouseEvent) => {
        event.preventDefault();
        if (setHomePageVisibility) {
            setHomePageVisibility(false);
        }
    };

    return (
        <div className="flex flex-row justify-center">
        <div className="artboard phone-4 bg-transparent rounded-lg relative">
          <img src={IPhone} alt="iPhone" />
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <AboutMeButton handleClick={handleClick} />
          </div>
        </div>
      </div>
    );
};

