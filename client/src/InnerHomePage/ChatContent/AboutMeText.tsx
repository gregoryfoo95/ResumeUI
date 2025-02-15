import { useState, useEffect } from "react";

export default function AboutMeText(): JSX.Element {
  const [isFirstBubbleVisible, setFirstBubbleVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setFirstBubbleVisible(true);

    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <div className="flex flex-col gap-y-4">
      {/* First Bubble - User Prompt */}
      {isFirstBubbleVisible && (
        <div className="chat chat-end text-left">
          <div className="chat-header text-sm md:text-xl font-extrabold">You</div>
          <div className="chat-bubble text-sm md:text-xl bg-primary my-3 text-black font-bold">
            Tell me <span className="text-yellow-300 font-semibold">about yourself</span>, Greg...
          </div>
        </div>
      )}

      {/* Loading Animation */}
      {isLoading && (
        <div className="flex px-4">
          <div className="loading loading-dots loading-lg self-start"></div>
        </div>
      )}

      {/* Response Bubble */}
      {!isLoading && isFirstBubbleVisible && (
        <div className="chat chat-start">
          <div className="chat-header text-sm md:text-xl font-extrabold">Gregory</div>

          <div className="chat-bubble text-sm md:text-lg bg-neutral text-left my-3 leading-relaxed">
            I am a <span className="font-bold">driven</span> and{" "}
            <span className="font-bold">hardworking</span> individual who strives to attain as much
            knowledge as possible and possesses the{" "}
            <span className="font-bold">dedication to lifelong learning</span>. My career journey
            started off as an aerospace engineer, amassing a few years worth of aviation experience,
            armed with <span className="font-bold">people management skillsets</span> and{" "}
            <span className="font-bold">deep technical expertise</span> for a large organization
            (Republic of Singapore Air Force).
          </div>

          <div className="chat-bubble text-sm md:text-lg bg-neutral text-left my-3 leading-relaxed">
            In 2022, I decided to pursue my unearthed passion, which is developing software
            applications and machine learning products for the betterment of our daily lives through
            technology. Boundaries were pushed and here I am, within the Tech arm of RSAF, RAiD.
            Equipped with an{" "}
            <span className="font-bold">arsenal of software skills (e.g., Full-Stack Web-app Development)</span>{" "}
            with a substantial technical repository, I am looking to enhance the current processes
            of the RSAF and{" "}
            <span className="font-bold">aspire to create a marriage between aviation, software development, and machine learning/AI</span>.
          </div>
        </div>
      )}
    </div>
  );
}
