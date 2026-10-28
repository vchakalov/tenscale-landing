/**
 * Opening the booking widget, and getting it ready before anyone asks for it.
 *
 * The widget lives on iClosed's origin, so a cold click pays for a DNS lookup,
 * a TLS handshake, the script download and only then the iframe. That is where
 * leads are lost, so the work is moved ahead of the click in three steps:
 *
 *   1. `preconnect` in the document head opens the connection during page load.
 *   2. `warmBooking()` fires on hover or first touch of any CTA and pulls the
 *      script into the HTTP cache, which buys a few hundred milliseconds before
 *      the finger lands.
 *   3. The script tag itself is only injected once the widget's container is in
 *      the DOM, because iClosed's loader scans for `.iclosed-widget` when it
 *      runs and would find nothing if it ran earlier. By then it is a cache
 *      read, not a network round trip.
 *
 * After the first open the widget stays mounted, so every later open is instant.
 */

import { metaEvent, track } from "./analytics";

/**
 * The one calendar every booking button opens. Since 2026-10-23 it is the
 * Tenscale automation call; it was /e/agentica/meet before. The bridge treats
 * every event except call 2 as call 1, so a booking here is a Schedule.
 */
export const BOOKING_WIDGET_URL = "https://app.iclosed.io/e/agentica/tenscale-automate";
export const BOOKING_SCRIPT_URL = "https://app.iclosed.io/assets/widget.js";

type Listener = () => void;

const listeners = new Set<Listener>();

export function onOpenBooking(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

let calendarOpenSent = false;

/**
 * `source` says which button opened it (hero, header, footer...), for PostHog.
 *
 * The first open on a page also goes to Meta as CalendarOpen: the step before
 * the form, frequent enough (dozens a week) for a campaign to learn from while
 * Schedule is still a handful. Once per page view, so a visitor who opens and
 * closes the calendar three times counts once.
 */
export function openBooking(source?: string): void {
  track("booking_open", source ? { source } : {});
  if (!calendarOpenSent) {
    calendarOpenSent = true;
    metaEvent("CalendarOpen", { source: source ?? "other" });
  }
  listeners.forEach((listener) => listener());
}

let warmed = false;

/** Pull the loader into cache. Safe to call on every hover; it runs once. */
export function warmBooking(): void {
  if (warmed || typeof document === "undefined") return;
  warmed = true;

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "script";
  link.href = BOOKING_SCRIPT_URL;
  link.crossOrigin = "anonymous";
  document.head.appendChild(link);
}

let scriptInjected = false;

/** Run the loader, once, after the container exists. */
export function loadBookingWidget(): void {
  if (scriptInjected || typeof document === "undefined") return;
  scriptInjected = true;

  const script = document.createElement("script");
  script.src = BOOKING_SCRIPT_URL;
  script.async = true;
  document.body.appendChild(script);
}

export interface InjectedContext {
  fbc: string | null;
  fbp: string | null;
  utm: Record<string, string>;
  firstUtm: Record<string, string>;
  externalId: string;
  pageViewEventId: string;
  pixelId: string | null;
  /** Whether Meta may hear about this browser (worker/audience.ts). */
  report?: boolean;
}

/**
 * The Worker stamps the stored tracking values onto the page; iClosed reads them from the URL.
 *
 * Both touches go: the latest UTMs as `utm_*`, and the visit that first brought
 * this person as `first_utm_*`, which the bridge files under the GHL fields of
 * the same names. Until October 2026 only the latest went, and those fields
 * stayed empty.
 *
 * The browser's user agent goes too, as `ua`. Meta will not take a website
 * event without one, and iClosed's "Contact created" webhook, which the bridge
 * turns into Lead the moment someone fills in the form, does not carry it.
 * iClosed keeps every query parameter with the contact, so this one reaches
 * the bridge with the rest.
 *
 * `meta_report=0` when the Worker said Meta must not hear about this browser:
 * the team's own, a bot's, or one that never came from Meta. The bridge only
 * sees an email, and a teammate testing from a personal address looked like
 * a real booking to it (October 2026).
 */
export function bookingUrlWithContext(base: string, context: InjectedContext | null, userAgent?: string): string {
  if (!context) return base;
  const url = new URL(base);
  for (const [key, value] of Object.entries(context.utm)) url.searchParams.set(key, value);
  for (const [key, value] of Object.entries(context.firstUtm ?? {})) url.searchParams.set(`first_${key}`, value);
  if (context.fbc) url.searchParams.set("fbc", context.fbc);
  if (context.fbp) url.searchParams.set("fbp", context.fbp);
  url.searchParams.set("external_id", context.externalId);
  if (userAgent) url.searchParams.set("ua", userAgent);
  if (context.report === false) url.searchParams.set("meta_report", "0");
  return url.toString();
}

export function injectedContext(): InjectedContext | null {
  if (typeof window === "undefined") return null;
  return (window as unknown as { __ag?: InjectedContext }).__ag ?? null;
}
