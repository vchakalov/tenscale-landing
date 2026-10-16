"use client";

import { useEffect, useRef, useState } from "react";
import { metaEvent, track } from "@/lib/analytics";

/**
 * The VSL player.
 *
 * Behaviour is the CRO pattern: the video is already running, muted, when the
 * visitor arrives, so the page never shows a cold play button. One overlay
 * invites the unmute, and clicking it starts the video again from 0:00 with
 * sound. The muted run is a preview; the hook only works if it is heard, so
 * the click has to take the visitor back to it. A chapter click is the
 * exception: it unmutes where the visitor asked to go.
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
/**
 * The cut, served from R2 at media.tenscale.ai in two renditions of the same
 * edit: 1080p for the desktop player, 720p for the phone one. Each has its
 * index at the front (faststart) so playback starts from the first bytes, a
 * keyframe every two seconds so a chapter jump starts close to where it lands,
 * and is cached at Cloudflare's edge and fetched by range.
 *
 * The phone gets its own file because its player is about 360px wide: the
 * 1080p cut there spent mobile bandwidth on pixels the screen cannot show, and
 * the muted preview buffered megabytes before the page's own requests were done.
 */
export const VSL_ORIGIN = "https://media.tenscale.ai";

export const VSL_SOURCE = {
  src: `${VSL_ORIGIN}/tenscale-vsl-1080.mp4`,
  poster: "/images/vsl-poster.webp",
};

export const VSL_SOURCE_MOBILE = {
  src: `${VSL_ORIGIN}/tenscale-vsl-720.mp4`,
  poster: "/images/vsl-poster-mobile.webp",
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
 * The controls along the bottom of the frame: the progress bar, play, time,
 * speed, sound and full screen.
 *
 * With chapters it draws them the way YouTube does: the progress bar is cut
 * into one segment per chapter, each as wide as the chapter is long, and the
 * name of the one under the pointer floats above it. A chip under the bar
 * names the chapter playing now and opens the full list over the frame.
 * Without them the bar is one plain line.
 *
 * The list covers the frame rather than dropping out of it. On a phone the
 * frame is about 200px tall, and a menu hanging off the chip would be cut by
 * the rounded frame it lives in.
 *
 * Clicking a segment seeks to the exact point clicked, not to the chapter's
 * start, because that is what a progress bar has always done. Picking from the
 * list goes to the start.
 */
/** The speeds a viewer can step through; 1.2x is the one most people pick. */
const RATES = [1, 1.2, 1.5] as const;

/** The `video_id` each player reports to Meta under, by its analytics name. */
const META_VIDEO_IDS: Record<string, "vsl" | "thank_you"> = { landing: "vsl", thank_you: "thank_you" };

/** "Watched half the VSL with sound", once per visitor however many times they watch. */
function viewContentOnce() {
  const key = "meta-viewcontent-vsl";
  try {
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, "1");
  } catch {
    // Storage blocked: sending once per page view is the next best thing.
  }
  metaEvent("ViewContent", { content_name: "vsl" });
}

export interface PlayerControls {
  playing: boolean;
  muted: boolean;
  rate: number;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onCycleRate: () => void;
  onFullscreen: () => void;
  /** Present only when the video has subtitles. */
  captions?: { on: boolean; onToggle: () => void };
}

type IconName = "play" | "pause" | "sound" | "muted" | "fullscreen" | "captionsOn" | "captionsOff";

function ControlIcon({ name }: { name: IconName }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  /* The two Cs of "CC", drawn rather than typed so they do not depend on a font. */
  const cc = "M10.4 10.2a2.6 2.6 0 1 0 0 3.6M16.4 10.2a2.6 2.6 0 1 0 0 3.6";
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
      {name === "play" && <path d="M8 5.5v13l10-6.5z" fill="currentColor" />}
      {name === "pause" && <path d="M8 5.5v13M16 5.5v13" {...common} strokeWidth={2.6} />}
      {(name === "sound" || name === "muted") && <path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" />}
      {name === "sound" && <path d="M16 9.5a3.5 3.5 0 0 1 0 5M18.5 7a7 7 0 0 1 0 10" {...common} />}
      {name === "muted" && <path d="M16.5 9.5l5 5M21.5 9.5l-5 5" {...common} />}
      {name === "fullscreen" && <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" {...common} />}
      {/* On: a filled chip, the way every player marks subtitles that are showing. Off: the outline only. */}
      {name === "captionsOn" && (
        <>
          <rect x="2.5" y="5" width="19" height="14" rx="3" fill="currentColor" />
          <path d={cc} {...common} stroke="var(--ec-frame)" />
        </>
      )}
      {name === "captionsOff" && (
        <>
          <rect x="3" y="5.5" width="18" height="13" rx="2.6" {...common} strokeWidth={1.6} />
          <path d={cc} {...common} />
        </>
      )}
    </svg>
  );
}

const CONTROL_BUTTON =
  "flex h-[30px] min-w-[30px] shrink-0 cursor-pointer items-center justify-center rounded-[100px] px-[6px] transition-colors duration-200 hover:bg-[rgba(var(--ec-on-frame-rgb),0.14)]";

function ControlBar({
  chapters,
  duration,
  time,
  onSeek,
  controls,
}: {
  /** Empty for a video without chapters. */
  chapters: readonly Chapter[];
  duration: number;
  time: number;
  onSeek: (at: number) => void;
  controls: PlayerControls;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const [listOpen, setListOpen] = useState(false);

  const hasChapters = chapters.length > 0;
  const marks = hasChapters ? chapters : [{ at: 0, label: "" }];
  const segments = marks.map((mark, index) => ({
    ...mark,
    end: marks[index + 1]?.at ?? duration,
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
      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[rgba(var(--ec-frame-rgb),0.90)] via-[rgba(var(--ec-frame-rgb),0.45)] to-transparent px-[16px] pt-[40px] pb-[12px] max-[800px]:px-[12px] max-[800px]:pt-[28px] max-[800px]:pb-[8px]">
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
                aria-label={hasChapters ? `${formatAt(segment.at)} ${segment.label}` : "Seek"}
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
                <span className="relative block h-[4px] w-full overflow-hidden rounded-full bg-[rgba(var(--ec-on-frame-rgb),0.35)] transition-[height] duration-150 group-hover/seg:h-[7px]">
                  <span
                    className="absolute inset-y-0 left-0 bg-(--ec-accent)"
                    style={{ width: `${filled * 100}%` }}
                  />
                </span>
                {hasChapters && hover === index && (
                  <span
                    className={`pointer-events-none absolute bottom-[22px] whitespace-nowrap rounded-[8px] bg-(--ec-on-frame) px-[10px] py-[6px] font-[family-name:var(--font-inter)] text-[13px] leading-[18px] font-medium text-(--ec-frame) shadow-[0_6px_0_0_rgba(0,0,0,0.18)] ${tooltipPlace(index)}`}
                  >
                    <span className="text-(--ec-accent) tabular-nums">
                      {formatAt(segment.at)}
                    </span>{" "}
                    {segment.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-[6px] flex items-center gap-[10px] font-[family-name:var(--font-inter)] text-[13px] leading-[18px] text-(--ec-on-frame) max-[800px]:gap-[4px] max-[800px]:text-[12px]">
          <button
            type="button"
            onClick={controls.onTogglePlay}
            aria-label={controls.playing ? "Pause" : "Play"}
            className={CONTROL_BUTTON}
          >
            <ControlIcon name={controls.playing ? "pause" : "play"} />
          </button>
          <span className="shrink-0 tabular-nums text-[rgba(var(--ec-on-frame-rgb),0.75)]">
            {formatAt(time)} / {formatAt(duration)}
          </span>
          {hasChapters && (
            <button
              type="button"
              onClick={() => setListOpen(true)}
              className="inline-flex min-w-0 cursor-pointer items-center gap-[6px] rounded-[100px] px-[8px] py-[4px] font-medium transition-colors duration-200 hover:bg-[rgba(var(--ec-on-frame-rgb),0.14)]"
            >
              <span aria-hidden="true" className="text-(--ec-accent)">
                &bull;
              </span>
              <span className="truncate">{segments[current]?.label}</span>
              <span aria-hidden="true">&rsaquo;</span>
            </button>
          )}

          <div className="ml-auto flex shrink-0 items-center gap-[4px]">
            {controls.captions && (
              <button
                type="button"
                onClick={controls.captions.onToggle}
                aria-pressed={controls.captions.on}
                aria-label="Subtitles"
                className={CONTROL_BUTTON}
              >
                <ControlIcon name={controls.captions.on ? "captionsOn" : "captionsOff"} />
              </button>
            )}
            <button
              type="button"
              onClick={controls.onCycleRate}
              aria-label={`Playback speed ${controls.rate}x`}
              className={`${CONTROL_BUTTON} font-semibold tabular-nums`}
            >
              {controls.rate}&times;
            </button>
            <button
              type="button"
              onClick={controls.onToggleMute}
              aria-label={controls.muted ? "Unmute" : "Mute"}
              className={CONTROL_BUTTON}
            >
              <ControlIcon name={controls.muted ? "muted" : "sound"} />
            </button>
            <button type="button" onClick={controls.onFullscreen} aria-label="Full screen" className={CONTROL_BUTTON}>
              <ControlIcon name="fullscreen" />
            </button>
          </div>
        </div>
      </div>

      {listOpen && (
        <div className="absolute inset-0 z-30 flex flex-col bg-[rgba(var(--ec-frame-rgb),0.94)] text-left">
          <div className="flex items-center justify-between px-[18px] pt-[14px] pb-[8px] max-[800px]:px-[14px] max-[800px]:pt-[10px]">
            <p className="font-[family-name:var(--font-pt-serif)] text-[18px] leading-[24px] font-bold text-(--ec-on-frame) max-[800px]:text-[16px]">
              Chapters
            </p>
            <button
              type="button"
              onClick={() => setListOpen(false)}
              aria-label="Close chapters"
              className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full text-[22px] leading-none text-(--ec-on-frame) transition-colors duration-200 hover:bg-[rgba(var(--ec-on-frame-rgb),0.14)]"
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
                  className={`flex w-full cursor-pointer items-center gap-[14px] rounded-[10px] px-[10px] py-[9px] text-left font-[family-name:var(--font-inter)] text-[15px] leading-[20px] transition-colors duration-200 hover:bg-[rgba(var(--ec-on-frame-rgb),0.10)] max-[800px]:py-[7px] max-[800px]:text-[14px] ${index === current ? "bg-[rgba(var(--ec-accent-rgb),0.28)] text-(--ec-on-frame)" : "text-[rgba(var(--ec-on-frame-rgb),0.85)]"}`}
                >
                  <span className="w-[40px] shrink-0 font-medium text-[rgba(var(--ec-on-frame-rgb),0.55)] tabular-nums">
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
  trackAs,
  captions,
  promptGlass = false,
  frameClassName = "",
}: {
  className?: string;
  source?: { src: string; poster: string };
  /**
   * Optional chapters, drawn inside the frame (see ControlBar). The thank-you
   * video has them, because a visitor in research mode wants to jump to the
   * part they care about. The landing VSL had them too until October 2026,
   * when Ben took them off. A chapter click also unmutes: choosing a section is
   * a clear sign the visitor means to listen to it.
   */
  chapters?: readonly Chapter[];
  /** Used for the time and the chapters until the video's own length is known. */
  estimatedDuration?: number;
  placeholder?: string;
  /**
   * The name this video reports under in analytics ("landing", "thank_you").
   * Without it the player reports nothing.
   */
  trackAs?: string;
  /**
   * A WebVTT file, served from this site. With one, subtitles are on from the
   * first frame, the muted preview included, and a CC button in the controls
   * turns them off.
   */
  captions?: string;
  /**
   * Draws the unmute panel see-through, for a talking head whose face is in
   * the middle of the frame, where the panel sits.
   */
  promptGlass?: boolean;
  /**
   * Added to the 16:9 frame. A `max-h` here makes the frame wider than 16:9
   * once it reaches that height, and the video fills it by cropping its top
   * and bottom. Fullscreen is not affected: there the video takes the
   * screen's shape, not the frame's.
   */
  frameClassName?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  /* `started` is the unmute overlay's state, not the sound's: once the visitor
     has chosen to watch, muting from the controls must not bring the overlay
     back. */
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState<number>(1);

  /*
    Analytics. Progress is reported once per 10% step, separately for the
    muted preview and for watching with sound, so the drop-off curve in
    PostHog counts only people who chose to listen. Meta gets the 25/50/75/95%
    marks with sound as VideoProgress, and half the landing VSL with sound as
    ViewContent, once per visitor, for "watched the VSL" audiences.
  */
  const fired = useRef(new Set<string>());
  const lastChapter = useRef(-1);
  /* Pages render one player per layout and hide the other with CSS. Only the
     one on screen speaks: the hidden one reported every muted view twice. */
  function onScreen(): boolean {
    const video = videoRef.current;
    return !video || video.getClientRects().length > 0;
  }
  function report(event: string, properties: Record<string, unknown> = {}) {
    if (trackAs && onScreen()) track(event, { video: trackAs, ...properties });
  }
  function reportOnce(key: string, event: string, properties: Record<string, unknown> = {}) {
    if (fired.current.has(key)) return;
    fired.current.add(key);
    report(event, properties);
  }
  function reportProgress(video: HTMLVideoElement) {
    if (!trackAs || !(video.duration > 0)) return;
    const share = video.currentTime / video.duration;
    const sound = started && !video.muted;
    for (let step = 10; step <= Math.floor(share * 10 + 1e-6) * 10; step += 10) {
      reportOnce(`p:${sound}:${step}`, "vsl_progress", { percent: step, sound, seconds: Math.round(video.currentTime) });
    }
    const metaVideo = META_VIDEO_IDS[trackAs];
    if (sound && metaVideo && onScreen()) {
      for (const mark of [25, 50, 75, 95]) {
        if (share * 100 >= mark && !fired.current.has(`meta:${mark}`)) {
          fired.current.add(`meta:${mark}`);
          metaEvent("VideoProgress", { video_id: metaVideo, percent: mark });
          if (mark === 50 && metaVideo === "vsl") viewContentOnce();
        }
      }
    }
    if (started && chapters && chapters.length > 0) {
      let index = 0;
      chapters.forEach((chapter, i) => {
        if (video.currentTime >= chapter.at) index = i;
      });
      if (index !== lastChapter.current) {
        lastChapter.current = index;
        report("vsl_chapter", { chapter: chapters[index].label, index });
      }
    }
  }
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  /*
    The muted preview runs only while its player is on screen, and this is
    what starts it: the element has no `autoplay` and `preload="none"`. A page
    renders one player per layout and hides the other with CSS, and the two
    play different files (720p on a phone, 1080p on desktop). With `autoplay`
    the browser buffered the hidden copy too, so a phone downloaded the 1080p
    film alongside its own. Now the hidden copy fetches nothing; a viewport
    that crosses 800px after load (a tablet turned, a window resized) swaps
    which copy is shown, and the newly shown one starts. Once the visitor has
    chosen to watch, nothing here pauses it.
  */
  const startedRef = useRef(false);
  useEffect(() => {
    startedRef.current = started;
  }, [started]);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (startedRef.current) return;
      // Autoplay is only allowed while muted; a rejected play is not an error.
      if (entry.isIntersecting) void video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  /*
    Subtitles. The browser loads the track but does not draw it ("hidden"):
    its own captions sit at the very bottom of the frame, under the chapter
    bar. The page draws the current line itself, just above the bar. In full
    screen only the video element is on screen, so there the browser draws
    them ("showing"), unless the visitor turned them off.
  */
  const trackRef = useRef<HTMLTrackElement>(null);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [cue, setCue] = useState("");
  const [fullscreenNow, setFullscreenNow] = useState(false);

  useEffect(() => {
    const textTrack = trackRef.current?.track;
    if (!textTrack) return;
    textTrack.mode = captionsOn && fullscreenNow ? "showing" : "hidden";
  }, [captionsOn, fullscreenNow]);

  useEffect(() => {
    const textTrack = trackRef.current?.track;
    const video = videoRef.current;
    if (!textTrack || !video) return;
    const onCueChange = () => {
      const active = Array.from(textTrack.activeCues ?? []) as VTTCue[];
      setCue(active.map((c) => c.text.replace(/<[^>]+>/g, "")).join("\n"));
    };
    const onFullscreenChange = () => setFullscreenNow(document.fullscreenElement === video);
    // iPhone Safari has no Fullscreen API on a video, only these two events.
    const onBegin = () => setFullscreenNow(true);
    const onEnd = () => setFullscreenNow(false);
    textTrack.addEventListener("cuechange", onCueChange);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    video.addEventListener("webkitbeginfullscreen", onBegin);
    video.addEventListener("webkitendfullscreen", onEnd);
    return () => {
      textTrack.removeEventListener("cuechange", onCueChange);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      video.removeEventListener("webkitbeginfullscreen", onBegin);
      video.removeEventListener("webkitendfullscreen", onEnd);
    };
  }, [captions]);

  function toggleCaptions() {
    const next = !captionsOn;
    setCaptionsOn(next);
    report("vsl_captions", { on: next });
  }

  function unmute({ restart, via }: { restart: boolean; via: string }) {
    const video = videoRef.current;
    if (!video) return;
    if (!started) report("vsl_unmute", { via, seconds_muted: Math.round(video.currentTime) });
    if (restart) video.currentTime = 0;
    video.muted = false;
    video.volume = 1;
    setMuted(false);
    setStarted(true);
    void video.play().catch(() => {});
  }

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => {});
    else {
      video.pause();
      report("vsl_pause", { seconds: Math.round(video.currentTime) });
    }
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    if (!started) {
      unmute({ restart: true, via: "mute_button" });
      return;
    }
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  function cycleRate() {
    const video = videoRef.current;
    const next = RATES[(RATES.indexOf(rate as (typeof RATES)[number]) + 1) % RATES.length];
    if (video) video.playbackRate = next;
    setRate(next);
    report("vsl_speed", { rate: next });
  }

  /* The video itself goes full screen, not the frame: the browser then shows
     the whole picture letterboxed with its own controls, where the frame
     would have cropped it to fill the screen. */
  function fullscreen() {
    const video = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!video) return;
    if (!started) unmute({ restart: true, via: "fullscreen" });
    report("vsl_fullscreen");
    if (video.requestFullscreen) void video.requestFullscreen().catch(() => {});
    else video.webkitEnterFullscreen?.(); // iPhone Safari
  }

  function seek(at: number) {
    const video = videoRef.current;
    if (!video) return;
    report("vsl_seek", { to: Math.round(at), from: Math.round(video.currentTime) });
    video.currentTime = at;
    unmute({ restart: false, via: "chapter" });
  }

  const hasVideo = source.src !== "";
  /* The control bar owns the bottom of the frame, so the unmute panel centres
     in the space above it; on a phone the two would otherwise touch. */

  return (
    <div className={className}>
      <div className="relative overflow-hidden rounded-[14px] border-[1.5px] border-(--ec-frame-border) bg-(--ec-frame) shadow-[0_10px_0_0_var(--ec-shadow)]">
        <div className={`relative aspect-video w-full ${frameClassName}`}>
          {hasVideo ? (
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={source.src}
              poster={source.poster || undefined}
              muted
              playsInline
              preload="none"
              onClick={started ? togglePlay : undefined}
              onPlay={() => setPlaying(true)}
              onPlaying={() => reportOnce("preview", "vsl_preview")}
              onEnded={(event) => reportProgress(event.currentTarget)}
              onPause={() => setPlaying(false)}
              onRateChange={(event) => setRate(event.currentTarget.playbackRate)}
              onTimeUpdate={(event) => {
                setTime(event.currentTarget.currentTime);
                reportProgress(event.currentTarget);
              }}
              onLoadedMetadata={(event) =>
                setDuration(event.currentTarget.duration)
              }
            >
              {captions && (
                <track ref={trackRef} kind="subtitles" src={captions} srcLang="en" label="English" default />
              )}
            </video>
          ) : (
            /* No cut yet. The frame still shows so the fold can be judged. */
            <div className="flex h-full w-full items-center justify-center bg-(--ec-frame)">
              <p className="px-[24px] text-center font-[family-name:var(--font-pt-serif)] text-[15px] leading-[22px] text-[rgba(var(--ec-on-frame-rgb),0.45)]">
                {placeholder}
              </p>
            </div>
          )}

          {captions && captionsOn && cue !== "" && (
            /*
              The current line, just above the chapter bar and never on it.
              It comes before the unmute prompt in the markup, so during the
              muted preview it sits under the dimmed layer: still readable, and
              the prompt stays the one thing on top. On a phone the prompt fills
              the frame and the line would peek out from under it, so there it
              waits until the visitor unmutes.
            */
            <div
              className={`pointer-events-none absolute inset-x-0 flex justify-center px-[8%] bottom-[78px] max-[800px]:bottom-[64px] ${started ? "" : "max-[800px]:hidden"}`}
            >
              <p className="whitespace-pre-line rounded-[8px] bg-[rgba(var(--ec-frame-rgb),0.8)] px-[14px] py-[5px] text-center font-[family-name:var(--font-inter)] text-[clamp(16px,1.4vw,22px)] leading-[1.4] font-medium text-[#f4f1ea] max-[800px]:rounded-[6px] max-[800px]:px-[8px] max-[800px]:py-[3px] max-[800px]:text-[13px]">
                {cue}
              </p>
            </div>
          )}

          {!started && (
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

              The glass panel is the same panel, see-through, for a talking
              head: the face stays visible under it. Its halo is a ring rather
              than a fill, because a fill behind glass would wash the face out.

              On a phone the stacked panel covered most of the frame, so there
              it is one compact row: the mark beside the two lines. It stays
              solid on the landing. A panel in the way is what gets the tap,
              and the tap is the unmute.
            */
            <button
              type="button"
              onClick={() => unmute({ restart: true, via: "overlay" })}
              aria-label="Unmute the video"
              className={`group absolute inset-0 flex cursor-pointer items-center justify-center bg-[rgba(var(--ec-frame-rgb),0.45)] transition-colors duration-200 hover:bg-[rgba(var(--ec-frame-rgb),0.55)] pb-[60px] max-[800px]:pb-[48px]`}
            >
              <span className="relative flex w-[min(76%,290px)] items-center justify-center max-[800px]:w-auto">
                {/* Behind the panel, same shape, scaling outward and fading. */}
                <span
                  aria-hidden="true"
                  className={`ec-pulse-ring absolute inset-0 rounded-[16px] max-[800px]:rounded-[12px] ${promptGlass ? "border-2 border-[rgba(var(--ec-on-frame-rgb),0.9)]" : "bg-[rgba(var(--ec-on-frame-rgb),0.75)]"}`}
                />

                <span className={`relative flex w-full flex-col items-center gap-[10px] rounded-[16px] border border-[rgba(var(--ec-on-frame-rgb),0.28)] px-[26px] py-[22px] text-center max-[800px]:flex-row max-[800px]:gap-[10px] max-[800px]:rounded-[12px] max-[800px]:px-[14px] max-[800px]:py-[8px] max-[800px]:text-left ${promptGlass ? "bg-[rgba(var(--ec-frame-rgb),0.4)] [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]" : "bg-(--ec-frame) shadow-[0_8px_1px_0_rgba(0,0,0,0.22)]"} transition-transform duration-200 group-hover:-translate-y-px group-active:scale-[0.98]`}>
                  <SpeakerIcon className="h-[34px] w-[34px] shrink-0 text-(--ec-accent) max-[800px]:h-[22px] max-[800px]:w-[22px]" />
                  <span className="font-[family-name:var(--font-pt-serif)] text-[19px] leading-[26px] font-bold text-(--ec-on-frame) max-[800px]:text-[14px] max-[800px]:leading-[18px]">
                    Your Video Is Playing
                    <br />
                    Click To Unmute
                  </span>
                </span>
              </span>
            </button>
          )}

          <ControlBar
            chapters={chapters ?? []}
            duration={
              Number.isFinite(duration) && duration > 0
                ? duration
                : (estimatedDuration ?? (chapters?.at(-1)?.at ?? 0) + 60)
            }
            time={time}
            onSeek={seek}
            controls={{
              playing,
              muted,
              rate,
              onTogglePlay: togglePlay,
              onToggleMute: toggleMute,
              onCycleRate: cycleRate,
              onFullscreen: fullscreen,
              captions: captions ? { on: captionsOn, onToggle: toggleCaptions } : undefined,
            }}
          />
        </div>
      </div>
    </div>
  );
}
