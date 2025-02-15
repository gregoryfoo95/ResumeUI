import { useState, useEffect } from 'react';

interface Project {
  name: string;
  description: string;
  bgColor: string;
}

const projects: Project[] = [
  {
    name: 'ASTRO',
    description: "Currency Tracking for Aircrew",
    bgColor: 'bg-cyan-200',
  },
  {
    name: 'SAGE',
    description: 'ChatGPT Web App for Training Assistance',
    bgColor: 'bg-secondary',
  },
  {
    name: 'SAFEGUARD',
    description: 'PoC Functional Prototype CCIS',
    bgColor: 'bg-cyan-200',
  },
  {
    name: 'Command & Control Information System (CCIS)',
    description: 'System for Command and Control Operations',
    bgColor: 'bg-secondary',
  },
  {
    name: 'Sentinel',
    description: 'Threat Reporting for Multi-Domain Operations',
    bgColor: 'bg-cyan-200',
  },
];

const linkedinURL = "https://www.linkedin.com/in/gregoryfoo/";

export default function GitHubRepo(): JSX.Element {
  const [showFirstBubble, setShowFirstBubble] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setShowFirstBubble(true);
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-y-4">
      {showFirstBubble && (
        <div className="chat chat-end text-left">
          <div className="chat-header text-sm md:text-xl font-extrabold">You</div>
          <div className="chat-bubble text-sm md:text-lg bg-primary my-3 text-black font-bold">
            Any <span className="text-yellow-300 font-semibold">technical projects</span> that you've done?
          </div>
        </div>
      )}

      {showLoading && (
        <div className="flex px-4">
          <div className="loading loading-dots loading-lg self-start"></div>
        </div>
      )}

      {!showLoading && showFirstBubble && (
        <div className="chat chat-start">
          <div className="chat-header text-sm md:text-xl font-extrabold">Gregory</div>
          <div className="chat-bubble text-sm md:text-lg bg-neutral my-3">
            <div className="join join-vertical">
              {projects.map((project) => (
                <button
                  key={project.name}
                  className={`btn join-item ${project.bgColor} text-xs md:text-base text-black border-none hover:bg-yellow-300`}
                  onClick={() => window.open(linkedinURL, "_blank")}
                >
                  <a target="_blank" rel="noopener noreferrer">
                    <span className="font-extrabold">{project.name}</span> - {project.description}
                  </a>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
