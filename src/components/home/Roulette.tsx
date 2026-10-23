"use client";

import { useEffect, useState } from "react";
import { RESULTS } from "@/components/home/results";

/**
 * The second line of the headline, turning like a slot reel: one result
 * drops out of the top as the next rolls up from below. Hyros does the same
 * with the last word of theirs ("15% more leads / calls / sales / ROAS").
 *
 * Only the line leaving and the line arriving animate; every other line
 * waits below the window with no transition, so the reel loops without ever
 * flying a line across the frame. The first result is what the server
 * renders, so the page reads complete before any script runs, and under
 * reduced motion it stays there.
 */

/** Milliseconds each result holds. */
const HOLD = 2600;

export function Roulette({ className }: { className?: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") setActive((n) => (n + 1) % RESULTS.length);
    }, HOLD);
    return () => window.clearInterval(timer);
  }, []);

  const previous = (active - 1 + RESULTS.length) % RESULTS.length;

  return (
    <span aria-hidden="true" className={`relative block h-[1.16em] overflow-hidden ${className ?? ""}`}>
      {RESULTS.map((result, i) => {
        const state = i === active ? "in" : i === previous ? "out" : "wait";
        return (
          <span
            key={result}
            data-state={state}
            className="home-reel absolute inset-x-0 top-0 block leading-[1.16] whitespace-nowrap"
          >
            <span className="home-mark">{result}</span>
          </span>
        );
      })}
    </span>
  );
}
