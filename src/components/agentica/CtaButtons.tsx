"use client";

import { openBooking, warmBooking } from "@/lib/booking";
import { cn } from "@/lib/utils";

// ── Real links ────────────────────────────────────────────────
/**
 * Kept as the anchor's href so the button works without JavaScript and reads
 * as a real link to a crawler. A click opens the iClosed dialog instead, the
 * same one every button on the offer page opens. Two calendars meant two sets
 * of availability and two places a lead could be lost.
 */
export const BOOK_CALL_URL = "https://zcal.co/venelin/agentica";
// ──────────────────────────────────────────────────────────────

type Size = "sm" | "md" | "lg";

// Solid near-black pill with a white chip and an oxblood arrow. No glow: the
// coloured halo under it was the loudest thing in the hero and it lit nothing
// the pill was not already saying.
const bookPill: Record<Size, string> = {
  sm: "h-10 pl-5 pr-1.5 text-sm gap-2.5",
  md: "h-12 pl-6 pr-1.5 text-[15px] gap-3",
  lg: "h-14 pl-7 pr-2 text-[17px] gap-4",
};
const bookChip: Record<Size, string> = {
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-10 w-10",
};
const waCls: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-[15px]",
  lg: "h-14 px-6 text-base",
};

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[46%] w-[46%]" aria-hidden="true">
      <path
        d="M7 17 17 7M17 7H8.5M17 7v8.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


export function BookCallButton({
  size = "md",
  className,
  children = "Book a call",
}: {
  size?: Size;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={BOOK_CALL_URL}
      onClick={(event) => {
        // Let a modified click open the calendar in a new tab as usual.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
        event.preventDefault();
        openBooking();
      }}
      onPointerEnter={warmBooking}
      onTouchStart={warmBooking}
      onFocus={warmBooking}
      className={cn(
          "group inline-flex items-center justify-between whitespace-nowrap rounded-full font-semibold text-white ring-1 ring-white/10",
          "bg-[linear-gradient(180deg,#242424_0%,#000000_100%)]",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-accent-ring)]",
          bookPill[size],
          className,
        )}
      >
      <span>{children}</span>
      {/* white chip, oxblood arrow, the one spark of colour */}
      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-full bg-white text-[#8B1120] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
          bookChip[size],
        )}
      >
        <ArrowUpRight />
      </span>
    </a>
  );
}
