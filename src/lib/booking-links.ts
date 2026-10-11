/**
 * Asks integration-bridge for the Meet link of the call that was just booked.
 *
 * iClosed's redirect has no meeting link in it, so the page cannot know it on
 * its own. The bridge has it a few seconds after the booking, from iClosed's
 * webhook, and answers only when the email and the call id both match.
 */
export const BRIDGE_URL = "https://integration-bridge-t3ze753aka-ew.a.run.app";

export interface BookingLinks {
  meetingLink: string | null;
  rescheduleLink: string | null;
}

/**
 * The visitor's ids, which the bridge stores on the lead when iClosed did not
 * pass them on: iClosed never sees our visitor id, and may miss the click id.
 * With them, every later stage reaches Meta as the same person.
 */
function visitorQuery(): string {
  if (typeof window === "undefined") return "";
  const ag = (window as unknown as { __ag?: { externalId?: string; fbp?: string | null; fbc?: string | null } }).__ag;
  if (!ag) return "";
  const params = new URLSearchParams();
  if (ag.externalId) params.set("vid", ag.externalId);
  if (ag.fbp) params.set("fbp", ag.fbp);
  if (ag.fbc) params.set("fbc", ag.fbc);
  const query = params.toString();
  return query ? `&${query}` : "";
}

/** One ask. A miss, a network error or a non-JSON answer is simply "not yet". */
export async function fetchBookingLinks(
  email: string,
  callId: string,
  signal?: AbortSignal,
): Promise<BookingLinks | null> {
  const url = `${BRIDGE_URL}/booking?email=${encodeURIComponent(email)}&id=${encodeURIComponent(callId)}${visitorQuery()}`;
  try {
    const res = await fetch(url, { signal, cache: "no-store" });
    if (!res.ok) return null;
    const body = (await res.json()) as { found?: boolean } & Partial<BookingLinks>;
    if (!body.found) return null;
    return { meetingLink: body.meetingLink ?? null, rescheduleLink: body.rescheduleLink ?? null };
  } catch {
    return null;
  }
}

/**
 * Keeps asking while the webhook is still being written. Measured on real
 * bookings, the link is in GHL within a few seconds of the redirect; twenty
 * seconds covers a cold start on top of that.
 */
export async function pollBookingLinks(
  email: string,
  callId: string,
  signal: AbortSignal,
  { attempts = 14, intervalMs = 1500 } = {},
): Promise<BookingLinks | null> {
  for (let i = 0; i < attempts; i++) {
    if (signal.aborted) return null;
    const links = await fetchBookingLinks(email, callId, signal);
    if (links?.meetingLink) return links;
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
  return null;
}
