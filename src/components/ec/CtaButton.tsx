"use client";

import { openBooking, warmBooking } from "@/lib/booking";
import { cn } from "@/lib/utils";
import { LongArrowRightIcon } from "./icons";

export const CALENDAR_URL = "https://zcal.co/venelin/agentica";

type CtaVariant = "blue" | "blueRaised" | "cream";

const VARIANTS: Record<CtaVariant, string> = {
  /** Header CTA, flat, no shadow. 16px/500, padding 12px 30px. */
  blue: "bg-[#FFD100] text-[#0B0B0B] text-[16px] leading-[25px] px-[30px] py-[12px]",
  /** Hero + footer CTA, identical to `blue` plus the hard offset shadow. */
  blueRaised:
    "bg-[#FFD100] text-[#0B0B0B] text-[16px] leading-[25px] px-[30px] py-[12px] shadow-[0_8px_1px_0_rgba(0,0,0,0.1)]",
  /** CTA inside the dark "Book a Call TODAY" card, inverted. 20px/500, padding 12px 40px. */
  cream:
    "bg-[#0B0B0B] text-[#F5F5F5] text-[20px] leading-[30px] px-[40px] py-[12px]",
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
        "inline-block rounded-[100px] text-center font-medium font-[family-name:var(--font-inter)] transition-[color,transform,background] duration-300",
        VARIANTS[variant],
        className,
      )}
    >
      <span className="flex items-center justify-center">
        {children}
        <LongArrowRightIcon className="ml-[15px] h-[16px] w-[16px] shrink-0" />
      </span>
    </a>
  );
}
