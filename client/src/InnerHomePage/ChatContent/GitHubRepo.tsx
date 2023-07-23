import{ useState, useEffect } from 'react';

export default function GitHubRepo(): JSX.Element {
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
          <div className="chat-header text-sm md:text-xl font-extrabold">You</div>
          <div className="chat-bubble bg-primary my-4 text-black">
            Any <span className="font-bold">technical projects</span> that you've done?
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
          <div className="chat-bubble bg-neutral my-4">
                    <div className="join join-vertical">
                        <button className="btn join-item bg-cyan-950 text-xs md:text-base">
                            <a href="https://github.com/gregoryfoo95/LSS-currency-ts" target="_blank" rel="noopener noreferrer"> 
                                RSAF - Currency Tracking for Aircrew
                            </a>
                        </button>
                        <button className="btn join-item bg-sky-700 text-xs md:text-base">
                            <a href="https://github.com/gregoryfoo95/MERN_Pharmacy_App_Better_Life" target="_blank" rel="noopener noreferrer"> 
                                BetterLife - Pharmacy Management App
                            </a>
                        </button>
                        <button className="btn join-item bg-purple-700 text-xs md:text-base">
                            <a href="https://github.com/gregoryfoo95/SaveLah" target="_blank" rel="noopener noreferrer"> 
                            SaveLah - Budgeting and Expense Tracking App 
                            </a>
                        </button>
                        <button className="btn join-item bg-teal-800 text-xs md:text-base">
                            <a href="https://github.com/gregoryfoo95/Eeveelution" target="_blank" rel="noopener noreferrer"> 
                                Eeveelution - 2048-inspired Game
                            </a>
                        </button>
                    </div>
                </div>
        </div>
      )}
    </div>
  );
}

