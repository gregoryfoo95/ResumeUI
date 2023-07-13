import TypeWriter from "./AboutMeTypeWriter";
import role from "../@classes/role";

export default function AboutMePage(): JSX.Element {
    const roles = [
        new role('a', 'Full Stack Web Developer'),
        new role('an', "Aerospace Engineer"),
        new role('a', "RAiDer")
      ];

    return  (
        <div>
            <TypeWriter appendClass="" roles={roles} prefix="" />
        </div>
    );
};

