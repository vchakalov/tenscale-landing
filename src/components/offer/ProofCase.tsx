"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { proofShot } from "@/components/home/Proof";
import { track } from "@/lib/analytics";

/** What happened, then the screenshots it was read from. */
export type ProofStep = { heading?: string; text: React.ReactNode; shots: string[] };

/**
 * "See proof" at the end of a benefit. It opens the screenshots behind the
 * claim, what happened in them and the lesson, so a reader gets the story and
 * not just a picture.
 *
 * The dialog goes into the body: the link sits inside a paragraph, and a
 * paragraph cannot hold one. Screenshots are looked up by file, as on the home
 * page, so a renamed one fails the build instead of opening the wrong one.
 */
export function ProofCase({
  id,
  title,
  steps,
  lesson,
}: {
  id: string;
  title: string;
  steps: ProofStep[];
  lesson: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const resolved = steps.map((step) => ({ ...step, shots: step.shots.map(proofShot) }));

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          track("proof_open", { proof: id, source: "offer_means" });
          setOpen(true);
        }}
        className="cursor-pointer font-bold whitespace-nowrap text-[#6a2cff] underline decoration-[#6a2cff]/40 decoration-2 underline-offset-4 transition-colors duration-300 hover:decoration-[#6a2cff]"
      >
        See proof →
      </button>
      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Proof: ${title}`}
            onClick={close}
            className="fixed inset-0 z-[90] overflow-y-auto bg-[rgba(14,14,15,0.86)] px-3 py-[max(16px,4vh)] backdrop-blur-xl sm:px-6"
          >
            <div
              onClick={(event) => event.stopPropagation()}
              className="relative mx-auto w-full max-w-[880px] rounded-[24px] bg-white p-6 text-left text-[#0b0b0c] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] sm:p-10"
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute top-4 right-4 grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-black/[0.06] text-[22px] leading-none transition-colors duration-300 hover:bg-black/[0.12]"
              >
                &times;
              </button>
              <p className="text-[12px] font-black tracking-[0.14em] text-[#8a8a90] uppercase sm:text-[13px]">The Proof</p>
              <h3 className="mt-2 pr-10 text-[26px] leading-[1.05] font-black tracking-[-0.02em] text-balance uppercase sm:text-[34px]">
                {title}
              </h3>

              <div className="mt-8 flex flex-col gap-10">
                {resolved.map((step, i) => (
                  <div key={i}>
                    {step.heading && <p className="text-[19px] leading-[26px] font-black sm:text-[21px]">{step.heading}</p>}
                    <p className="mt-2 text-[16px] leading-[26px] text-pretty text-[#3a3a3d] sm:text-[17px] sm:leading-[28px]">{step.text}</p>
                    <div className="mt-5 flex flex-col items-center gap-3">
                      {/* Never wider than the screenshot itself, so a small one is not blown up. */}
                      {step.shots.map((shot) => (
                        <Image
                          key={shot.src}
                          src={shot.src}
                          alt={shot.alt}
                          width={shot.width}
                          height={shot.height}
                          className="h-auto w-auto max-w-full rounded-[14px] ring-1 ring-black/[0.08]"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-10 rounded-2xl bg-[#0b0b0c] px-5 py-4 text-[17px] leading-[26px] font-semibold text-pretty text-white sm:text-[18px] sm:leading-[28px]">
                <span className="text-[#e2f93b]">The lesson:</span> {lesson}
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
