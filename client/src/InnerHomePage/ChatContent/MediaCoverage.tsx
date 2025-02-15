import { useState, useEffect } from "react";

interface MediaItem {
  title: string;
  description: string;
  mediaType: "video" | "image";
  mediaSrc: string;
  mediaUrl?: string; // New field for clickable image links
}

const mediaCoverage: MediaItem[] = [
  {
    title: "Exercise Wallaby 2024 - Youtube",
    description:
      "I had the privilege of being interviewed by the RSAF media team regarding my work in rapid software development within the RSAF. It was an insightful experience sharing my thoughts on the importance of agility in the defense industry.",
    mediaType: "video",
    mediaSrc: "https://www.youtube.com/embed/v-i3PYCUTPo", // Fixed YouTube embed format
  },
  {
    title: "Exercise Wallaby 2024 - LinkedIn",
    description:
      "I had the privilege of being interviewed by the RSAF media team regarding my work in rapid software development within the RSAF. It was an insightful experience sharing my thoughts on the importance of agility in the defense industry.",
    mediaType: "image",
    mediaSrc: "images/xwb.jpeg",
    mediaUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7260626815856058368/", 
  },
  {
    title: "CCIS Showcase on Straits Times",
    description: "Brief introduction to CCIS development in the RSAF.",
    mediaType: "image",
    mediaSrc: "images/ccis.jpeg", 
    mediaUrl: "https://www.straitstimes.com/singapore/ai-data-analytics-improve-decision-making-process-but-human-touch-still-key-at-saf-exercise", 
  },
];

export default function MediaCoverage(): JSX.Element {
  const [showContent, setShowContent] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setShowContent(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-y-6 p-6 max-w-4xl mx-auto">
      {/* User Prompt */}
      {showContent && (
        <div className="chat chat-end text-left">
          <div className="chat-header text-sm md:text-xl font-extrabold">You</div>
          <div className="chat-bubble text-sm md:text-lg bg-primary my-3 text-black font-bold">
            Have you been featured in any <span className="text-yellow-300 font-semibold">media coverage</span>?
          </div>
        </div>
      )}

      {/* Loading Animation */}
      {loading && (
        <div className="flex justify-start px-6">
          <div className="loading loading-dots loading-lg self-start animate-bounce"></div>
        </div>
      )}

      {/* Media Coverage List */}
      {!loading && showContent && (
        <div className="chat chat-start">
          <div className="chat-header text-sm md:text-lg font-bold text-gray-700">Gregory</div>
          <div className="chat-bubble text-sm md:text-lg bg-neutral text-left my-3 p-4 rounded-lg shadow-md">
            <p>
              I have had the privilege of being featured in various media outlets, sharing my journey in software
              engineering, and defense technology innovations. Here are some highlights:
            </p>

            <div className="mt-4 space-y-6">
              {mediaCoverage.map((media, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-4 shadow-md">
                  <h3 className="text-lg font-bold text-indigo-600">{media.title}</h3>
                  <p className="text-sm text-gray-700 mt-2">{media.description}</p>

                  {/* Media Type Handling */}
                  {media.mediaType === "image" ? (
                    <a
                      href={media.mediaUrl || "#"}
                      target={media.mediaUrl ? "_blank" : ""}
                      rel="noopener noreferrer"
                      className="block mt-4"
                    >
                      <img
                        src={media.mediaSrc}
                        alt={media.title}
                        className="w-full h-56 object-cover rounded-lg hover:opacity-80 transition-opacity duration-200"
                        onError={(e) => (e.currentTarget.style.display = "none")} // Hide broken images
                      />
                    </a>
                  ) : (
                    <iframe
                      src={media.mediaSrc}
                      title={media.title}
                      className="w-full h-56 rounded-lg mt-4"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
