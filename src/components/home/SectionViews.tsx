"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * How far down the home page people get: one `section_view` per section with
 * a `data-section` name, the first time its top reaches the middle of the
 * screen. Measured that way rather than by how much of it shows, because some
 * sections are taller than a phone screen many times over. Together
 * with booking_open's `source`, this is what the home page dashboard in
 * PostHog is built from.
 */
export function SectionViews() {
  useEffect(() => {
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const name = (entry.target as HTMLElement).dataset.section;
          if (!entry.isIntersecting || !name || seen.has(name)) continue;
          seen.add(name);
          track("section_view", { section: name });
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -50% 0px", threshold: 0 },
    );
    document.querySelectorAll<HTMLElement>("[data-section]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return null;
}
