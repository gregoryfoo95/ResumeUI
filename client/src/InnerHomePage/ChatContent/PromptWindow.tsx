import { ActiveComponent } from "../../@types/ActiveComponent";

  type PromptWindowProps = {
    onPromptClick: (component: ActiveComponent) => void;
    activeComponents: ActiveComponent[];
  };

export default function PromptWindow({onPromptClick, activeComponents}: PromptWindowProps): JSX.Element {
    return (
      <div className="flex flex-col gap-y-2 px-10 font-bold text-xs sm:text-sm md:text-lg ">
        {!activeComponents.includes(ActiveComponent.AboutMe) && (
          <div
            className="grid w-full h-20 rounded-full px-4 border-4 border-primary bg-base-300 text-white place-content-center cursor-pointer text-xs md:text-lg"
            onClick={() => onPromptClick(ActiveComponent.AboutMe)}
            id="about-me-section"
          >
            Tell me more about yourself!
          </div>
        )}
        
        {!activeComponents.includes(ActiveComponent.TechnicalExperience) && (
          <div
            className="grid w-full h-20 rounded-full px-4 border-4 border-primary bg-base-300 text-white place-content-center cursor-pointer text-xs md:text-lg"
            onClick={() => onPromptClick(ActiveComponent.TechnicalExperience)}
            id="technical-experience-section"
          >
            Could you provide concrete examples of your technical capabilities?
          </div>
        )}

        {!activeComponents.includes(ActiveComponent.Study) && (
          <div
            className="grid w-full h-20 rounded-full px-4 border-4 border-primary bg-base-300 text-white place-content-center cursor-pointer text-xs md:text-lg"
            onClick={() => onPromptClick(ActiveComponent.Study)}
            id="study-section"
          >
            Tell me more about your education!
          </div>
        )}

        {!activeComponents.includes(ActiveComponent.CareerExperience) && (
        <div
          className="grid w-full h-20 rounded-full px-4 border-4 border-primary bg-base-300 text-white place-content-center cursor-pointer text-xs md:text-lg"
          onClick={() => onPromptClick(ActiveComponent.CareerExperience)}
          id="career-experience-section"
        >
          Expand more on your career experience!
        </div>
        )}

        {!activeComponents.includes(ActiveComponent.TechStack) && (
        <div
          className="grid w-full h-20 rounded-full px-4 border-4 border-primary bg-base-300 text-white place-content-center cursor-pointer text-xs md:text-lg"
          onClick={() => onPromptClick(ActiveComponent.TechStack)}
          id="tech-stack-section"
        >
          Let me know your tech stacks!
        </div>
        )}

      </div>
    );
}
