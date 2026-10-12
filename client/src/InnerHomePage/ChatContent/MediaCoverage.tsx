import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { media } from "../../data/profile";
import type { Media } from "../../data/profile";
import SafeLink from "../../components/SafeLink";
import { isSafeUrl } from "../../components/isSafeUrl";

const IMG_W = 800;
const IMG_H = 533;
const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function youtubeId(src: string): string | null {
  try {
    const u = new URL(src);
    if (u.protocol !== "https:") return null;
    if (u.hostname !== "www.youtube-nocookie.com" && u.hostname !== "www.youtube.com") return null;
    const m = u.pathname.match(/^\/embed\/([\w-]{6,20})$/);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

// Nothing from YouTube loads until the user clicks play.
function VideoPoster({ item }: { item: Media }): JSX.Element {
  const [playing, setPlaying] = useState(false);
  const id = youtubeId(item.src);
  if (!id) return <p className="mt-4 text-sm opacity-70">Video unavailable.</p>;
  return (
    <div className="mt-4 aspect-video w-full overflow-hidden rounded-lg bg-black">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={item.title}
          className="h-full w-full"
          sandbox="allow-scripts allow-same-origin allow-presentation"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className={`group flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-neutral to-black p-4 text-center ${focusRing}`}
          aria-label={`Play video: ${item.title}`}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-black transition-transform group-hover:scale-110 motion-reduce:transition-none">
            <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="text-sm font-semibold">Click to play</span>
          <span className="text-xs opacity-70">Loads from YouTube (privacy-enhanced) only when you press play</span>
        </button>
      )}
    </div>
  );
}

function ImageCard({ item }: { item: Media }): JSX.Element {
  const [failed, setFailed] = useState(false);
  if (failed) return <></>;
  const img = (
    <img
      src={item.src.startsWith("/") ? item.src : `/${item.src}`}
      alt={`${item.title} screenshot`}
      width={IMG_W}
      height={IMG_H}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-auto w-full rounded-lg object-cover transition-opacity duration-200 hover:opacity-80 motion-reduce:transition-none"
    />
  );
  return isSafeUrl(item.url) ? (
    <SafeLink href={item.url} className={`mt-4 block rounded-lg ${focusRing}`} aria-label={`${item.title} (opens in a new tab)`}>
      {img}
    </SafeLink>
  ) : (
    <div className="mt-4">{img}</div>
  );
}

export default function MediaCoverage(): JSX.Element {
  const reduce = useReducedMotion() ?? false;
  const [showContent, setShowContent] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setShowContent(true);
    const timer = setTimeout(() => setLoading(false), reduce ? 0 : 1000);
    return () => clearTimeout(timer);
  }, [reduce]);

  const dur = reduce ? 0 : 0.5;

  return (
    <motion.div
      className="flex min-w-0 flex-col gap-y-4"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.6, ease: "easeOut" }}
    >
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="chat chat-end text-left"
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: dur }}
          >
            <div className="chat-header text-sm font-extrabold md:text-xl">You</div>
            <div className="chat-bubble my-3 bg-primary text-sm font-bold text-black md:text-lg">
              Have you been featured in any <span className="font-semibold text-yellow-300">media coverage</span>?
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {loading && (
          <motion.div className="flex justify-start px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0 }}>
            <span className="loading loading-dots loading-lg self-start" role="status" aria-label="Typing" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!loading && showContent && (
          <motion.div
            className="chat chat-start min-w-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: dur }}
          >
            <div className="chat-header text-sm font-extrabold md:text-xl">Gregory</div>
            <div className="chat-bubble my-3 max-w-full rounded-lg bg-neutral p-3 text-left text-sm shadow-md sm:p-4 md:text-lg">
              <p>Here are some highlights of media coverage and features:</p>
              <ul className="mt-4 space-y-6">
                {media.map((item, index) => (
                  <motion.li
                    key={item.title}
                    className="min-w-0 rounded-lg bg-base-100 p-3 shadow-md sm:p-4"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: dur, delay: reduce ? 0 : index * 0.2 }}
                  >
                    <h3 className="break-words text-base font-bold text-primary sm:text-lg">{item.title}</h3>
                    <p className="mt-2 text-sm opacity-80">{item.description}</p>
                    {item.type === "video" ? <VideoPoster item={item} /> : <ImageCard item={item} />}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
