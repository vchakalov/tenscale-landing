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

/** One ask. A miss, a network error or a non-JSON answer is simply "not yet". */
export async function fetchBookingLinks(
  email: string,
  callId: string,
  signal?: AbortSignal,
): Promise<BookingLinks | null> {
  const url = `${BRIDGE_URL}/booking?email=${encodeURIComponent(email)}&id=${encodeURIComponent(callId)}`;
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
