"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { SHOTS, type Shot } from "@/components/ec/ResultShots";
import { ProofLightbox } from "@/components/home/Proof";
import { track } from "@/lib/analytics";
import { Reveal } from "@/components/home/Reveal";

/**
 * The whole wall, where the fake testimonials used to be.
 *
 * Two rows drifting in opposite directions at a size worth reading, the same
 * evidence the landing shows. Hover or focus stops a row; a click opens the
 * screenshot full size. The 63px strip is left out: at row height it smears.
 */

const MARQUEE = SHOTS.filter((shot) => shot.width / shot.height < 5);
const ROWS: Shot[][] = [MARQUEE.filter((_, i) => i % 2 === 0), MARQUEE.filter((_, i) => i % 2 === 1)];

export function ResultsWall() {
  const [open, setOpen] = useState<Shot | null>(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section className="w-full py-24 sm:py-36">
      <Reveal className="mx-auto flex max-w-[760px] flex-col items-center px-4 text-center">
        <span className="rounded-full bg-black/[0.04] px-3 py-1 text-[10px] font-medium tracking-[0.2em] text-[#3a3a3d] uppercase ring-1 ring-black/[0.06] sm:text-[11px]">
          The rest of the wall
        </span>
        <h2 className="mt-6 font-[family-name:var(--font-gelica)] text-[38px] leading-[1.05] font-light text-balance text-[#0e0e0f] sm:text-[60px]">
          An Obnoxious Amount Of Screenshots.
        </h2>
        <p className="mt-5 text-[16px] leading-[26px] text-[#3a3a3d] sm:text-[17px]">
          Ads Manager, Shopify and Slack, as they were sent to us. Click any one to read it full size.
        </p>
      </Reveal>

      <div className="mt-14 flex flex-col gap-4 sm:mt-16 sm:gap-5">
        {ROWS.map((row, index) => (
          <div
            key={index}
            className="home-wall-row relative overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)",
            }}
          >
            <div className={`home-wall-track flex gap-4 sm:gap-5 ${index % 2 === 1 ? "home-wall-track--reverse" : ""}`}>
              {[...row, ...row].map((shot, i) => (
                <button
                  key={`${shot.src}-${i}`}
                  type="button"
                  onClick={() => {
                    track("proof_open", { proof: shot.src, from: "wall" });
                    setOpen(shot);
                  }}
                  aria-hidden={i >= row.length}
                  tabIndex={i >= row.length ? -1 : 0}
                  aria-label={`Open: ${shot.alt}`}
                  className="h-[200px] shrink-0 cursor-zoom-in rounded-[1.1rem] bg-black/[0.03] p-1 ring-1 ring-black/[0.06] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 sm:h-[260px]"
                >
                  <Image
                    src={shot.src}
                    alt=""
                    width={shot.width}
                    height={shot.height}
                    loading="lazy"
                    className="h-full w-auto max-w-none rounded-[calc(1.1rem-0.25rem)] bg-white"
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {open && <ProofLightbox shot={open} onClose={close} />}
    </section>
  );
}
