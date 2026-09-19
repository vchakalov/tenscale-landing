"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  BOOKING_WIDGET_URL,
  loadBookingWidget,
  onOpenBooking,
} from "@/lib/booking";

/**
 * The booking dialog.
 *
 * Full screen on a phone, a panel on desktop. It is an overlay rather than a
 * route so nothing is unloaded: the visitor keeps the page, the video keeps its
 * position, and closing costs no navigation.
 *
 * Speed is the whole design here. Everything up to the iframe was already moved
 * ahead of the click (see `lib/booking.ts`), and the iframe itself belongs to
 * iClosed, so it cannot be made faster. It can only be started earlier: the
 * dialog is in the DOM from the first render, hidden but laid out at full size,
 * and the widget boots on the browser's first idle moment. By the time anyone
 * has watched enough of the video to want a call, the calendar is already
 * rendered and opening costs one repaint.
 *
 * The panel is white and sized to the widget's own height. It used to be cream
 * and much taller, which put a third-party white card inside our cream card and
 * left an empty field below it.
 *
 * Above the widget the ask is sold once more. A visitor who has clicked is not
 * yet booked, and the form asks for a phone number before it shows a single
 * slot; one sentence saying what the call actually is carries them across that
 * gap. One sentence only: the numbers were tried here and made the dialog a
 * second landing page in front of the form.
 */

/** The height iClosed's embed is built around. */
const WIDGET_HEIGHT = 520;

/**
 * The widget's type is set in fixed pixels inside a cross-origin frame, so it
 * cannot be scaled up from here. `zoom` was tried and broke it: the frame reads
 * the reduced CSS width, drops below its own breakpoint and renders its phone
 * layout, one column with the calendar pushed under the form. The frame gets
 * room instead, at its own scale, which is what keeps it in two columns.
 */

function Skeleton() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex animate-pulse gap-[28px] p-[28px] max-[800px]:flex-col max-[800px]:p-[20px]"
    >
      <div className="flex w-[46%] flex-col gap-[14px] max-[800px]:w-full">
        <div className="h-[26px] w-[55%] rounded-[6px] bg-[rgba(245,245,245,0.09)]" />
        <div className="h-[14px] w-[75%] rounded-[6px] bg-[rgba(245,245,245,0.06)]" />
        <div className="mt-[10px] h-[48px] rounded-[8px] bg-[rgba(245,245,245,0.06)]" />
        <div className="flex gap-[12px]">
          <div className="h-[48px] flex-1 rounded-[8px] bg-[rgba(245,245,245,0.06)]" />
          <div className="h-[48px] flex-1 rounded-[8px] bg-[rgba(245,245,245,0.06)]" />
        </div>
        <div className="mt-[14px] h-[48px] rounded-[8px] bg-[rgba(245,245,245,0.12)]" />
      </div>

      <div className="flex-1 max-[800px]:hidden">
        <div className="h-[22px] w-[45%] rounded-[6px] bg-[rgba(245,245,245,0.09)]" />
        <div className="mt-[22px] grid grid-cols-7 gap-[10px]">
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-[6px] bg-[rgba(245,245,245,0.05)]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function BookingModal() {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<Element | null>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(
    () =>
      onOpenBooking(() => {
        openerRef.current = document.activeElement;
        setOpen(true);
      }),
    [],
  );

  // Boot the widget on the first idle moment rather than on the click. The
  // container is already rendered at full size, so iClosed's loader finds it.
  useEffect(() => {
    const idle =
      typeof window !== "undefined" && "requestIdleCallback" in window
        ? window.requestIdleCallback
        : (fn: () => void) => window.setTimeout(fn, 1800);
    const id = idle(() => loadBookingWidget());
    return () => {
      if ("cancelIdleCallback" in window && typeof id === "number") {
        window.cancelIdleCallback(id);
      }
    };
  }, []);

  // The skeleton stays until the widget has actually put its iframe in place.
  useEffect(() => {
    const host = widgetRef.current;
    if (!host) return;

    const check = () => {
      if (!host.querySelector("iframe")) return;
      setReady(true);
      observer.disconnect();
    };

    const observer = new MutationObserver(check);
    observer.observe(host, { childList: true, subtree: true });

    // The widget may already be in place when this runs; the frame callback
    // keeps that check out of the effect body.
    const frame = requestAnimationFrame(check);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      // Send focus back where it came from, so the keyboard does not restart.
      if (openerRef.current instanceof HTMLElement) openerRef.current.focus();
    };
  }, [open, close]);

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[80] transition-opacity duration-200 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <button
        type="button"
        aria-label="Close"
        tabIndex={open ? 0 : -1}
        onClick={close}
        className="absolute inset-0 cursor-default bg-[rgba(245,245,245,0.55)]"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Book a free demo"
        tabIndex={-1}
        className="absolute inset-0 flex items-center justify-center p-[28px] outline-none max-[800px]:p-0"
      >
        <div className="relative flex max-h-[94vh] w-full max-w-[1060px] flex-col overflow-y-auto rounded-[18px] bg-white shadow-[0_24px_60px_-20px_rgba(245,245,245,0.5)] max-[800px]:h-full max-[800px]:max-h-none max-[800px]:max-w-none max-[800px]:rounded-none">
          <div className="relative shrink-0 px-[40px] pt-[28px] pb-[20px] text-center max-[800px]:px-[20px] max-[800px]:pt-[20px] max-[800px]:pb-[18px]">
            <p className="font-[family-name:var(--font-pt-serif)] text-[28px] leading-[36px] font-bold text-[#F5F5F5] max-[800px]:text-[22px] max-[800px]:leading-[29px]">
              Book Your Free Demo
            </p>

            <p className="mx-auto mt-[10px] max-w-[620px] font-[family-name:var(--font-inter)] text-[17px] leading-[26px] text-[rgba(245,245,245,0.72)] max-[800px]:mt-[8px] max-[800px]:text-[15px] max-[800px]:leading-[23px]">
              On the call we show you exactly how your client fulfillment gets
              automated.
            </p>

            <button
              type="button"
              onClick={close}
              tabIndex={open ? 0 : -1}
              aria-label="Close"
              className="absolute top-[18px] right-[18px] flex h-[38px] w-[38px] items-center justify-center rounded-full text-[#F5F5F5] transition-colors duration-200 hover:bg-[rgba(245,245,245,0.07)] max-[800px]:top-[12px] max-[800px]:right-[12px]"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div
            className="relative w-full px-[16px] pb-[18px] max-[800px]:min-h-0 max-[800px]:flex-1 max-[800px]:px-[8px] max-[800px]:pb-[8px]"
            style={{ height: WIDGET_HEIGHT }}
          >
            {!ready && <Skeleton />}
            <div
              ref={widgetRef}
              className="iclosed-widget h-full w-full"
              data-url={BOOKING_WIDGET_URL}
              title="Book Free Demo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
