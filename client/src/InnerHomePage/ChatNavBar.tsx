import GregProfilePic from "../assets/icons/GregProfilePic.jpg";
import GitHub from "../assets/icons/GitHub.svg";
import LinkedIn from "../assets/icons/LinkedIn.svg";
export default function ChatNavBar(): JSX.Element {
  return (
    <div className="navbar bg-black">
      <div>
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar btn-lg">
          <div className="w-20 rounded-full">
            <img src={GregProfilePic} />
          </div>
        </label>
      </div>
      <div className="flex-1">
        <div className="flex flex-col">
          <a className="btn btn-ghost normal-case text-xl">Gregory Foo</a>
          <span className="indicator-item text-left ml-4 -mt-2 text-slate-400">
            Online
          </span>
        </div>
      </div>

      <div className="flex-none">
        <div className="dropdown dropdown-end dropdown-hover">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="Websites">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
              </svg>
              <span className="badge badge-md indicator-item">2</span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-4 z-[1] card card-compact dropdown-content w-40 bg-base-100 shadow"
          >
            <div className="card-body text-left">
              <a
                className="font-bold"
                href="https://github.com/gregoryfoo95"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
                <img className="w-20 h-20" src={GitHub} alt="GitHub" />
              </a>
              <a
                className="font-bold"
                href="https://www.linkedin.com/in/gregoryfoo"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
                <img className="w-20 h-20" src={LinkedIn} alt="LinkedIn" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
