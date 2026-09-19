"use client";

import { useEffect, useRef, useState } from "react";
import { loadBookingWidget } from "@/lib/booking";

/**
 * iClosed's own booking confirmation, embedded.
 *
 * This replaces the card this page first carried. Reading the booking out of
 * the query string worked, but it meant agreeing a parameter contract with the
 * scheduler and keeping it agreed forever. iClosed publishes the component that
 * already holds the booking, so there is nothing to agree and nothing to drift:
 * host, time, place and the three Add To Calendar buttons all come from the
 * source of truth.
 *
 * It is the same `widget.js` the booking modal loads, so the script is already
 * warm on the origin and the class name is all that differs. The loader scans
 * for its containers when it runs, so the script is injected only after this
 * container is mounted.
 *
 * Two settings on the iClosed side make this work, and both are already on:
 * the event redirects to this page, and event parameters are forwarded to it.
 *
 * The widget hides itself when the page carries no real booking: its iframe
 * posts `widget:hide` and iClosed's loader sets `display: none` on our
 * container. That is correct behaviour, and it is also why this component
 * watches the container's own style attribute. Without that watch, somebody
 * who opens the page directly gets an empty white box where the card should
 * be, which looks broken in a way the missing card does not.
 */

/** The height iClosed's own snippet asks for. */
const WIDGET_HEIGHT = 340;

function Skeleton() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 animate-pulse rounded-[14px] bg-[rgba(237,232,223,0.05)] p-[22px]"
    >
      <div className="h-[34px] w-full rounded-[8px] bg-[rgba(237,232,223,0.06)]" />
      <div className="mt-[20px] h-[22px] w-[55%] rounded-[6px] bg-[rgba(237,232,223,0.06)]" />
      <div className="mt-[12px] h-[22px] w-[38%] rounded-[6px] bg-[rgba(237,232,223,0.06)]" />
      <div className="mt-[28px] h-[44px] w-[62%] rounded-[8px] bg-[rgba(237,232,223,0.06)]" />
    </div>
  );
}


type State = "loading" | "ready" | "hidden";

export function CallDetails({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    loadBookingWidget();

    const host = hostRef.current;
    if (!host) return;

    /* The loader gives no callback, so the container itself is the signal:
       an iframe inside it means the widget is up, and `display: none` on it
       means the widget asked to disappear. */
    const check = () => {
      if (host.style.display === "none") {
        setState("hidden");
        return;
      }
      if (host.querySelector("iframe")) setState("ready");
    };

    const observer = new MutationObserver(check);
    observer.observe(host, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style"],
    });
    const frame = requestAnimationFrame(check);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className={
        state === "hidden"
          ? "hidden"
          : `relative overflow-hidden rounded-[16px] border-[1.5px] border-[#EDE8DF] bg-[#ffffff] p-[clamp(10px,1vw,18px)] shadow-[0_10px_0_0_rgba(237,232,223,0.12)] ${className}`
      }
      style={state === "hidden" ? undefined : { minHeight: WIDGET_HEIGHT }}
    >
      {state === "loading" && <Skeleton />}
      <div
        ref={hostRef}
        className="call-details-widget relative"
        data-url="https://app.iclosed.io/embed"
        style={{ width: "100%", height: WIDGET_HEIGHT }}
      />
    </div>
  );
}
