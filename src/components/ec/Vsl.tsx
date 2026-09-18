"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The VSL player.
 *
 * Behaviour is the CRO pattern: the video is already running, muted, when the
 * visitor arrives, so the page never shows a cold play button. One overlay
 * invites the unmute; clicking it turns sound on *without* restarting, because
 * the point of the pattern is that the visitor feels mid-watch, not pre-watch.
 *
 * The bar under the video is a chapter bar, not a scrubber. It shows how far
 * through the pitch the visitor is and how much of it is left, split by
 * chapter. It is deliberately not clickable: a VSL that can be skipped through
 * is a VSL nobody watches.
 */

/** Fill these in when the cut is ready. Empty `src` renders the placeholder. */
export const VSL_SOURCE = {
  src: "",
  poster: "",
};

export interface Chapter {
  /** Seconds from the start of the video. */
  start: number;
  label: string;
}

/**
 * Placeholder chapters. `start` drives both the label and the segment width,
 * so the bar always matches the real cut once the timings are replaced.
 */
export const VSL_CHAPTERS: Chapter[] = [
  { start: 0, label: "Why your ads stop scaling" },
  { start: 180, label: "What a personalized funnel is" },
  { start: 420, label: "The system, end to end" },
  { start: 900, label: "What it costs, and what happens next" },
];

/** Total runtime in seconds, used until the real video reports its duration. */
const ASSUMED_DURATION = 1080;

function SpeakerIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" />
      <path
        d="M16 9.5a3.5 3.5 0 0 1 0 5M18.5 7a7 7 0 0 1 0 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Vsl({ className = "" }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(ASSUMED_DURATION);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTime = () => setCurrent(video.currentTime);
    const onMeta = () => {
      if (video.duration && Number.isFinite(video.duration)) {
        setDuration(video.duration);
      }
    };

    video.addEventListener("timeupdate", onTime);
    video.addEventListener("loadedmetadata", onMeta);
    // Autoplay is only allowed while muted; a rejected play is not an error.
    void video.play().catch(() => {});

    return () => {
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, []);

  function unmute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    setMuted(false);
    void video.play().catch(() => {});
  }

  const hasVideo = VSL_SOURCE.src !== "";

  return (
    <div className={className}>
      <div className="relative overflow-hidden rounded-[14px] border-[1.5px] border-[#001232] bg-[#001232] shadow-[0_10px_0_0_rgba(0,18,50,0.12)]">
        <div className="relative aspect-video w-full">
          {hasVideo ? (
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={VSL_SOURCE.src}
              poster={VSL_SOURCE.poster || undefined}
              muted
              autoPlay
              playsInline
              preload="metadata"
            />
          ) : (
            /* No cut yet. The frame still shows so the fold can be judged. */
            <div className="flex h-full w-full items-center justify-center bg-[#001232]">
              <p className="px-[24px] text-center font-[family-name:var(--font-pt-serif)] text-[15px] leading-[22px] text-[rgba(244,241,234,0.45)]">
                VSL goes here. Set `VSL_SOURCE.src` in Vsl.tsx.
              </p>
            </div>
          )}

          {muted && (
            /*
              The unmute prompt is a panel in the middle of the frame, not a
              pill in a corner. It is the only thing the visitor is asked to do
              while the video is silent, so it takes the centre and the rest of
              the frame is dimmed behind it.

              The panel is navy, not the accent blue. It lives inside the video
              and should feel like part of it; in blue it became the largest
              colour mass on the screen and competed with the actual CTA below.
              Only the speaker mark carries the accent, and a cream hairline
              keeps the panel separate from whatever frame is behind it.
            */
            <button
              type="button"
              onClick={unmute}
              aria-label="Unmute the video"
              className="group absolute inset-0 flex cursor-pointer items-center justify-center bg-[rgba(0,18,50,0.45)] transition-colors duration-200 hover:bg-[rgba(0,18,50,0.55)]"
            >
              <span className="relative flex w-[min(76%,290px)] items-center justify-center">
                {/* Behind the panel, same shape, scaling outward and fading. */}
                <span
                  aria-hidden="true"
                  className="ec-pulse-ring absolute inset-0 rounded-[16px] bg-[rgba(244,241,234,0.75)]"
                />

                <span className="relative flex w-full flex-col items-center gap-[10px] rounded-[16px] border border-[rgba(244,241,234,0.28)] bg-[#001232] px-[26px] py-[22px] text-center shadow-[0_8px_1px_0_rgba(0,0,0,0.22)] transition-transform duration-200 group-hover:-translate-y-px group-active:scale-[0.98]">
                  <SpeakerIcon className="h-[34px] w-[34px] text-[#0158ff]" />
                  <span className="font-[family-name:var(--font-pt-serif)] text-[19px] leading-[26px] font-bold text-[#f4f1ea] max-[800px]:text-[17px] max-[800px]:leading-[24px]">
                    Your Video Is Playing
                    <br />
                    Click To Unmute
                  </span>
                </span>
              </span>
            </button>
          )}
        </div>
      </div>

      {/*
        Chapter bar. Segment widths are the chapters' real share of runtime.
        The written labels that sat under it are gone: four of them side by side
        wrapped into one-word columns at any real width. If the chapter names
        have to come back, render only the active one as a single line under the
        bar rather than all four at once.
      */}
      <div className="mt-[14px]">
        <div className="flex h-[6px] w-full gap-[3px]">
          {VSL_CHAPTERS.map((chapter, i) => {
            const next = VSL_CHAPTERS[i + 1]?.start ?? duration;
            const span = next - chapter.start;
            const played = Math.max(
              0,
              Math.min(1, (current - chapter.start) / span),
            );
            return (
              <div
                key={chapter.start}
                className="relative h-full overflow-hidden rounded-[999px] bg-[rgba(0,18,50,0.15)]"
                style={{ flexGrow: span }}
              >
                <div
                  className="absolute inset-y-0 left-0 bg-[#0158ff]"
                  style={{ width: `${played * 100}%` }}
                />
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
