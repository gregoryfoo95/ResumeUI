import{ useState, useEffect } from 'react';

export default function AboutMeText(): JSX.Element {
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
            Tell me <span className="font-bold text-neutral">about yourself</span>, Greg...
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
          <div className="chat-header">Gregory</div>
          <div className="chat-bubble bg-neutral text-left">
            I am a driven and hardworking individual who strives to attain as much knowledge as possible and possesses the dedication to lifelong learning. My career journey started off as an aerospace engineer, amassing a few years worth of aviation experience, armed with people management skillsets and deep technical expertise for a large organization (Republic of Singapore Air Force). 
                In 2022, I decided to pursue my unearthed passion, which is developing software applications and machine learning products for the betterment of our daily lives through technology. Boundaries were pushed and here I am, within the Tech arm of RSAF, RAiD. Equipped with an arsenal of software skills (e.g Full-Stack Development using Javascript) with a substantial technical repository, I am looking to enhance the current processes of the RSAF and aspire to create a marriage between aviation, software development and machine learning/AI.
          </div>
        </div>
      )}
    </div>
  );
}
