"use client";

import { useEffect, useRef, useState } from "react";
import { Clip } from "@/components/home/Clip";
import { ProofButton } from "@/components/home/Proof";
import { track } from "@/lib/analytics";

/**
 * The product, in the first screen.
 *
 * Hyros puts its app in the hero and lets it change scene every few seconds,
 * each scene closing on one line of outcome. This does the same with the four
 * jobs Tenscale does, in the order it does them, and every outcome line is a
 * number someone can click through to the screenshot it came from.
 *
 * Each scene is a short clip of the real app (staging, with the odd card
 * drawn in for the take), and lasts as long as its clip.
 *
 * The timer is the progress bar itself: a CSS animation on the active tab,
 * and its `animationend` moves to the next scene. Hovering the tour, or
 * scrolling it out of view, pauses that animation, so the pause needs no
 * bookkeeping. Under reduced motion the bar never runs, the clips show their
 * posters, and the tour stays where the visitor puts it.
 */

interface Scene {
  tab: string;
  path: string;
  video: string;
  poster: string;
  /** Seconds: the clip's length, which is how long the scene holds. */
  seconds: number;
  alt: string;
  lead: string;
  result: string;
  proof: string;
}

const SCENES: Scene[] = [
  {
    tab: "Angles",
    path: "angles",
    video: "/videos/tour-angles.mp4",
    poster: "/videos/tour-angles.webp",
    seconds: 12.8,
    alt: "Generating new angles from one line of focus, the new ideas landing on the angles board, then one angle opened",
    lead: "Every angle ranked by real CPA.",
    result: "6 angles, 18 audiences, live before lunch.",
    proof: "/proof/onboarded-before-lunch.webp",
  },
  {
    tab: "Creatives",
    path: "creatives",
    video: "/videos/tour-creatives.mp4",
    poster: "/videos/tour-creatives.webp",
    seconds: 17.7,
    alt: "Generating creatives: the engine reads the best hooks and winning ads, then six new creatives land in the library",
    lead: "A fresh creative for every angle and audience.",
    result: "4.3%+ average CTR.",
    proof: "/proof/ctr-three-months.webp",
  },
  {
    tab: "Pages",
    path: "funnels",
    video: "/videos/tour-pages.mp4",
    poster: "/videos/tour-pages.webp",
    seconds: 11.7,
    alt: "Two ads for two angles go through a router to the same landing page, rewritten for each angle, and the conversion rate climbs over 300%",
    lead: "Every ad gets its own landing page.",
    result: "£1.46 per purchase on the top ad.",
    proof: "/proof/ads-manager.webp",
  },
  {
    tab: "Automation",
    path: "automation",
    video: "/videos/tour-rules.mp4",
    poster: "/videos/tour-rules.webp",
    seconds: 14.5,
    alt: "Building a rule that replaces creatives when ROAS drops below 1.5, and the rule joining the active ones",
    lead: "Rules pause, replace and scale ads 24/7.",
    result: "Record $41k week, CPA flat.",
    proof: "/proof/record-spend.webp",
  },
];

export function ProductTour() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const paused = hovered || !visible;
  const scene = SCENES[active];

  return (
    <div
      ref={ref}
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className="home-tour relative w-full"
      data-paused={paused ? "" : undefined}
    >
      {/* Outer tray: the ground the window floats on. */}
      <div className="rounded-[1.75rem] bg-[#f1f1ef] p-1.5 ring-1 ring-black/[0.05]">
        <div className="home-tour-field relative overflow-hidden rounded-[calc(1.75rem-0.375rem)] p-1.5 sm:p-3">
          {/* The window. */}
          <div className="relative overflow-hidden rounded-[14px] bg-white shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_30px_70px_-34px_rgba(14,14,15,0.45),0_0_0_1px_rgba(14,14,15,0.07)]">
            <div className="flex items-center gap-3 border-b border-black/[0.06] bg-[#fbfaf8] px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
              </span>
              <span className="mx-auto rounded-full bg-black/[0.04] px-3 py-0.5 font-mono text-[11px] tracking-tight text-[#5c5c60]">
                app.tenscale.ai/{scene.path}
              </span>
              <span className="w-[42px]" aria-hidden="true" />
            </div>

            <div className="relative aspect-[1280/716] w-full bg-[#f5f4f1]">
              {SCENES.map((s, i) => (
                <div
                  key={s.path}
                  aria-hidden={i !== active}
                  className="home-tour-shot absolute inset-0"
                  data-active={i === active ? "" : undefined}
                >
                  <Clip
                    src={s.video}
                    poster={s.poster}
                    label={s.alt}
                    play={i === active && visible}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* The outcome line. All four share one grid cell, so the bar
                keeps the height of the longest and nothing jumps. */}
            <div className="grid border-t border-black/[0.06] bg-white px-4 py-3 sm:px-5 sm:py-3.5">
              {SCENES.map((s, i) => (
                <div
                  key={s.path}
                  aria-hidden={i !== active}
                  data-active={i === active ? "" : undefined}
                  className="home-tour-caption flex flex-wrap items-center justify-between gap-x-4 gap-y-2 [grid-area:1/1]"
                >
                  <p className="text-[14px] leading-[20px] text-[#2e2e30] sm:text-[15px]">
                    {s.lead}{" "}
                    <span className="home-mark font-semibold">{s.result}</span>
                  </p>
                  {i === active && <ProofButton src={s.proof} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs, each one its own timer. */}
      <div role="tablist" aria-label="What Tenscale does" className="mt-3 grid grid-cols-4 gap-1.5 sm:gap-2">
        {SCENES.map((s, i) => (
          <button
            key={s.path}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => {
              track("tour_tab", { tab: s.path });
              setActive(i);
            }}
            className={`relative overflow-hidden rounded-full px-1 py-2 text-[12px] font-medium transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] sm:text-[13px] ${
              i === active ? "bg-[#0e0e0f] text-white" : "bg-black/[0.04] text-[#3a3a3d] hover:bg-black/[0.07]"
            }`}
          >
            <span className="relative z-[1]">
              <span className="mr-1 hidden font-mono text-[10px] opacity-60 sm:inline">0{i + 1}</span>
              {s.tab}
            </span>
            {i === active && (
              <span
                key={active}
                aria-hidden="true"
                className="home-tour-fill absolute inset-y-0 left-0 bg-white/[0.14]"
                style={{ animationDuration: `${s.seconds}s` }}
                onAnimationEnd={() => setActive((active + 1) % SCENES.length)}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
