"use client";

import { useEffect, useState } from "react";
import { CtaButton } from "./CtaButton";
import { BrandMark } from "./BrandMark";

/**
 * The phone's safety net for the ask.
 *
 * The fold was cut everywhere it could be cut: the wordmark is gone, two lines
 * of copy are gone, the gaps and two type sizes are smaller. It still ends
 * around 736px, and a real iPhone in Safari draws its line at roughly 700 with
 * the address bar open. On the smallest phones it is worse.
 *
 * So the button stops depending on the measurement. It appears pinned to the
 * bottom the moment the one in the fold scrolls away, and from then on it is
 * always on screen, whatever the real video turns out to weigh and whatever
 * the copy grows into later.
 *
 * It does not appear while the fold's own button is visible. Two buttons for
 * one action, one of them floating over the video, is worse than none.
 */
export function StickyCta({ brandMark = false }: { brandMark?: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const anchor = document.querySelector("[data-hero-cta]");
    if (!anchor) return;

    /* A subscription, so setting state from the callback is what the API is
       for. The bar shows exactly when the fold's button is off screen. */
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(anchor);

    return () => observer.disconnect();
  }, []);

  const button = (
    <CtaButton
      trackId="sticky_mobile"
      variant="blueRaised"
      className="flex w-full justify-center rounded-[50px] px-[24px] py-[13px] text-[16px] leading-[24px]"
    >
      Book Free Demo
    </CtaButton>
  );

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(var(--ec-ink-rgb),0.14)] bg-(--ec-bg) px-[16px] pt-[12px] transition-transform duration-300 ease-out min-[801px]:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      style={{ paddingBottom: "calc(12px + env(safe-area-inset-bottom))" }}
    >
      {/* With `brandMark`, the phone's only place for the mark: the fold has
          no height to spare for it, and this bar costs the fold nothing. */}
      {brandMark ? (
        <div className="flex items-center gap-[14px]">
          <BrandMark className="h-[30px] w-auto shrink-0" />
          {button}
        </div>
      ) : (
        button
      )}
    </div>
  );
}
