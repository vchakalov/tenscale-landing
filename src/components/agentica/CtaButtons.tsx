"use client";

import { openBooking, warmBooking } from "@/lib/booking";
import { cn } from "@/lib/utils";

// ── Real links ────────────────────────────────────────────────
/**
 * Kept as the anchor's href so the button still works without JavaScript and
 * so the link is real to a crawler. A click opens the iClosed dialog instead.
 * The home page and the offer page now book into the same calendar; they used
 * to point at two different ones, which meant two sets of availability and two
 * places a lead could be lost.
 */
export const BOOK_CALL_URL = "https://zcal.co/venelin/agentica";
export const WHATSAPP_URL = "https://wa.me/359877895554";
// ──────────────────────────────────────────────────────────────

type Size = "sm" | "md" | "lg";

// Premium mono CTA: solid near-black pill + white chip with an oxblood arrow,
// and a faint oxblood glow so it has life on the warm canvas.
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

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.24c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.94 1.34-.5.04-.98.22-3.3-.7-2.78-1.1-4.56-3.94-4.7-4.12-.14-.18-1.12-1.5-1.12-2.86 0-1.36.72-2.02.97-2.3.24-.28.54-.34.72-.34.18 0 .36 0 .52.01.16.01.4-.06.62.48.24.56.82 1.94.9 2.08.08.14.12.3.02.48-.1.18-.16.3-.3.46-.14.16-.3.36-.42.48-.14.14-.28.3-.12.58.16.28.72 1.18 1.54 1.92 1.06.94 1.94 1.24 2.22 1.38.28.14.44.12.6-.08.16-.18.7-.82.88-1.1.18-.28.36-.24.62-.14.26.1 1.64.78 1.92.92.28.14.46.2.54.32.08.12.08.68-.16 1.36Z" />
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
    <>
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
          "bg-[linear-gradient(180deg,#001232_0%,#000000_100%)]",
          "shadow-[0_12px_30px_-12px_rgba(1,88,255,0.40)] transition-shadow duration-200",
          "hover:shadow-[0_16px_38px_-12px_rgba(1,88,255,0.55)]",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-accent-ring)]",
          bookPill[size],
          className,
        )}
      >
        <span>{children}</span>
        {/* white chip, oxblood arrow, the one spark of colour */}
        <span
          className={cn(
            "grid shrink-0 place-items-center rounded-full bg-white text-[#0158ff] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
            bookChip[size],
          )}
        >
          <ArrowUpRight />
        </span>
      </a>
    </>
  );
}

export function WhatsAppButton({
  size = "md",
  variant = "outline",
  className,
  children = "WhatsApp",
}: {
  size?: Size;
  variant?: "outline" | "ghost";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold text-foreground transition-colors",
        variant === "outline"
          ? "border border-border-strong bg-white hover:bg-surface-muted"
          : "hover:bg-surface-muted",
        waCls[size],
        className,
      )}
    >
      <WhatsAppIcon />
      {children}
    </a>
  );
}
