"use client";

import { LongArrowRightIcon } from "@/components/ec/icons";
import { BOOK_CALL_URL } from "@/components/sections/CtaButtons";
import { openBooking, warmBooking } from "@/lib/booking";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

// The landing's button, not the home page's black pill: blue fill, white label
// and a hard ink shadow under it. Lime would be the brand's own colour, but a
// lime button sits at 1.2:1 against white and does not read as the thing to
// click, which is why /landing went blue too.
const SIZES: Record<Size, string> = {
  sm: "h-10 px-5 text-[14px]",
  md: "h-12 px-7 text-[16px] shadow-[0_6px_1px_0_var(--ec-cta-shadow)]",
  lg: "h-14 px-9 text-[17px] shadow-[0_8px_1px_0_var(--ec-cta-shadow)]",
};

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
        "group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full font-medium font-[family-name:var(--font-inter)]",
        "bg-(--ec-cta) text-(--ec-on-cta) transition-transform duration-200 hover:-translate-y-0.5",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(var(--ec-accent-rgb),0.9)]",
        SIZES[size],
        className,
      )}
    >
      <span>{children}</span>
      <LongArrowRightIcon className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
    </a>
  );
}
