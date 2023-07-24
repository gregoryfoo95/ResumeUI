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
          <div className="chat-bubble text-sm md:text-lg bg-primary my-3 text-black font-bold">
            Any <span className="text-red-800">technical projects</span> that you've done?
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
                        <button className="btn join-item bg-secondary text-xs md:text-base text-black border-none hover:bg-yellow-300">
                            <a href="https://github.com/gregoryfoo95/LSS-currency-ts" target="_blank" rel="noopener noreferrer"> 
                                <span className="font-extrabold">RSAF</span> - Currency Tracking for Aircrew
                            </a>
                        </button>
                        <button className="btn join-item bg-cyan-200 text-xs md:text-base text-black border-none hover:bg-yellow-300">
                            <a href="https://github.com/gregoryfoo95/MERN_Pharmacy_App_Better_Life" target="_blank" rel="noopener noreferrer"> 
                            <span className="font-extrabold">BetterLife</span> - Pharmacy Management App
                            </a>
                        </button>
                        <button className="btn join-item bg-secondary text-xs md:text-base text-black border-none hover:bg-yellow-300">
                            <a href="https://github.com/gregoryfoo95/SaveLah" target="_blank" rel="noopener noreferrer"> 
                            <span className="font-extrabold">SaveLah</span> - Budgeting and Expense Tracking App 
                            </a>
                        </button>
                        <button className="btn join-item bg-cyan-200 text-xs md:text-base text-black border-none hover:bg-yellow-300">
                            <a href="https://github.com/gregoryfoo95/Eeveelution" target="_blank" rel="noopener noreferrer"> 
                            <span className="font-extrabold">Eeveelution</span> - 2048-inspired Game
                            </a>
                        </button>
                    </div>
                </div>
        </div>
      )}
    </div>
  );
}

