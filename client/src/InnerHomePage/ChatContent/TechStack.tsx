import { useState, useEffect } from "react";
import Stack from "../../assets/icons/Stack.svg";

export default function TechStack(): JSX.Element {
  const [showFirstBubble, setShowFirstBubble] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setShowFirstBubble(true);
    const secondBubbleTimer = setTimeout(() => {
      setShowLoading(false);
    }, 1000);

    return () => clearTimeout(secondBubbleTimer);
  }, []);

  // Tech stack categories
  const techCategories = [
    {
      title: "Programming Languages",
      color: "badge-secondary",
      items: ["JavaScript", "TypeScript", "Python", "Java", "C++", "MATLAB", "VBA"],
    },
    {
      title: "Frontend & Backend Development",
      color: "badge-warning",
      items: ["HTML", "CSS", "React", "Spring Boot", "Node.js", "Express.js"],
    },
    {
      title: "Databases",
      color: "badge-info",
      items: ["MongoDB", "PostgreSQL", "SQL Server"],
    },
    {
      title: "AI & Machine Learning",
      color: "badge-primary",
      items: ["Machine Learning", "LLMs", "Robotics"],
    },
    {
      title: "Tools & Miscellaneous",
      color: "badge-white",
      items: ["Git", "LuciadLightSpeed", "Docker"],
    },
  ];

  return (
    <div className="flex flex-col gap-y-4">
      {/* User Prompt */}
      {showFirstBubble && (
        <div className="chat chat-end text-left">
          <div className="chat-header text-sm md:text-xl font-extrabold">You</div>
          <div className="chat-bubble text-sm md:text-lg bg-primary my-3 text-black font-bold">
            Show off your <span className="text-yellow-300 font-semibold">tech stack</span>!
          </div>
        </div>
      )}

      {/* Loading Animation */}
      {showLoading && (
        <div className="flex px-4">
          <div className="loading loading-dots loading-lg self-start"></div>
        </div>
      )}

      {/* Tech Stack Display */}
      {!showLoading && showFirstBubble && (
        <div className="chat chat-start">
          <div className="chat-header text-sm md:text-xl font-extrabold">Gregory</div>
          <div className="chat-bubble bg-neutral my-3">
            <div className="card w-full md:w-96 bg-neutral text-left leading-relaxed">
              <figure className="place-self-start mx-8">
                <img className="w-20 h-20 lg:w-35 lg:h-35" src={Stack} alt="RSAF" />
              </figure>
              <div className="card-body px-3 px-0">
                <h2 className="card-title text-amber-300 text-md md:text-xl">Tech Stacks</h2>
                <ul className="list">
                  {techCategories.map((category) => (
                    <div key={category.title} className="flex flex-wrap gap-2 my-2">
                      {category.items.map((tech) => (
                        <li key={tech} className={`badge ${category.color} badge-outline text-xs md:text-sm lg:text-base`}>
                          {tech}
                        </li>
                      ))}
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
