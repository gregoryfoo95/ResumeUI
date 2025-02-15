import { useState, useEffect } from "react";
import ImperialCollege from "../../assets/icons/ImperialCollege.svg";
import NTU from "../../assets/icons/NTU.svg";

interface EducationItem {
  institution: string;
  degree: string;
  grade: string;
  awards?: string[];
  thesis: string;
  imageSrc: string;
}

const educationHistory: EducationItem[] = [
  {
    institution: "Imperial College London",
    degree: "MSc Advanced Aeronautical Engineering",
    grade: "Distinction",
    awards: [
      "Airbus Prize for Best Individual MSc Project across 3 MSc Degrees",
      "Airbus Prize for Best Student in MSc Advanced Aeronautical Engineering",
    ],
    thesis:
      "Using Data Driven Algorithms to extract Reduced Order Models (ROMs) from Turbulent Channel Flow (Extended Dynamic Mode Decomposition - Discrete Linear-Quadratic state-feedback Regulator).",
    imageSrc: ImperialCollege,
  },
  {
    institution: "Nanyang Technological University",
    degree: "BEng Aerospace Engineering",
    grade: "First Class Honours",
    thesis:
      "CFD Simulation of Helicopter with Underslung Load (Presented in Singapore Aerospace Technology and Engineering Conference (SATEC) 2020).",
    imageSrc: NTU,
  },
];

export default function Education(): JSX.Element {
  const [showFirstBubble, setShowFirstBubble] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setShowFirstBubble(true);
    const timer = setTimeout(() => setShowLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-y-6 p-6 max-w-2xl mx-auto">
      {/* User Prompt */}
      {showFirstBubble && (
        <div className="chat chat-end text-left">
          <div className="chat-header text-sm md:text-lg font-extrabold">You</div>
          <div className="chat-bubble text-sm md:text-lg bg-primary my-3 text-black font-bold">
            Could you tell me more about your <span className="text-yellow-300 font-semibold">education</span>?
          </div>
        </div>
      )}

      {/* Loading Animation */}
      {showLoading && (
        <div className="flex justify-start px-6">
          <div className="loading loading-dots loading-lg self-start animate-bounce"></div>
        </div>
      )}

      {/* Education List */}
      {!showLoading && showFirstBubble && (
        <div className="chat chat-start">
          <div className="chat-header text-sm md:text-lg font-extrabold">Gregory</div>

          {educationHistory.map((edu, index) => (
            <div key={index} className="chat-bubble text-sm md:text-lg bg-neutral my-4 p-4 rounded-lg shadow-md">
              <div className="card w-full bg-neutral text-left font-bold">
                <figure className="w-36 sm:w-60 md:w-96 self-center bg-white">
                  <img src={edu.imageSrc} alt={edu.institution} />
                </figure>
                <div className="card-body text-white font-bold leading-relaxed px-0">
                  <h2 className="card-title text-amber-300 text-sm lg:text-2xl">{edu.degree}</h2>
                  <p className="underline">Institution: {edu.institution}</p>
                  <p className="underline">Grade: {edu.grade}</p>

                  {/* Awards Section */}
                  {edu.awards && (
                    <>
                      <p className="underline">Awards and Achievements:</p>
                      <ul className="list-decimal px-5">
                        {edu.awards.map((award, i) => (
                          <li key={i}>{award}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  {/* Thesis Section */}
                  <p className="underline">Thesis:</p>
                  <p>{edu.thesis}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
