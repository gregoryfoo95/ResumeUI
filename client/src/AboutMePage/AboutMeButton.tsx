import { Link } from "react-router-dom";
import AboutMe from "../assets/icons/Aboutme.svg";

export default function AboutMeButton({ handleClick }: any): JSX.Element {
    return (
      <button onClick={handleClick} className="btn btn-square btn-md shadow-lg bg-transparent border-transparent">
        <Link to="/AboutMe">
          <img src={AboutMe} alt="AboutMe" />
        </Link>
      </button>
    );
}
