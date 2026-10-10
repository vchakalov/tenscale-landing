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
    __ag?: { externalId?: string | null };
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
    ...(externalId ? { bootstrap: { distinctID: externalId } } : {}),
  });
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

/** A custom event for the Meta pixel, for retargeting audiences. */
export function trackMeta(event: string, properties: Record<string, unknown> = {}): void {
  try {
    window.fbq?.("trackCustom", event, properties);
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
