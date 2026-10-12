import GregProfilePic from "../assets/icons/GregProfilePic.jpg";
import GitHub from "../assets/icons/GitHub.svg";
import LinkedIn from "../assets/icons/LinkedIn.svg";
import SafeLink from "../components/SafeLink";
import { profile } from "../data/profile";
import { printResume } from "../components/printResume";

const linkClass =
  "flex items-center gap-3 rounded-md p-1 font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export default function ChatNavBar(): JSX.Element {
  return (
    <header className="navbar min-w-0 flex-wrap items-center gap-4 border-b border-base-content/10 bg-black/80 px-4 py-4 sm:gap-6 sm:px-10">
      <div className="avatar shrink-0">
        <div className="w-14 rounded-full ring ring-success ring-offset-2 ring-offset-black sm:w-16">
          <img
            src={GregProfilePic}
            alt={`Portrait of ${profile.name}`}
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex min-w-0 flex-[1_1_14rem] flex-col gap-2 text-left">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h1 className="text-lg font-extrabold sm:text-2xl">{profile.name}</h1>
          <span lang="zh" className="text-base tracking-[0.12em] text-amber-300 sm:text-xl">
            {profile.nameZh}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-2 rounded-full border border-success/50 bg-success/10 px-3 py-1 text-success">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success shadow-[0_0_8px] shadow-success" />
            </span>
            Online
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-base-content/20 bg-base-300 px-3 py-1">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {profile.location}
          </span>
          <span className="inline-flex max-w-full items-center rounded-2xl border border-base-content/20 bg-base-300 px-3 py-1">
            {profile.currentRole} @ RAiD
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={printResume}
        className="btn btn-outline btn-primary btn-sm min-h-[44px] flex-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300"
        aria-label="Download resume as PDF"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
        </svg>
        PDF
      </button>

      <nav aria-label="Profile links" className="flex-none">
        <div className="dropdown dropdown-end">
          <button
            type="button"
            className="btn btn-ghost btn-circle focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            aria-label="Open profile links"
            aria-haspopup="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-7 w-7"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
          </button>
          <div className="dropdown-content card card-compact z-[1] mt-2 w-44 bg-base-100 shadow">
            <div className="card-body text-left">
              <SafeLink href={profile.links.github} className={linkClass} aria-label="Gregory Foo on GitHub (opens in a new tab)">
                <img className="h-8 w-8" src={GitHub} alt="" width={32} height={32} />
                GitHub
              </SafeLink>
              <SafeLink href={profile.links.linkedin} className={linkClass} aria-label="Gregory Foo on LinkedIn (opens in a new tab)">
                <img className="h-8 w-8" src={LinkedIn} alt="" width={32} height={32} />
                LinkedIn
              </SafeLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
