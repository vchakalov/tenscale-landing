"use client";

import Image from "next/image";
import { type MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { pollBookingLinks } from "@/lib/booking-links";
import {
  downloadIcs,
  formatDay,
  formatTimeRange,
  googleCalendarUrl,
  outlookCalendarUrl,
  readAppointment,
  timeZoneLabel,
  type Appointment,
} from "@/lib/appointment";

/**
 * The one thing this page has to make happen.
 *
 * A lead who books and never puts the call in a calendar is a no-show, and a
 * no-show costs what a lost lead costs. So the card is the page's only button,
 * and it sits directly under the video rather than at the end of the scroll.
 *
 * One primary action, not a picker. A menu of three calendars costs a click
 * before the click that matters, so Google gets the button (the buyer runs an
 * agency, and agencies run on Workspace) and the other two stay as plain links
 * underneath.
 *
 * The query string is read after mount rather than through the router, because
 * the site is a static export: `useSearchParams` would force this subtree to
 * bail out of prerendering, and `window.location` costs nothing and cannot.
 *
 * This card replaced iClosed's own confirmation embed, and then the embed
 * replaced it, and now it is back. The embed was the right call while the
 * parameter contract was a guess: it held the real booking and we did not.
 * A live booking settled that. iClosed forwards the whole event on the
 * redirect, `event_start_time`, `event_end_time`, `timeZone`, `assigned_to`
 * and the invitee's name and address, so the data is ours either way.
 *
 * What the embed could not give us is the design. It is a cross-origin iframe
 * carrying its own white card, its own border and its own green banner, so it
 * drew a second card inside ours and nothing about it could be restyled. With
 * the contract known, drawing it ourselves costs one parser and buys the whole
 * page back.
 *
 * Times are shown in the zone the invitee chose while booking, not in the
 * browser's. The two are usually the same, and when they are not, the page
 * agreeing with the confirmation email matters more than the page being clever.
 */

/**
 * Who takes the call.
 *
 * `assigned_to` arrives in the URL, but it is an internal handle such as
 * "md.repharma", which tells a visitor nothing and looks like a database row.
 * The person is always the same one, so the name is written here.
 */
const HOST = {
  name: "Ben, Founder",
  photo: "/images/team/venelin.jpg",
  bio: "Ben has built SaaS, ecommerce and service businesses, three of which still run without him in the week. He has spent eight years putting AI into live operations at this size, first his own. Before that he shipped software inside a Fortune 500.",
};

type State =
  | { status: "pending" }
  | { status: "known"; appointment: Appointment }
  | { status: "unknown" };

/** Survives a refresh, so the confirmed state is not lost on a reload. */
function addedKey(appointment: Appointment): string {
  return `ec-cal-added:${appointment.start.toISOString()}`;
}

function CheckIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M5 12.5l4.5 4.5L19 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <path
        d="M3 10h18M8 3v4M16 3v4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

const SECONDARY_LINK =
  "font-[family-name:var(--font-inter)] text-[15px] leading-[22px] text-[rgba(0,18,50,0.6)] underline decoration-[rgba(0,18,50,0.25)] underline-offset-[4px] transition-colors duration-200 hover:text-[#001232] hover:decoration-[rgba(0,18,50,0.6)] max-[800px]:text-[14px]";

/** How long a click waits for the Meet link before adding the call without it. */
const CLICK_WAIT_MS = 4000;

type Lookup = "idle" | "pending" | "done";

export function AppointmentCard({ className = "" }: { className?: string }) {
  const [state, setState] = useState<State>({ status: "pending" });
  const [added, setAdded] = useState(false);
  const [lookup, setLookup] = useState<Lookup>("idle");
  const [waiting, setWaiting] = useState(false);

  /* The click handlers are async, so they read the latest appointment and
     lookup state through refs rather than through the closure they started in. */
  const appointmentRef = useRef<Appointment | null>(null);
  const lookupRef = useRef<Lookup>("idle");
  useEffect(() => {
    appointmentRef.current = state.status === "known" ? state.appointment : null;
    lookupRef.current = lookup;
  }, [state, lookup]);

  useEffect(() => {
    /* One frame later, not in the effect body. Reading the URL is a read of an
       external system, and setting state straight from an effect body makes
       React re-render twice before the browser has painted once. */
    const frame = requestAnimationFrame(() => {
      const appointment = readAppointment(window.location.search);
      if (!appointment) {
        setState({ status: "unknown" });
        return;
      }
      setState({ status: "known", appointment });
      try {
        setAdded(window.localStorage.getItem(addedKey(appointment)) === "1");
      } catch {
        // Private mode or blocked storage. The card never remembers, and that
        // costs the visitor one duplicate calendar entry at worst.
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  /*
    The Meet link is not in iClosed's redirect. The bridge has it a few seconds
    after the booking (see lib/booking-links.ts), so the card asks in the
    background and folds it into the calendar entry when it arrives. Nothing
    on screen waits for this: date, time and button are all there already.
  */
  const knownEmail = state.status === "known" ? state.appointment.email : undefined;
  const knownCallId = state.status === "known" ? state.appointment.callId : undefined;
  useEffect(() => {
    if (!knownEmail || !knownCallId) return;
    const controller = new AbortController();
    const frame = requestAnimationFrame(() => setLookup("pending"));
    void pollBookingLinks(knownEmail, knownCallId, controller.signal).then((links) => {
      if (controller.signal.aborted) return;
      if (links) {
        setState((current) =>
          current.status === "known"
            ? {
                status: "known",
                appointment: {
                  ...current.appointment,
                  location: links.meetingLink ?? current.appointment.location,
                  rescheduleLink: links.rescheduleLink ?? undefined,
                },
              }
            : current,
        );
      }
      setLookup("done");
    });
    return () => {
      cancelAnimationFrame(frame);
      controller.abort();
    };
  }, [knownEmail, knownCallId]);

  /** Resolves once the lookup has finished, or after `CLICK_WAIT_MS` either way. */
  const linkSettled = useCallback(async () => {
    const deadline = Date.now() + CLICK_WAIT_MS;
    while (lookupRef.current === "pending" && Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
  }, []);

  const remember = useCallback((appointment: Appointment) => {
    setAdded(true);
    try {
      window.localStorage.setItem(addedKey(appointment), "1");
    } catch {
      // See above.
    }
  }, []);

  /*
    A click that lands before the link has arrived opens the new tab at once,
    inside the click, and points it at the calendar a moment later. Opening the
    tab after an await would lose the click and the browser would block it.
  */
  const openCalendar = useCallback(
    async (event: MouseEvent<HTMLAnchorElement>, build: (a: Appointment) => string) => {
      const current = appointmentRef.current;
      if (!current) return;
      if (lookupRef.current !== "pending") {
        remember(current);
        return; // the href already carries everything there is
      }
      event.preventDefault();
      const tab = window.open("", "_blank");
      setWaiting(true);
      await linkSettled();
      setWaiting(false);
      const latest = appointmentRef.current ?? current;
      const url = build(latest);
      if (tab) {
        tab.opener = null;
        tab.location.href = url;
      } else {
        window.location.href = url;
      }
      remember(latest);
    },
    [linkSettled, remember],
  );

  const saveIcs = useCallback(async () => {
    if (lookupRef.current === "pending") {
      setWaiting(true);
      await linkSettled();
      setWaiting(false);
    }
    const latest = appointmentRef.current;
    if (!latest) return;
    downloadIcs(latest);
    remember(latest);
  }, [linkSettled, remember]);

  return (
    <div
      className={`rounded-[16px] border-[1.5px] border-[#001232] bg-[#f4f1ea] px-[clamp(24px,2.6vw,44px)] py-[clamp(28px,2.8vw,42px)] shadow-[0_10px_0_0_rgba(0,18,50,0.12)] ${className}`}
    >
      {state.status === "pending" && (
        /* One frame, until the query string has been read. Bars rather than a
           guessed date: a wrong date here is worse than a blank one. */
        <div aria-hidden="true" className="animate-pulse">
          <div className="h-[26px] w-[62%] rounded-[6px] bg-[rgba(0,18,50,0.1)]" />
          <div className="mt-[12px] h-[18px] w-[44%] rounded-[6px] bg-[rgba(0,18,50,0.07)]" />
          <div className="mt-[26px] h-[52px] w-[260px] max-w-full rounded-[100px] bg-[rgba(0,18,50,0.07)]" />
        </div>
      )}

      {state.status === "unknown" && (
        <div className="text-left">
          <p className="font-[family-name:var(--font-pt-serif)] text-[clamp(21px,1.7vw,30px)] leading-[1.28] font-bold text-[#001232]">
            The invite is in your inbox.
          </p>
          <p className="mt-[10px] font-[family-name:var(--font-inter)] text-[clamp(17px,1.25vw,20px)] leading-[1.6] text-[rgba(0,18,50,0.7)]">
            Open the confirmation email and accept the invitation. That puts the
            call in your calendar with the meeting link attached.
          </p>
        </div>
      )}

      {state.status === "known" && (
        <div className="text-left">
          <p className="font-[family-name:var(--font-inter)] text-[13px] leading-[18px] font-medium tracking-[0.12em] text-[rgba(0,18,50,0.5)] uppercase">
            Your call
          </p>

          <p className="mt-[10px] font-[family-name:var(--font-pt-serif)] text-[clamp(23px,2vw,36px)] leading-[1.22] font-bold text-[#001232]">
            {formatDay(state.appointment)}
          </p>
          <p className="mt-[6px] font-[family-name:var(--font-inter)] text-[clamp(17px,1.3vw,20px)] leading-[1.5] text-[rgba(0,18,50,0.7)]">
            {formatTimeRange(state.appointment)}
            {timeZoneLabel(state.appointment) &&
              ` \u00b7 ${timeZoneLabel(state.appointment)}`}
          </p>

          <div className="mt-[30px] border-t border-[rgba(0,18,50,0.14)] pt-[30px]">
            {added ? (
              /* Confirmed, not just clicked. Without this people press the
                 button three times and still are not sure it worked. */
              <p className="inline-flex items-center gap-[10px] rounded-[100px] border-[1.5px] border-[#001232] px-[26px] py-[13px] font-[family-name:var(--font-inter)] text-[16px] leading-[25px] font-medium text-[#001232]">
                <CheckIcon className="h-[19px] w-[19px] shrink-0 text-[#0158ff]" />
                Added. See you {formatDay(state.appointment)}.
              </p>
            ) : (
              <a
                href={googleCalendarUrl(state.appointment)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => void openCalendar(event, googleCalendarUrl)}
                aria-busy={waiting}
                className="inline-flex items-center gap-[12px] rounded-[100px] bg-[#0158ff] px-[clamp(26px,2.2vw,38px)] py-[clamp(12px,1vw,15px)] font-[family-name:var(--font-inter)] text-[clamp(16px,1.15vw,19px)] leading-[25px] font-medium whitespace-nowrap text-[#f4f1ea] shadow-[0_8px_1px_0_rgba(0,0,0,0.1)] transition-transform duration-200 hover:-translate-y-px active:scale-[0.98]"
              >
                <CalendarIcon className="h-[20px] w-[20px] shrink-0" />
                {waiting ? "Getting your meeting link\u2026" : "Add To Google Calendar"}
              </a>
            )}

            <p className="mt-[16px] font-[family-name:var(--font-inter)] text-[15px] leading-[22px] text-[rgba(0,18,50,0.5)] max-[800px]:text-[14px]">
              Use{" "}
              <a
                href={outlookCalendarUrl(state.appointment)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => void openCalendar(event, outlookCalendarUrl)}
                className={SECONDARY_LINK}
              >
                Outlook
              </a>{" "}
              or{" "}
              <button
                type="button"
                onClick={() => void saveIcs()}
                className={`cursor-pointer ${SECONDARY_LINK}`}
              >
                Apple Calendar
              </button>{" "}
              instead.
            </p>
          </div>

          {/*
            A face beside three sentences, as one row rather than as a second
            column. A column narrow enough to sit next to this card left the
            button wrapping onto three lines, and the button is the only thing
            on the page that has to be pressed.

            The sentences are here because a booked call with nobody attached to
            it is the easiest thing in the world to miss, and knowing who
            someone is decides whether the slot survives until Friday.
          */}
          <div className="mt-[30px] flex items-start gap-[clamp(18px,1.8vw,26px)] border-t border-[rgba(0,18,50,0.14)] pt-[30px]">
            <Image
              src={HOST.photo}
              alt={HOST.name}
              width={220}
              height={220}
              className="h-[96px] w-[96px] shrink-0 rounded-full border-[1.5px] border-[#001232] object-cover max-[800px]:h-[68px] max-[800px]:w-[68px]"
            />
            <div className="min-w-0">
              <p className="font-[family-name:var(--font-inter)] text-[13px] leading-[18px] font-medium tracking-[0.12em] text-[rgba(0,18,50,0.5)] uppercase">
                Your call is with
              </p>
              <p className="mt-[5px] font-[family-name:var(--font-pt-serif)] text-[clamp(19px,1.45vw,24px)] leading-[1.3] font-bold text-[#001232]">
                {HOST.name}
              </p>
              <p className="mt-[10px] text-pretty font-[family-name:var(--font-inter)] text-[17px] leading-[26px] text-[rgba(0,18,50,0.7)] max-[800px]:text-[16px] max-[800px]:leading-[24px]">
                {HOST.bio}
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
