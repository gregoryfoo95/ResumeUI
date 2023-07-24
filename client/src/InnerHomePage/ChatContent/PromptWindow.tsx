import { ActiveComponent } from "../../@types/ActiveComponent";

  type PromptWindowProps = {
    onPromptClick: (component: ActiveComponent) => void;
  };

export default function PromptWindow({onPromptClick}: PromptWindowProps): JSX.Element {
    return (
      <div className="flex flex-col gap-y-2 px-10 font-bold ">
        <div
          className="grid w-full h-20 rounded-full px-8 border-4 border-primary bg-base-300 text-white place-content-center cursor-pointer text-xs md:text-lg"
          onClick={() => onPromptClick(ActiveComponent.AboutMe)}
        >
          Tell me more about yourself!
        </div>
        <div
          className="grid w-full h-20 rounded-full px-8 border-4 border-primary bg-base-300 text-white place-content-center cursor-pointer text-xs md:text-lg"
          onClick={() => onPromptClick(ActiveComponent.TechnicalExperience)}
        >
          Could you provide concrete examples of your technical capabilities?
        </div>
        <div
          className="grid w-full h-20 rounded-full px-8 border-4 border-primary bg-base-300 text-white place-content-center cursor-pointer text-xs md:text-lg"
          onClick={() => onPromptClick(ActiveComponent.Study)}
        >
          Tell me more about your education!
        </div>
        <div
          className="grid w-full h-20 rounded-full px-8 border-4 border-primary bg-base-300 text-white place-content-center cursor-pointer text-xs md:text-lg"
          onClick={() => onPromptClick(ActiveComponent.CareerExperience)}
        >
          Expand more on your career experience!
        </div>
        <div
          className="grid w-full h-20 rounded-full px-8 border-4 border-primary bg-base-300 text-white place-content-center cursor-pointer text-xs md:text-lg"
          onClick={() => onPromptClick(ActiveComponent.TechStack)}
        >
          Let me know your tech stacks!
        </div>
      </div>
    );
}
