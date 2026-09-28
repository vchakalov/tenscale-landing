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
 * There is no progress bar. A segmented chapter bar sat under the frame and,
 * with no video loaded, it read as four grey stripes of debris below the only
 * object in the fold. It also cost about 20px of a phone fold that is already
 * fighting for every one of them.
 *
 * Bringing it back is a small piece of work if the video turns out to need it:
 * a chapter list, the `timeupdate` listener and one row of flex children.
 */

/** Fill these in when the cut is ready. Empty `src` renders the placeholder. */
export const VSL_SOURCE = {
  src: "",
  poster: "",
};

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

/** A chapter mark: where it starts, in seconds, and what it is called. */
export type Chapter = { at: number; label: string };

function formatAt(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Chapters inside the frame, the way YouTube draws them: the progress bar is
 * cut into one segment per chapter, each as wide as the chapter is long, and
 * the name of the one under the pointer floats above it. A chip under the bar
 * names the chapter playing now and opens the full list over the frame.
 *
 * The list covers the frame rather than dropping out of it. On a phone the
 * frame is about 200px tall, and a menu hanging off the chip would be cut by
 * the rounded frame it lives in.
 *
 * Clicking a segment seeks to the exact point clicked, not to the chapter's
 * start, because that is what a progress bar has always done. Picking from the
 * list goes to the start.
 */
function ChapterBar({
  chapters,
  duration,
  time,
  onSeek,
}: {
  chapters: readonly Chapter[];
  duration: number;
  time: number;
  onSeek: (at: number) => void;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const [listOpen, setListOpen] = useState(false);

  const segments = chapters.map((chapter, index) => ({
    ...chapter,
    end: chapters[index + 1]?.at ?? duration,
  }));
  let current = 0;
  segments.forEach((segment, index) => {
    if (time >= segment.at) current = index;
  });

  function tooltipPlace(index: number): string {
    if (index === 0) return "left-0";
    if (index === segments.length - 1) return "right-0";
    return "left-1/2 -translate-x-1/2";
  }

  return (
    <>
      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[rgba(0,18,50,0.9)] via-[rgba(0,18,50,0.45)] to-transparent px-[16px] pt-[40px] pb-[12px] max-[800px]:px-[12px] max-[800px]:pt-[28px] max-[800px]:pb-[8px]">
        <div
          className="flex h-[16px] items-center gap-[3px]"
          onMouseLeave={() => setHover(null)}
        >
          {segments.map((segment, index) => {
            const span = Math.max(segment.end - segment.at, 1);
            const filled = Math.min(Math.max((time - segment.at) / span, 0), 1);
            return (
              <button
                key={segment.at}
                type="button"
                aria-label={`${formatAt(segment.at)} ${segment.label}`}
                onMouseEnter={() => setHover(index)}
                onFocus={() => setHover(index)}
                onBlur={() => setHover(null)}
                onClick={(event) => {
                  const box = event.currentTarget.getBoundingClientRect();
                  const fraction =
                    box.width > 0 ? (event.clientX - box.left) / box.width : 0;
                  onSeek(
                    segment.at + Math.min(Math.max(fraction, 0), 1) * span,
                  );
                }}
                style={{ flexGrow: span }}
                className="group/seg relative flex h-full basis-0 cursor-pointer items-center"
              >
                <span className="relative block h-[4px] w-full overflow-hidden rounded-full bg-[rgba(244,241,234,0.35)] transition-[height] duration-150 group-hover/seg:h-[7px]">
                  <span
                    className="absolute inset-y-0 left-0 bg-[#0158ff]"
                    style={{ width: `${filled * 100}%` }}
                  />
                </span>
                {hover === index && (
                  <span
                    className={`pointer-events-none absolute bottom-[22px] whitespace-nowrap rounded-[8px] bg-[#f4f1ea] px-[10px] py-[6px] font-[family-name:var(--font-inter)] text-[13px] leading-[18px] font-medium text-[#001232] shadow-[0_6px_0_0_rgba(0,0,0,0.18)] ${tooltipPlace(index)}`}
                  >
                    <span className="text-[#0158ff] tabular-nums">
                      {formatAt(segment.at)}
                    </span>{" "}
                    {segment.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-[6px] flex items-center gap-[12px] font-[family-name:var(--font-inter)] text-[13px] leading-[18px] text-[#f4f1ea] max-[800px]:text-[12px]">
          <span className="tabular-nums text-[rgba(244,241,234,0.75)]">
            {formatAt(time)} / {formatAt(duration)}
          </span>
          <button
            type="button"
            onClick={() => setListOpen(true)}
            className="inline-flex min-w-0 cursor-pointer items-center gap-[6px] rounded-[100px] px-[8px] py-[4px] font-medium transition-colors duration-200 hover:bg-[rgba(244,241,234,0.14)]"
          >
            <span aria-hidden="true" className="text-[#0158ff]">
              &bull;
            </span>
            <span className="truncate">{segments[current]?.label}</span>
            <span aria-hidden="true">&rsaquo;</span>
          </button>
        </div>
      </div>

      {listOpen && (
        <div className="absolute inset-0 z-30 flex flex-col bg-[rgba(0,18,50,0.94)] text-left">
          <div className="flex items-center justify-between px-[18px] pt-[14px] pb-[8px] max-[800px]:px-[14px] max-[800px]:pt-[10px]">
            <p className="font-[family-name:var(--font-pt-serif)] text-[18px] leading-[24px] font-bold text-[#f4f1ea] max-[800px]:text-[16px]">
              Chapters
            </p>
            <button
              type="button"
              onClick={() => setListOpen(false)}
              aria-label="Close chapters"
              className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full text-[22px] leading-none text-[#f4f1ea] transition-colors duration-200 hover:bg-[rgba(244,241,234,0.14)]"
            >
              &times;
            </button>
          </div>
          <ol className="min-h-0 flex-1 overflow-y-auto px-[10px] pb-[12px]">
            {segments.map((segment, index) => (
              <li key={segment.at}>
                <button
                  type="button"
                  onClick={() => {
                    onSeek(segment.at);
                    setListOpen(false);
                  }}
                  className={`flex w-full cursor-pointer items-center gap-[14px] rounded-[10px] px-[10px] py-[9px] text-left font-[family-name:var(--font-inter)] text-[15px] leading-[20px] transition-colors duration-200 hover:bg-[rgba(244,241,234,0.1)] max-[800px]:py-[7px] max-[800px]:text-[14px] ${index === current ? "bg-[rgba(1,88,255,0.28)] text-[#f4f1ea]" : "text-[rgba(244,241,234,0.85)]"}`}
                >
                  <span className="w-[40px] shrink-0 font-medium text-[rgba(244,241,234,0.55)] tabular-nums">
                    {formatAt(segment.at)}
                  </span>
                  {segment.label}
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
}

export function Vsl({
  className = "",
  source = VSL_SOURCE,
  chapters,
  estimatedDuration,
  placeholder = "VSL goes here. Set `VSL_SOURCE.src` in Vsl.tsx.",
}: {
  className?: string;
  source?: { src: string; poster: string };
  /**
   * Optional chapters, drawn inside the frame (see ChapterBar). The landing
   * VSL has none; the thank-you video does, because a visitor in research mode
   * wants to jump to the part they care about. A chapter click also unmutes:
   * choosing a section is a clear sign the visitor means to listen to it.
   */
  chapters?: readonly Chapter[];
  /** Used to lay the chapters out until the video's own length is known. */
  estimatedDuration?: number;
  placeholder?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Autoplay is only allowed while muted; a rejected play is not an error.
    void video.play().catch(() => {});
  }, []);

  function unmute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    setMuted(false);
    void video.play().catch(() => {});
  }

  function seek(at: number) {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = at;
    unmute();
  }

  const hasVideo = source.src !== "";
  /* With chapters, the bar owns the bottom of the frame, so the unmute panel
     centres in the space above it; on a phone the two would otherwise touch. */
  const hasChapters = chapters !== undefined && chapters.length > 0;

  return (
    <div className={className}>
      <div className="relative overflow-hidden rounded-[14px] border-[1.5px] border-[#001232] bg-[#001232] shadow-[0_10px_0_0_rgba(0,18,50,0.12)]">
        <div className="relative aspect-video w-full">
          {hasVideo ? (
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={source.src}
              poster={source.poster || undefined}
              muted
              autoPlay
              playsInline
              preload="metadata"
              onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
              onLoadedMetadata={(event) =>
                setDuration(event.currentTarget.duration)
              }
            />
          ) : (
            /* No cut yet. The frame still shows so the fold can be judged. */
            <div className="flex h-full w-full items-center justify-center bg-[#001232]">
              <p className="px-[24px] text-center font-[family-name:var(--font-pt-serif)] text-[15px] leading-[22px] text-[rgba(244,241,234,0.45)]">
                {placeholder}
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
              className={`group absolute inset-0 flex cursor-pointer items-center justify-center bg-[rgba(0,18,50,0.45)] transition-colors duration-200 hover:bg-[rgba(0,18,50,0.55)] ${hasChapters ? "pb-[60px] max-[800px]:pb-[48px]" : ""}`}
            >
              <span className="relative flex w-[min(76%,290px)] items-center justify-center">
                {/* Behind the panel, same shape, scaling outward and fading. */}
                <span
                  aria-hidden="true"
                  className="ec-pulse-ring absolute inset-0 rounded-[16px] bg-[rgba(244,241,234,0.75)]"
                />

                <span className={`relative flex w-full flex-col items-center gap-[10px] rounded-[16px] border border-[rgba(244,241,234,0.28)] bg-[#001232] px-[26px] py-[22px] text-center ${hasChapters ? "max-[800px]:gap-[4px] max-[800px]:py-[10px]" : ""} shadow-[0_8px_1px_0_rgba(0,0,0,0.22)] transition-transform duration-200 group-hover:-translate-y-px group-active:scale-[0.98]`}>
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

          {hasChapters && (
            <ChapterBar
              chapters={chapters}
              duration={
                Number.isFinite(duration) && duration > 0
                  ? duration
                  : (estimatedDuration ?? chapters[chapters.length - 1].at + 60)
              }
              time={time}
              onSeek={seek}
            />
          )}
        </div>
      </div>
    </div>
  );
}
