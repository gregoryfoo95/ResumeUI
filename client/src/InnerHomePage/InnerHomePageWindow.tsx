import AboutMeText from "./ChatContent/AboutMeText";
import GitHubRepo from "./ChatContent/GitHubRepo";
import PromptWindow from "./ChatContent/PromptWindow";
import {useState} from 'react';
import { ActiveComponent } from "../@types/ActiveComponent";
import ConvoStarter from "./ChatContent/ConvoStarter";
import Education from "./ChatContent/Education";
import Career from "./ChatContent/Career";
import TechStack from "./ChatContent/TechStack";
import ChatNavBar from "./ChatNavBar";
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
        return <Education/>;
      case ActiveComponent.CareerExperience:
        return <Career />;
      case ActiveComponent.TechStack:
        return <TechStack />;
      default:
        return null;
    }
  };

  return (
    <div className="mockup-window bg-base-300 overflow-y">
      <div className="flex flex-col justify-center px-0.5 pb-8 bg-base-200 gap-4 lg:text-lg sm:text-xs">
        <ChatNavBar/>
        <div className="self-center">
            <ConvoStarter/>
          {activeComponents.map((component, index) => (
            <div key={index}>{renderComponent(component)}</div>
          ))}
          <div className="divider bg-slate-700 h-0.5 "></div> 
          <PromptWindow onPromptClick={handlePromptClick} activeComponents={activeComponents} />
        </div>
      </div>
    </div>
  );
}
