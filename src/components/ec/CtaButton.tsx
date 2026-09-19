"use client";

import { openBooking, warmBooking } from "@/lib/booking";
import { cn } from "@/lib/utils";
import { LongArrowRightIcon } from "./icons";

export const CALENDAR_URL = "https://zcal.co/venelin/agentica";

type CtaVariant = "blue" | "blueRaised" | "cream";

/**
 * The pill is always ink.
 *
 * DESIGN.md is explicit that chartreuse is never a button fill: it is a
 * micro-signal paired with ink, and the moment it starts filling buttons the
 * signal dies. So the accent rides in the icon circle instead, which is the
 * same "Book a call" grammar the marketing site already uses.
 */
const VARIANTS: Record<CtaVariant, string> = {
  /** Flat ink pill. */
  blue: "bg-[#0c0a08] text-[#ffffff] text-[16px] leading-[25px] pl-[30px] pr-[8px] py-[8px]",
  /** The same pill; the name is kept so every call site does not have to move. */
  blueRaised:
    "bg-[#0c0a08] text-[#ffffff] text-[16px] leading-[25px] pl-[30px] pr-[8px] py-[8px]",
  /** On an inverted panel, the pill inverts with it. */
  cream:
    "bg-[#ffffff] text-[#0c0a08] text-[20px] leading-[30px] pl-[40px] pr-[8px] py-[8px]",
};

interface CtaButtonProps {
  children: React.ReactNode;
  variant?: CtaVariant;
  className?: string;
}

/**
 * The page's only button. Always an anchor to the booking calendar.
 *
 * Measured from the source: `border-radius: 100px`, `font-weight: 500`, Inter.
 *
 * It stays an anchor to the calendar so it still works with JavaScript off and
 * so the link is real to a crawler, but a click opens the booking dialog in
 * place instead of navigating. Hover and first touch warm the widget, which is
 * the cheapest few hundred milliseconds on the page.
 */
export function CtaButton({
  children,
  variant = "blueRaised",
  className,
}: CtaButtonProps) {
  return (
    <a
      href={CALENDAR_URL}
      onClick={(event) => {
        // Let modified clicks open the calendar in a new tab as usual.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
        event.preventDefault();
        openBooking();
      }}
      onPointerEnter={warmBooking}
      onTouchStart={warmBooking}
      onFocus={warmBooking}
      className={cn(
        "group inline-block rounded-[100px] text-center font-medium font-[family-name:var(--font-inter)] transition-[color,transform,background] duration-300",
        VARIANTS[variant],
        className,
      )}
    >
      <span className="flex items-center justify-center gap-[14px]">
        {children}
        {/* The chartreuse chip. The only place the accent appears on a
            control, and it never fills the control itself. */}
        <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full bg-[#e4f222] text-[#0c0a08] transition-transform duration-200 group-hover:translate-x-[2px]">
          <LongArrowRightIcon className="h-[16px] w-[16px]" />
        </span>
      </span>
    </a>
  );
}
