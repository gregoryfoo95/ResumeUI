import { useState, useEffect } from "react";
import Stack from "../../assets/icons/Stack.svg";

export default function TechStack(): JSX.Element {
  const [showFirstBubble, setShowFirstBubble] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(true);

  console.log("showLoading", showLoading);
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
          <div className="chat-header text-sm md:text-xl font-extrabold">You</div>
          <div className="chat-bubble text-sm md:text-lg bg-primary my-3 text-black font-bold">
            Show off your{" "}
            <span className="text-red-800">tech stack</span>!
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
          <div className="chat-bubble bg-neutral my-3">
            <div className="card w-full md:w-96 bg-neutral text-left leading-relaxed">
              <figure className="place-self-start mx-8">
                <img
                  className="w-20 h-20 lg:w-35 lg:h-35"
                  src={Stack}
                  alt="RSAF"
                />
              </figure>
              <div className="card-body px-3 px-0">
                <h2 className="card-title text-amber-300 text-md md:text-xl">
                  Tech Stacks
                </h2>
                <ul className="list">
                  <div className="flex flex-col xs:flex-row">
                    <li>
                      <div className="badge badge-secondary badge-outline my-1 text-xs md:text-sm lg:text-base">
                        Javascript
                      </div>
                    </li>
                    <li>
                      <div className="badge badge-secondary badge-outline my-1 text-xs md:text-sm lg:text-base">
                        Typescript
                      </div>
                    </li>
                    <li>
                      <div className="badge badge-secondary badge-outline my-1 text-xs md:text-sm lg:text-base">
                        Python
                      </div>
                    </li>
                  </div>
                  <div className="flex flex-col xs:flex-row">
                    <li>
                      <div className="badge badge-secondary badge-outline my-1 text-xs md:text-sm lg:text-base">
                        Java
                      </div>
                    </li>
                    <li>
                      <div className="badge badge-secondary badge-outline my-1 text-xs md:text-sm lg:text-base">
                        MATLAB
                      </div>
                    </li>
                    <li>
                      <div className="badge badge-secondary badge-outline my-1 text-xs md:text-sm lg:text-base">
                        VBA
                      </div>
                    </li>
                  </div>
                  <div className="flex flex-col xs:flex-row">
                    <li>
                      <div className="badge badge-warning badge-outline my-1 text-xs md:text-sm lg:text-base">
                        HTML
                      </div>
                    </li>
                    <li>
                      <div className="badge badge-warning badge-outline my-1 text-xs md:text-sm lg:text-base">
                        CSS
                      </div>
                    </li>
                    <li>
                      <div className="badge badge-warning badge-outline my-1 text-xs md:text-sm lg:text-base">
                        React
                      </div>
                    </li>
                  </div>
                  <div className="flex flex-col xs:flex-row">
                    <li>
                      <div className="badge badge-info badge-outline my-1 text-xs md:text-sm lg:text-base">
                        MongoDB
                      </div>
                    </li>
                    <li>
                      <div className="badge badge-info badge-outline my-1 text-xs md:text-sm lg:text-base">
                        PostgreSQL
                      </div>
                    </li>
                    <li>
                      <div className="badge badge-info badge-outline my-1 text-xs md:text-sm lg:text-base">
                        SQLServer
                      </div>
                    </li>
                  </div>
                  <li>
                    <div className="badge badge-primary badge-outline my-1 text-xs md:text-sm lg:text-base">
                      ML
                    </div>
                  </li>
                  <div className="flex flex-col xs:flex-row">
                    <li>
                      <div className="badge badge-white badge-outline my-1 text-xs md:text-sm lg:text-base">
                        Git
                      </div>
                    </li>
                    <li>
                      <div className="badge badge-white badge-outline my-1 text-xs md:text-sm lg:text-base">
                        LuciadLightSpeed
                      </div>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
