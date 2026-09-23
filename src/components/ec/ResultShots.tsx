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
 * The order is interleaved rather than grouped. Four client accounts and three
 * CTR months are near-identical shapes, and listed together they read as one
 * repeated tile; spread through the wall they read as more accounts. The
 * composites sit beside their own parts on purpose: the wall is not an index,
 * and a visitor scanning it is counting, not cross-referencing.
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
  { src: "/proof/record-spend.webp", width: 1400, height: 685, alt: "Record ad spend day in the account" },
  { src: "/proof/client-a.webp", width: 1400, height: 434, alt: "Results in a client account" },
  { src: "/proof/ctr-three-months.webp", width: 1400, height: 1382, alt: "Click-through rate across three consecutive months" },
  { src: "/proof/80k-day.webp", width: 1328, height: 342, alt: "An $80k day in the account" },
  { src: "/proof/month-one-report.webp", width: 1292, height: 1112, alt: "First month report for a new client account" },
  { src: "/proof/client-b.webp", width: 1400, height: 470, alt: "Results in a second client account" },
  { src: "/proof/shopify-mobile.webp", width: 419, height: 831, alt: "Shopify on a phone, showing the day's revenue" },
  { src: "/proof/multiple-clients.webp", width: 1400, height: 493, alt: "Results across several client accounts side by side" },
  { src: "/proof/ctr-jun.webp", width: 1400, height: 470, alt: "Click-through rate in June" },
  { src: "/proof/ops-before-after.webp", width: 786, height: 657, alt: "The team's workload before and after the engine" },
  { src: "/proof/cpl-compare.webp", width: 1400, height: 541, alt: "Cost per lead compared before and after the install" },
  { src: "/proof/client-c.webp", width: 1400, height: 470, alt: "Results in a third client account" },
  { src: "/proof/best-sales-day.webp", width: 1146, height: 457, alt: "Best sales day on record for the account" },
  { src: "/proof/ctr-jul.webp", width: 1400, height: 470, alt: "Click-through rate in July" },
  { src: "/proof/ads-manager.webp", width: 1186, height: 489, alt: "Ads Manager with the campaigns the engine runs" },
  { src: "/proof/client-d.webp", width: 1400, height: 434, alt: "Results in a fourth client account" },
  { src: "/proof/owner-thanks.webp", width: 1152, height: 304, alt: "An agency owner's message after the first month" },
  { src: "/proof/ctr-aug.webp", width: 1400, height: 470, alt: "Click-through rate in August" },
  { src: "/proof/client-channel.webp", width: 1377, height: 394, alt: "A client channel reacting to the week's numbers" },
  { src: "/proof/ctr.webp", width: 1400, height: 470, alt: "Click-through rate after the install" },
  { src: "/proof/scaled-overnight.webp", width: 478, height: 63, alt: "Scaled overnight" },
];

/**
 * The columns are packed here, not by the browser.
 *
 * CSS multi-column balances by measuring, and with twenty-four blocks whose
 * heights range from a 63px strip to a 1382px table it gave up: one column ran
 * to the bottom while the other ended a third of the way down, leaving a blue
 * void beside the evidence.
 *
 * Every tile in a column is the same width, so its height is simply its aspect
 * ratio. Walking the list and dropping each tile into whichever column is
 * currently shortest keeps the two within one tile of each other, always, at
 * any width. It runs once at build time and never again.
 */
function packColumns(shots: Shot[], count: number): Shot[][] {
  const columns: Shot[][] = Array.from({ length: count }, () => []);
  const heights = new Array<number>(count).fill(0);

  for (const shot of shots) {
    let shortest = 0;
    for (let i = 1; i < count; i += 1) {
      if (heights[i] < heights[shortest]) shortest = i;
    }
    columns[shortest].push(shot);
    heights[shortest] += shot.height / shot.width;
  }

  return columns;
}

/**
 * The marquee's two rows.
 *
 * Alternating the list rather than cutting it in half keeps each row mixed:
 * split down the middle, one row would have been every Ads Manager table and
 * the other every Slack message.
 *
 * The 63px strip is left out of this arrangement only. At row height it would
 * stretch to more than three times its source width and read as a smear.
 */
const MARQUEE = SHOTS.filter((shot) => shot.width / shot.height < 5);
const ROWS: Shot[][] = [
  MARQUEE.filter((_, i) => i % 2 === 0),
  MARQUEE.filter((_, i) => i % 2 === 1),
];

/** The two arrangements the site uses, packed once at module load. */
const COLUMN_SETS: Record<number, Shot[][]> = {
  2: packColumns(SHOTS, 2),
  3: packColumns(SHOTS, 3),
};

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

/**
 * The wall is used twice, and the two uses want different things.
 *
 * On the thank-you page it is the whole point of the scroll: a blue field, two
 * columns, as long as it can be, because the visitor has booked and the only
 * job left is to make the slot feel worth keeping.
 *
 * On the landing it sits between the player and the benefits, where the same
 * twenty-three tiles in two columns would bury everything under them. Three
 * columns cut its height by a third, and navy rather than blue because the
 * landing spends its blue on the button and the risk reversal, and a second
 * field of it would take the button's job away.
 */
export function ResultShots({
  eyebrow,
  title,
  note = "Click any image to read it full size.",
  tone = "blue",
  columns = 2,
  layout = "masonry",
}: {
  /** Small label above the heading. Omitted, nothing is drawn. */
  eyebrow?: string;
  title?: React.ReactNode;
  note?: string;
  tone?: "blue" | "navy";
  columns?: 2 | 3;
  /**
   * `masonry` stacks everything and runs long, which is what the thank-you
   * page wants. `marquee` puts the tiles on two rows that scroll past at a
   * size worth reading, which is what a section in the middle of a sales page
   * wants: fixed height, and the sense that the wall continues past the edge
   * of the screen in both directions.
   */
  layout?: "masonry" | "marquee";
} = {}) {
  const [open, setOpen] = useState<Shot | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const packed = COLUMN_SETS[columns] ?? COLUMN_SETS[2];

  return (
    <section className="mt-[150px] px-[40px] max-[800px]:mt-[72px] max-[800px]:px-[14px]">
      {/*
        One blue panel holding the whole wall.

        Everywhere else the accent is four characters at a time. Here it is the
        ground, because this section is doing something the rest of the page is
        not: it is not making an argument, it is producing evidence, and it
        should read as a different kind of object. The screenshots are all pale
        Ads Manager and Slack, so a blue field also stops twenty-four white
        rectangles from dissolving into the cream.
      */}
      <div
        className={`mx-auto w-full max-w-[1320px] rounded-[28px] px-[clamp(20px,3.4vw,64px)] py-[clamp(44px,4.6vw,88px)] max-[800px]:rounded-[18px] ${
          tone === "navy" ? "bg-[#001232]" : "bg-[#0158ff]"
        }`}
      >
        {eyebrow && (
          <p className="mb-[14px] text-center font-[family-name:var(--font-inter)] text-[13px] leading-[18px] font-medium tracking-[0.18em] text-[rgba(244,241,234,0.62)] uppercase">
            {eyebrow}
          </p>
        )}

        {/*
          The second line is the whole point of putting this on the thank-you
          page rather than on the landing. The visitor has already booked, so
          the wall is not persuading them to buy; it is showing them where they
          are about to be.
        */}
        <h2 className="text-center text-balance font-[family-name:var(--font-pt-serif)] text-[clamp(32px,2.9vw,50px)] leading-[1.18] font-bold text-[#f4f1ea]">
          {title ?? (
            <>
              Don&apos;t Take Our Word For It.
              <br />
              You&apos;ll Be On This Wall Next.
            </>
          )}
        </h2>

        <p className="mt-[16px] text-center font-[family-name:var(--font-inter)] text-[clamp(15px,1.05vw,18px)] leading-[1.55] text-[rgba(244,241,234,0.72)]">
          {note}
        </p>

        {layout === "marquee" ? (
          <div className="mt-[clamp(30px,3vw,52px)] flex flex-col gap-[clamp(14px,1.4vw,22px)]">
            {ROWS.map((row, index) => (
              <div
                key={index}
                className="ec-wall-row relative overflow-hidden"
                /* The edges fade instead of cutting, so the rows read as a
                   wall continuing past the screen rather than as a box. */
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent, #000 4%, #000 96%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, #000 4%, #000 96%, transparent)",
                }}
              >
                <div
                  className={`ec-wall-track flex gap-[clamp(14px,1.4vw,22px)] ${
                    index % 2 === 1 ? "ec-wall-track--reverse" : ""
                  }`}
                >
                  {[...row, ...row].map((shot, i) => (
                    <button
                      key={`${shot.src}-${i}`}
                      type="button"
                      onClick={() => setOpen(shot)}
                      aria-hidden={i >= row.length}
                      tabIndex={i >= row.length ? -1 : 0}
                      className="block h-[clamp(190px,17vw,280px)] shrink-0 cursor-zoom-in overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_-2px_rgba(0,18,50,0.28)] transition-transform duration-200 hover:-translate-y-px"
                    >
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        width={shot.width}
                        height={shot.height}
                        sizes="40vw"
                        className="h-full w-auto max-w-none"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-[clamp(32px,3.4vw,56px)] flex gap-[18px] max-[800px]:gap-[12px] max-[700px]:flex-col">
          {packed.map((column, index) => (
            <div
              key={index}
              className="flex min-w-0 flex-1 flex-col gap-[18px] max-[800px]:gap-[12px]"
            >
              {column.map((shot) => (
                <button
                  key={shot.src}
                  type="button"
                  onClick={() => setOpen(shot)}
                  className="block w-full cursor-zoom-in overflow-hidden rounded-[10px] bg-[#ffffff] shadow-[0_2px_10px_-2px_rgba(0,18,50,0.28)] transition-transform duration-200 hover:-translate-y-px"
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    sizes="(max-width: 700px) 100vw, 46vw"
                    className="h-auto w-full"
                  />
                </button>
              ))}
            </div>
          ))}
          </div>
        )}
      </div>

      {open && <Lightbox shot={open} onClose={close} />}
    </section>
  );
}
