import{ useState, useEffect } from 'react';
import ImperialCollege from "../../assets/icons/ImperialCollege.svg";
import NTU from "../../assets/icons/NTU.svg";
export default function Education(): JSX.Element {
  const [showFirstBubble, setShowFirstBubble] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(true);

  console.log("showLoading", showLoading)
  useEffect(() => {
      setShowFirstBubble(true);

    const secondBubbleTimer = setTimeout(() => {
      setShowLoading(false);
    }, 1000);

    return () => {
      clearTimeout(secondBubbleTimer);
    };

  }, []);

  return (
    <div className="flex flex-col gap-y-4">
      {showFirstBubble && (
        <div className="chat chat-end text-left">
          <div className="chat-header">You</div>
          <div className="chat-bubble bg-info">
            Could you tell me more about your{" "}
            <span className="font-bold text-neutral">education</span>?
          </div>
        </div>
      )}

      {showLoading && (
        <div className="flex">
          <div className="loading loading-dots loading-lg self-start"></div>
        </div>
      )}

      {!showLoading && showFirstBubble && (
        <div className="chat chat-start">
          <div className="chat-header">Gregory</div>
          <div className="chat-bubble bg-neutral my-4">
            <div className="card w-full md:w-96 bg-slate-400 shadow-xl text-left">
              <figure>
                <img src={ImperialCollege} alt="ICL" />
              </figure>
              <div className="card-body text-black font-bold">
                <h2 className="card-title text-amber-300">
                  MSc Advanced Aeronautical Engineering - Imperial College
                  London
                </h2>
                <p className="underline">Grade: Distinction</p>
                <p className="underline">Awards and Achievements:</p>
                <ul className="list-decimal px-5">
                  <li>
                    {" "}
                    Airbus Prize for Best Individual MSc Project across 3 MSc
                    Degrees
                  </li>
                  <br></br>
                  <li>
                    {" "}
                    Airbus Prize for Best Student in MSc Advanced Aeronautical
                    Engineering
                  </li>
                </ul>
                <p className="underline">Thesis:</p>
                <p>
                  Using Data Driven Algorithms to extract Reduced Order Models
                  (ROMs) from Turbulent Channel Flow (Extended Dynamic Mode
                  Decomposition - Discrete Linear-Quadratic state-feedback
                  Regulator){" "}
                </p>
              </div>
            </div>
          </div>

          <div className="chat-bubble bg-neutral my-4">
            <div className="card w-full md:w-96 bg-slate-400 shadow-xl text-left">
              <figure>
                <img src={NTU} alt="NTU" />
              </figure>
              <div className="card-body text-black font-bold">
                <h2 className="card-title text-amber-300">
                  BEng Aerospace Engineering, Nanyang Technological University
                </h2>
                <p className="underline">Grade: First Class Honours</p>
                <p className="underline">Thesis:</p>
                <p>
                  CFD Simulation of Helicopter with Underslung Load (Presented
                  in Singapore Aerospace Technology and Engineering Conference
                  (SATEC) 2020)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

