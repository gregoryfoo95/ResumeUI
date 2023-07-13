import TypeWriter from "./AboutMeTypeWriter";
import AboutMeWindow from  "./AboutMeWindow";
import role from "../@classes/role";

export default function AboutMePage(): JSX.Element {
    const roles = [
        new role('a', 'Full Stack Web Developer'),
        new role('an', "Aerospace Engineer"),
        new role('a', "RAiDer")
      ];

    return  (
        <div className="flex flex-col gap-y-4 ">
            <TypeWriter appendClass="" roles={roles} prefix="" />
            <AboutMeWindow/>
        </div>
    );
};

