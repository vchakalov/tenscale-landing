import posthog from "posthog-js";

/**
 * Product analytics: what visitors watch, how far they scroll, what they
 * press, and whether they book. PostHog US, project 657030.
 *
 * The project key is public by design: it can only send events, and it ships
 * in the page's JavaScript on every site that uses PostHog. The admin key
 * lives in .env.local and never in this repo.
 *
 * Requests go to tenscale.ai/relay (the Worker forwards them), so an ad
 * blocker that drops posthog.com does not drop our data.
 */
export const POSTHOG_KEY = "phc_tVhroSsJ6YMQAx7AEi7oL6YVJVu5gj2ZbhYkQ4rt2VLD";

declare global {
  interface Window {
    /** `report`: whether Meta may hear about this visitor at all (worker/audience.ts). */
    __ag?: {
      externalId?: string | null;
      pixelId?: string | null;
      report?: boolean;
      /** `{utm_source, utm_medium}` for an ad click that arrived without UTMs (worker/context.ts). */
      inferredUtm?: Record<string, string> | null;
    };
    /** The thank-you page's query as iClosed sent it, before the pixel script took the lead's details out of the URL. */
    __agSearch?: string;
    fbq?: (...args: unknown[]) => void;
  }
}

let started = false;

export function initAnalytics(): void {
  if (started || typeof window === "undefined") return;
  started = true;
  // The Worker's first-party id, the same one Meta and GHL receive, so one
  // visitor is one person across all three.
  const externalId = window.__ag?.externalId ?? undefined;
  posthog.init(POSTHOG_KEY, {
    api_host: "/relay",
    ui_host: "https://us.posthog.com",
    defaults: "2025-05-24",
    person_profiles: "identified_only",
    capture_pageleave: true,
    enable_heatmaps: true,
    session_recording: { maskAllInputs: true },
    // The recorder is 68 KB. Started with the page, it competed with the
    // headline's fonts and the first video on a phone; it starts once the page
    // has loaded and gone quiet instead, which loses the first second or two
    // of a recording and nothing else.
    disable_session_recording: true,
    // Instagram drops an ad's UTMs on most clicks. The Worker reads the app
    // back out of the click id, and this page view's events carry it, so a paid
    // click is not filed under "not set".
    before_send: (event) => {
      const inferred = window.__ag?.inferredUtm;
      if (event && inferred && !event.properties.utm_source) Object.assign(event.properties, inferred);
      return event;
    },
    ...(externalId ? { bootstrap: { distinctID: externalId } } : {}),
  });
  const startRecording = () => window.setTimeout(() => posthog.startSessionRecording(), 1500);
  if (document.readyState === "complete") startRecording();
  else window.addEventListener("load", startRecording, { once: true });
}

/** One event to PostHog. Never throws: analytics must not break the page. */
export function track(event: string, properties: Record<string, unknown> = {}): void {
  try {
    if (!started) return;
    posthog.capture(event, { path: window.location.pathname, ...properties });
  } catch {
    // ignore
  }
}

const META_STANDARD = new Set(["PageView", "ViewContent", "Schedule", "Contact", "Purchase"]);

/**
 * The browser copy of a Meta event. The id is what lets Meta merge it with the
 * server copy. The pixel starts after the page does, so an event that comes
 * first (the thank-you page's Schedule) waits up to five seconds for it.
 */
export function pixelEvent(name: string, params: Record<string, string | number>, eventId: string, tries = 20): void {
  try {
    if (!window.__ag?.report) return;
    if (!window.fbq) {
      if (window.__ag?.pixelId && tries > 0) window.setTimeout(() => pixelEvent(name, params, eventId, tries - 1), 250);
      return;
    }
    window.fbq(META_STANDARD.has(name) ? "track" : "trackCustom", name, params, { eventID: eventId });
  } catch {
    // ignore
  }
}

/**
 * A Meta event the page sends twice: to the pixel, and through our Worker to
 * the Conversions API, which an ad blocker cannot stop. The Worker only lets
 * through VideoProgress, ViewContent, ButtonClick and CalendarOpen with known values, and
 * only for a visitor Meta may hear about; the page skips the others itself.
 */
export function metaEvent(
  name: "VideoProgress" | "ViewContent" | "ButtonClick" | "CalendarOpen",
  params: Record<string, string | number>,
): void {
  try {
    if (!window.__ag?.report) return;
    const eventId = crypto.randomUUID();
    pixelEvent(name, params, eventId);
    const body = JSON.stringify({ event_name: name, event_id: eventId, params, url: window.location.href });
    if (!navigator.sendBeacon?.("/booking/prep", body)) {
      void fetch("/booking/prep", { method: "POST", body, keepalive: true }).catch(() => {});
    }
  } catch {
    // ignore
  }
}

/**
 * Once someone books, they have a name. The email becomes their PostHog id,
 * which folds every anonymous visit before it into the same person, and the
 * Worker's id stays on them as a property to find them in Meta and GHL.
 */
export function identifyLead(email: string, properties: Record<string, unknown> = {}): void {
  try {
    if (!started) return;
    posthog.identify(email.toLowerCase(), {
      email: email.toLowerCase(),
      external_id: window.__ag?.externalId ?? null,
      ...properties,
    });
  } catch {
    // ignore
  }
}
