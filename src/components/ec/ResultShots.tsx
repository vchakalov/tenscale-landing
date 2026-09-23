"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

/**
 * The wall of wins.
 *
 * Proof as a mosaic rather than as a tidy grid. Every tile is a screenshot at
 * its own shape: a Slack message is wide and short, a phone is tall and narrow,
 * an Ads Manager comparison is nearly square. Forcing them into equal cells
 * would crop the numbers, which are the only part anyone is reading, so the
 * wall is a masonry and the shapes are left alone.
 *
 * Volume is the argument here. One screenshot is a claim; sixteen of them, in
 * different accounts, from different people, in different tools, is a pattern
 * that is hard to manufacture. So the section is deliberately dense where the
 * rest of the page is spare.
 *
 * No captions. Every one of these already carries its own annotation, and a
 * line underneath would only restate a number the image is circling in red.
 *
 * CSS columns rather than a grid or a JavaScript masonry: the browser does the
 * packing, it reflows for free at any width, and there is no layout pass to go
 * wrong. The cost is reading order going down each column instead of across,
 * which for an unordered wall of evidence costs nothing.
 */

interface Shot {
  src: string;
  width: number;
  height: number;
  alt: string;
}

const SHOTS: Shot[] = [
  { src: "/proof/cpl-before-after.webp", width: 1400, height: 1165, alt: "Ads Manager before and after: cost per lead from $24.48 to $14.69 on the same budget" },
  { src: "/proof/onboarded-before-lunch.webp", width: 1236, height: 724, alt: "Slack: client signed at 9am, 112 ads live by 1:40pm, every ad with its own landing page" },
  { src: "/proof/ctr-three-months.webp", width: 1400, height: 1382, alt: "Click-through rate across three consecutive months" },
  { src: "/proof/record-spend.webp", width: 1400, height: 685, alt: "Record ad spend day in the account" },
  { src: "/proof/month-one-report.webp", width: 1292, height: 1112, alt: "First month report for a new client account" },
  { src: "/proof/multiple-clients.webp", width: 1400, height: 493, alt: "Results across several client accounts side by side" },
  { src: "/proof/80k-day.webp", width: 1328, height: 342, alt: "An $80k day in the account" },
  { src: "/proof/shopify-mobile.webp", width: 419, height: 831, alt: "Shopify on a phone, showing the day's revenue" },
  { src: "/proof/cpl-compare.webp", width: 1400, height: 541, alt: "Cost per lead compared before and after the install" },
  { src: "/proof/ops-before-after.webp", width: 786, height: 657, alt: "The team's workload before and after the engine" },
  { src: "/proof/best-sales-day.webp", width: 1146, height: 457, alt: "Best sales day on record for the account" },
  { src: "/proof/ads-manager.webp", width: 1186, height: 489, alt: "Ads Manager with the campaigns the engine runs" },
  { src: "/proof/ctr.webp", width: 1400, height: 470, alt: "Click-through rate after the install" },
  { src: "/proof/owner-thanks.webp", width: 1152, height: 304, alt: "An agency owner's message after the first month" },
  { src: "/proof/client-channel.webp", width: 1377, height: 394, alt: "A client channel reacting to the week's numbers" },
  { src: "/proof/scaled-overnight.webp", width: 478, height: 63, alt: "Scaled overnight" },
];

/**
 * A screenshot is worth looking at closely or not at all. Most of these are
 * Ads Manager tables, and the numbers in a tile two columns wide are too small
 * to read, so a click gives the full image at whatever the window allows.
 */
function Lightbox({ shot, onClose }: { shot: Shot; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={shot.alt}
      onClick={onClose}
      className="fixed inset-0 z-[90] flex cursor-zoom-out items-center justify-center bg-[rgba(0,18,50,0.82)] p-[clamp(16px,4vw,64px)]"
    >
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        className="max-h-full w-auto max-w-full rounded-[10px] object-contain shadow-[0_24px_60px_-20px_rgba(0,18,50,0.6)]"
      />
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-[18px] right-[18px] flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-full bg-[rgba(244,241,234,0.14)] text-[22px] leading-none text-[#f4f1ea] transition-colors duration-200 hover:bg-[rgba(244,241,234,0.26)]"
      >
        &times;
      </button>
    </div>
  );
}

export function ResultShots() {
  const [open, setOpen] = useState<Shot | null>(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section className="mt-[150px] px-[40px] max-[800px]:mt-[72px] max-[800px]:px-[16px]">
      <div className="mx-auto w-full max-w-[1320px]">
        <p className="text-center font-[family-name:var(--font-inter)] text-[13px] leading-[18px] font-medium tracking-[0.16em] text-[rgba(0,18,50,0.5)] uppercase">
          Wall of wins
        </p>

        <h2 className="mt-[14px] text-center text-balance font-[family-name:var(--font-pt-serif)] text-[clamp(32px,2.9vw,50px)] leading-[1.18] font-bold text-[#001232]">
          Don&apos;t Take Our Word For It.
          <br />
          <span className="text-[#0158ff]">Here Are The Receipts.</span>
        </h2>

        <p className="mt-[16px] text-center font-[family-name:var(--font-inter)] text-[clamp(15px,1.05vw,18px)] leading-[1.55] text-[rgba(0,18,50,0.6)]">
          Click any image to read it full size.
        </p>

        <div className="mt-[48px] columns-3 gap-[18px] max-[1100px]:columns-2 max-[700px]:columns-1 max-[800px]:mt-[30px] max-[800px]:gap-[14px]">
          {SHOTS.map((shot) => (
            <button
              key={shot.src}
              type="button"
              onClick={() => setOpen(shot)}
              className="mb-[18px] block w-full cursor-zoom-in overflow-hidden rounded-[10px] border border-[rgba(0,18,50,0.14)] bg-[#ffffff] transition-[transform,border-color] duration-200 hover:-translate-y-px hover:border-[rgba(0,18,50,0.4)] max-[800px]:mb-[14px]"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                className="h-auto w-full"
              />
            </button>
          ))}
        </div>
      </div>

      {open && <Lightbox shot={open} onClose={close} />}
    </section>
  );
}
