"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A short, silent product clip that behaves like a GIF: muted, inline, looping,
 * no controls. It is an mp4 rather than a GIF because the same eight seconds
 * weigh a tenth as much and the interface text stays sharp.
 *
 * `play` says when it should run. Left unset, the clip runs while it is on
 * screen and stops when scrolled away, so a page of them never decodes more
 * than the one being looked at. Nothing is fetched until the clip first has to
 * play; until then, and always under reduced motion, the poster stands in.
 */
export function Clip({
  src,
  poster,
  label,
  play,
  className,
}: {
  src: string;
  poster: string;
  label: string;
  /** Controlled playback, for the tour. Omitted: play while visible. */
  play?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    if (play !== undefined) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [play]);

  const shouldPlay = play ?? onScreen;

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (shouldPlay && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (video.preload !== "auto") video.preload = "auto";
      // The tour restarts a scene from its first frame each time it comes round.
      if (play !== undefined) video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [shouldPlay, play]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="none"
      className={className}
    />
  );
}
