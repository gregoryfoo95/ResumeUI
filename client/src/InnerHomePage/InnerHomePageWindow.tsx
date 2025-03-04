import AboutMeText from "./ChatContent/AboutMeText";
import GitHubRepo from "./ChatContent/GitHubRepo";
import PromptWindow from "./ChatContent/PromptWindow";
import { useState } from "react";
import { ActiveComponent } from "../@types/ActiveComponent";
import ConvoStarter from "./ChatContent/ConvoStarter";
import Education from "./ChatContent/Education";
import Career from "./ChatContent/Career";
import TechStack from "./ChatContent/TechStack";
import ChatNavBar from "./ChatNavBar";
import ScrollToTop from "./ScrollToTop";
import RefreshChatWindow from "./RefreshChatWindow";
import MediaCoverage from "./ChatContent/MediaCoverage";

export default function InnerHomePageWindow(): JSX.Element {
  const [activeComponents, setActiveComponents] = useState<ActiveComponent[]>(
    [],
  );

  const handlePromptClick = (component: ActiveComponent) => {
    setActiveComponents((prevActiveComponents) => [
      ...prevActiveComponents,
      component,
    ]);
    scrollToSection(component);
  };

  const handleRefresh = () => {
    setActiveComponents([]);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (component: ActiveComponent) => {
    const targetSection = document.getElementById(getSectionId(component));
    if (targetSection) {
      const scrollPosition = targetSection.offsetTop;
      window.scrollTo({ top: scrollPosition, behavior: "smooth" });
    }
  };

  const getSectionId = (component: ActiveComponent): string => {
    switch (component) {
      case ActiveComponent.AboutMe:
        return "aboutMe";
      case ActiveComponent.TechnicalExperience:
        return "technicalExperience";
      case ActiveComponent.Study:
        return "study";
      case ActiveComponent.CareerExperience:
        return "careerExperience";
      case ActiveComponent.TechStack:
        return "techStack";
      case ActiveComponent.MediaCoverage:
        return "mediaCoverage";
      default:
        return "";
    }
  };

  const renderComponent = (component: ActiveComponent) => {
    switch (component) {
      case ActiveComponent.AboutMe:
        return <AboutMeText />;
      case ActiveComponent.TechnicalExperience:
        return <GitHubRepo />;
      case ActiveComponent.Study:
        return <Education />;
      case ActiveComponent.CareerExperience:
        return <Career />;
      case ActiveComponent.TechStack:
        return <TechStack />;
      case ActiveComponent.MediaCoverage:
        return <MediaCoverage />;
      default:
        return null;
    }
  };

  return (
    <div className="mockup-window bg-base-300 overflow-y">
      <div className="flex flex-col justify-center px-0.5 pb-8 bg-base-200 gap-4 lg:text-lg sm:text-xs">
        <ChatNavBar />
        <div className="self-center ">
          <ConvoStarter />
          {activeComponents.map((component, index) => (
            <div key={index}>{renderComponent(component)}</div>
          ))}
          <RefreshChatWindow handleRefresh={handleRefresh} />
          <div className="divider bg-slate-700 h-0.5"></div>
          <PromptWindow
            onPromptClick={handlePromptClick}
            activeComponents={activeComponents}
          />
          <div className="fixed bottom-4 right-4 left-4">
            <ScrollToTop handleScrollToTop={handleScrollToTop} />
          </div>
          <div className="text-center text-gray-500 lg:text-xs sm:text-xs mt-8 border-t pt-4">
            &copy; {new Date().getFullYear()} Gregory Foo All Rights Reserved. Unauthorized use, distribution, or reproduction of this content is strictly prohibited unless permission is sought.
          </div>
        </div>
      </div>
    </div>
  );
}
