import AboutMeText from "./ChatContent/AboutMeText";
import GitHubRepo from "./ChatContent/GitHubRepo";
import PromptWindow from "./ChatContent/PromptWindow";
import {useState} from 'react';
import { ActiveComponent } from "../@types/ActiveComponent";
import ConvoStarter from "./ChatContent/convoStarter";

export default function InnerHomePageWindow(): JSX.Element {
    const [activeComponents, setActiveComponents] = useState<ActiveComponent[]>([]);

  const handlePromptClick = (component: ActiveComponent) => {
    setActiveComponents((prevActiveComponents) => [...prevActiveComponents, component]);
  };

  const renderComponent = (component: ActiveComponent) => {
    switch (component) {
      case ActiveComponent.AboutMe:
        return <AboutMeText />;
      case ActiveComponent.TechnicalExperience:
        return <GitHubRepo />;
      case ActiveComponent.Study:
        return <></>;
      case ActiveComponent.CareerExperience:
        return <></>;
      default:
        return null;
    }
  };

  return (
    <div className="mockup-window bg-base-300 overflow-y">
      <div className="flex flex-col justify-center px-4 py-16 bg-base-200 gap-4 lg:text-lg sm:text-xs">
        <div className="self-center">
            <ConvoStarter/>
          {activeComponents.map((component, index) => (
            <div key={index}>{renderComponent(component)}</div>
          ))}
          <br></br>
          <div className="divider"></div> 
          <PromptWindow onPromptClick={handlePromptClick} />
        </div>
      </div>
    </div>
  );
};
