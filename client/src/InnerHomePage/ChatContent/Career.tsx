import { useState, useEffect } from "react";
import ImperialCollege from "../../assets/icons/ImperialCollege.svg";
import RSAF from "../../assets/icons/RSAF.svg";
export default function Career(): JSX.Element {
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
        <div className="chat chat-end text-left ">
          <div className="chat-header text-sm md:text-xl">You</div>
          <div className="chat-bubble bg-primary my-3 text-black font-bold">
            Share with me your{" "}
            <span className="text-red-800">career</span> journey so
            far!
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
            <div className="card w-full bg-neutral text-left font-bold">
              <figure className="xs:w-36 sm:w-52 md:w-96 self-center">
                <img src={RSAF} alt="RSAF" />
              </figure>
              <div className="flex flex-col">
                <div className="card-body">
                  <h2 className="card-title text-amber-300">
                    Republic of Singapore Air Force (RSAF)
                  </h2>
                  <p className="underline">Roles</p>
                  <ul className="list-decimal px-5">
                    <a className="underline">May 23 - Present</a>
                    <li>
                      Software Engineer @ <span className="font-bold">RSAF Agile innovation Digital (RAiD)</span>
                    </li>
                    <br></br>
                    <a className="underline">Oct 20 - Apr 23</a>
                    <li>
                      {" "}
                      OC (Acting for 6 Mths) & OIC @ <span className="font-bold">Aircraft Weapons Operations Department</span>
                    </li>
                    <br></br>
                    <a className="underline">May 19 - Sep 20</a>
                    <li> Project Officer @ <span className="font-bold">Aerodynamics Department</span></li>
                  </ul>
                  <p className="underline">Awards & Technical Projects</p>
                  <ul className="list-decimal px-5">
                    <li>
                      Exemplary Innovator Award in MINDEF IGNITE Awards 2022
                    </li>
                    <br></br>
                    <li>
                      Equipment Management App (VBA): Dashboard and Userform
                      function for rapid computation of wartime decisions
                    </li>
                    <br></br>
                    <li>
                      {" "}
                      Predictive Maintenance Machine Learning Model applied on
                      Aircraft Data: Data extraction through web-parsing of HTML
                      file, logistic regression and K-Nearest Neighbors for
                      predictive failure forecasting
                    </li>
                    <br></br>
                    <li>
                      {" "}
                      Reliability Management of Aircraft Systems using Power BI
                    </li>
                    <br></br>
                    <li>
                      {" "}
                      Key Management Web-App: Accounting of Physical keys within
                      department, utilized streamlit library and data
                      visualizations within Python
                    </li>
                    <br></br>
                    <li>
                      {" "}
                      Telegram Bot for Work Process Reporting: Rapid access to key
                      data for decision making, developed in Python
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
