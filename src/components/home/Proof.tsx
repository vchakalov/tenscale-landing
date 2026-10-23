"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { SHOTS, type Shot } from "@/components/ec/ResultShots";

/**
 * Every number on the home page opens the screenshot it was read from.
 *
 * The same evidence the landing carries in its wall, looked up by file, so a
 * number and its picture cannot drift apart: rename a screenshot and the
 * lookup fails at build time instead of opening the wrong one.
 */
export function proofShot(src: string): Shot {
  const shot = SHOTS.find((s) => s.src === src);
  if (!shot) throw new Error(`No proof screenshot at ${src}`);
  return shot;
}

export function ProofLightbox({ shot, onClose }: { shot: Shot; onClose: () => void }) {
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
      className="home-lightbox fixed inset-0 z-[90] flex cursor-zoom-out flex-col items-center justify-center gap-4 bg-[rgba(14,14,15,0.86)] p-[clamp(16px,4vw,64px)] backdrop-blur-xl"
    >
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        className="max-h-[calc(100%-48px)] w-auto max-w-full rounded-[14px] object-contain shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]"
      />
      <p className="max-w-[640px] text-center text-[14px] leading-[20px] text-white/70">{shot.alt}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-[max(18px,env(safe-area-inset-top))] right-[18px] grid h-[42px] w-[42px] place-items-center rounded-full bg-white/12 text-[22px] leading-none text-white transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/24"
      >
        &times;
      </button>
    </div>
  );
}

/**
 * A button that opens one screenshot. Children are the label; the default is
 * the small "See screenshot" pill used under every number.
 */
export function ProofButton({
  src,
  className,
  tone = "light",
  children,
}: {
  src: string;
  className?: string;
  tone?: "light" | "dark";
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const shot = proofShot(src);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ??
          `group inline-flex items-center gap-2 rounded-full py-1.5 pr-1.5 pl-3.5 text-[13px] font-medium transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            tone === "dark"
              ? "bg-white/[0.06] text-white/85 ring-1 ring-white/10 hover:bg-white/[0.12]"
              : "bg-black/[0.035] text-[#0e0e0f] ring-1 ring-black/[0.06] hover:bg-black/[0.06]"
          }`
        }
      >
        {children ?? "See screenshot"}
        {/* A caller that styles the button draws its own arrow. */}
        {!className && (
          <span
            className={`grid h-6 w-6 place-items-center rounded-full transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px ${
              tone === "dark" ? "bg-white/10" : "bg-black/[0.06]"
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden="true">
              <path d="M7 17 17 7M17 7H8.5M17 7v8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </button>
      {open && <ProofLightbox shot={shot} onClose={close} />}
    </>
  );
}
