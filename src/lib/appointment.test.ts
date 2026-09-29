import { describe, expect, it } from "vitest";
import { eventDetails, googleCalendarUrl, readAppointment } from "./appointment";

// The shape of a real iClosed redirect, trimmed to what the card reads.
const REDIRECT =
  "?assigned_to=Ben&event_start_time=2026-09-30T15%3A45%3A00Z&event_end_time=2026-09-30T16%3A15%3A00Z" +
  "&timeZone=Europe%2FSofia&invitee_full_name=Ann%20Lee&Invitee_email=ann%40agency.co&previewId=call_bwP9HFiF3mna";

describe("readAppointment", () => {
  it("reads iClosed's capitalised Invitee_email and the call id", () => {
    const a = readAppointment(REDIRECT)!;
    expect(a.email).toBe("ann@agency.co");
    expect(a.callId).toBe("call_bwP9HFiF3mna");
  });
});

describe("eventDetails", () => {
  it("points to the invitation while the Meet link is unknown", () => {
    const text = eventDetails(readAppointment(REDIRECT)!);
    expect(text).toContain("The Google Meet link is in the invitation from team@tenscale.ai.");
    expect(text).not.toContain("Join:");
  });

  it("carries the Meet link and the reschedule link once the bridge has them", () => {
    const a = {
      ...readAppointment(REDIRECT)!,
      location: "https://meet.google.com/abc-defg-hij",
      rescheduleLink: "https://app.iclosed.io/r/x",
    };
    const text = eventDetails(a);
    expect(text).toContain("Join: https://meet.google.com/abc-defg-hij");
    expect(text).toContain("Need another time? https://app.iclosed.io/r/x");
    const url = new URL(googleCalendarUrl(a));
    expect(url.searchParams.get("location")).toBe("https://meet.google.com/abc-defg-hij");
    expect(url.searchParams.get("text")).toBe("Call with Ben (Tenscale)");
  });
});
