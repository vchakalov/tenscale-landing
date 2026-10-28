"use client";

import { metaEvent } from "@/lib/analytics";
import { BOOKING_WIDGET_URL, openBooking, warmBooking } from "@/lib/booking";
import { cn } from "@/lib/utils";

/**
 * The direct-response button: as wide as the column, two lines, and a solid
 * ledge under it so it reads as something to press. Russell Brunson's and
 * Gymlaunch's pages make the ask the largest object on the screen; this is
 * that, in the brand's chartreuse.
 *
 * Same calendar and same tracking as the landing's CTA: the anchor works
 * without JavaScript, a click reports ButtonClick to Meta and a plain click
 * opens the iClosed dialog (CalendarOpen). The ids are on the Worker's list
 * (worker/events.ts); a name it does not know never reaches Meta.
 */
export type OfferButtonId = "offer_hero" | "offer_means" | "offer_bonuses" | "offer_book";

export function OfferButton({
  source,
  tone = "lime",
  sub = (
    <>
      See How To Automate Your Agency In <span className="whitespace-nowrap">15–30 Mins</span>
    </>
  ),
  className,
  // "30-min" kept on one line: a break after its hyphen read as "30-" and "min".
  children = (
    <>
      Yes! Book my free <span className="whitespace-nowrap">30-min</span> automation call
    </>
  ),
}: {
  /** Where on the page the button sits: Meta's button_id and PostHog's booking_open source. */
  source: OfferButtonId;
  /** `ink` is the black button, for the chartreuse section. */
  tone?: "lime" | "ink";
  sub?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={BOOKING_WIDGET_URL}
      onClick={(event) => {
        metaEvent("ButtonClick", { button_id: source });
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
        event.preventDefault();
        openBooking(source);
      }}
      onPointerEnter={warmBooking}
      onTouchStart={warmBooking}
      onFocus={warmBooking}
      className={cn(
        "group relative flex w-full max-w-[760px] items-center justify-center gap-4 rounded-[18px] px-6 py-4 text-center transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:translate-y-[4px] sm:px-10 sm:py-5",
        tone === "lime"
          ? "bg-[#e2f93b] text-[#0b0b0c] shadow-[0_6px_0_#a9bd1f,0_24px_48px_-18px_rgba(226,249,59,0.55)] active:shadow-[0_2px_0_#a9bd1f]"
          : "bg-[#0b0b0c] text-[#e2f93b] shadow-[0_6px_0_#000,0_24px_48px_-18px_rgba(0,0,0,0.5)] active:shadow-[0_2px_0_#000]",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6a2cff]/60",
        className,
      )}
    >
      <span className="flex flex-col items-center">
        <span className="text-[19px] leading-[1.12] font-black tracking-[-0.01em] text-balance uppercase sm:text-[26px]">{children}</span>
        <span className={cn("mt-2 text-[13px] leading-[18px] font-medium sm:text-[15px]", tone === "lime" ? "text-black/65" : "text-white/70")}>
          {sub}
        </span>
      </span>
      <span
        className={cn(
          "grid h-10 w-10 shrink-0 place-items-center rounded-full transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 sm:h-12 sm:w-12",
          tone === "lime" ? "bg-[#0b0b0c] text-[#e2f93b]" : "bg-[#e2f93b] text-[#0b0b0c]",
        )}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}
