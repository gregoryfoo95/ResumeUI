import { Link } from "react-router-dom";
import SummaryMario from "../assets/icons/SummaryMario.svg";

export default function AboutMeButton({ handleClick }: any): JSX.Element {
    return (
      <button onClick={handleClick} className="btn btn-square btn-md shadow-lg bg-transparent border-transparent">
        <Link to="/AboutMe">
          <img src={SummaryMario} alt="AboutMe" />
          About Me
        </Link>
      </button>
    );
}
