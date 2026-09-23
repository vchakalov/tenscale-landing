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

export const BOOKING_WIDGET_URL = "https://app.iclosed.io/e/agentica/meet";
export const BOOKING_SCRIPT_URL = "https://app.iclosed.io/assets/widget.js";

type Listener = () => void;

const listeners = new Set<Listener>();

export function onOpenBooking(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function openBooking(): void {
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
}

/** The Worker stamps the stored tracking values onto the page; iClosed reads them from the URL. */
export function bookingUrlWithContext(base: string, context: InjectedContext | null): string {
  if (!context) return base;
  const url = new URL(base);
  for (const [key, value] of Object.entries(context.utm)) url.searchParams.set(key, value);
  if (context.fbc) url.searchParams.set("fbc", context.fbc);
  if (context.fbp) url.searchParams.set("fbp", context.fbp);
  url.searchParams.set("external_id", context.externalId);
  return url.toString();
}

export function injectedContext(): InjectedContext | null {
  if (typeof window === "undefined") return null;
  return (window as unknown as { __ag?: InjectedContext }).__ag ?? null;
}
