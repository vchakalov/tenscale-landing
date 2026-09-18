/**
 * The booked call, read out of the URL the scheduler sends the visitor to.
 *
 * The site is a static export, so there is no server to ask what was booked.
 * Everything this page knows arrives in the query string and is turned into
 * calendar links in the browser.
 *
 * The key names are not guessed once and hoped for. Schedulers disagree about
 * what they call a start time, so every plausible spelling is tried and the
 * first one that parses wins. If none of them is there the card degrades to
 * "check your inbox" rather than showing a wrong date, which is the one thing
 * this page must never do.
 */

export interface Appointment {
  start: Date;
  end: Date;
  /** The invitee's name, when the scheduler passes one. */
  name?: string;
  /** Meeting link or place, when the scheduler passes one. */
  location?: string;
}

export const EVENT_TITLE = "Agentica demo call";

export const EVENT_DETAILS =
  "Your call with Agentica. We look at one of your client accounts and show you how its fulfillment gets automated.";

/** Used when the scheduler sends a start but no end. */
const DEFAULT_DURATION_MINUTES = 30;

const START_KEYS = [
  "start",
  "startTime",
  "start_time",
  "starts_at",
  "startsAt",
  "event_start_time",
  "eventStartTime",
  "datetime",
  "date",
];

const END_KEYS = [
  "end",
  "endTime",
  "end_time",
  "ends_at",
  "endsAt",
  "event_end_time",
  "eventEndTime",
];

const NAME_KEYS = ["name", "firstName", "first_name", "invitee", "invitee_name"];

const LOCATION_KEYS = [
  "location",
  "meetingUrl",
  "meeting_url",
  "join_url",
  "joinUrl",
  "conference_url",
];

function firstValue(params: URLSearchParams, keys: string[]): string | null {
  for (const key of keys) {
    const value = params.get(key);
    if (value && value.trim() !== "") return value.trim();
  }
  return null;
}

/**
 * Accepts an ISO 8601 string or a unix stamp in seconds or milliseconds.
 *
 * A "+" in an offset such as `+03:00` becomes a space when a query string is
 * decoded, which makes the whole stamp unparseable. That one case is repaired
 * before parsing; everything else is left to `Date`.
 */
function parseDate(raw: string | null): Date | null {
  if (!raw) return null;

  if (/^\d+$/.test(raw)) {
    const stamp = Number(raw);
    // Ten digits is seconds, thirteen is milliseconds.
    const date = new Date(raw.length <= 10 ? stamp * 1000 : stamp);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const repaired = raw.replace(/(\d)\s(\d{2}:?\d{2})$/, "$1+$2");
  const date = new Date(repaired);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function readAppointment(search: string): Appointment | null {
  const params = new URLSearchParams(search);
  const start = parseDate(firstValue(params, START_KEYS));
  if (!start) return null;

  const end =
    parseDate(firstValue(params, END_KEYS)) ??
    new Date(start.getTime() + DEFAULT_DURATION_MINUTES * 60_000);

  return {
    start,
    end,
    name: firstValue(params, NAME_KEYS) ?? undefined,
    location: firstValue(params, LOCATION_KEYS) ?? undefined,
  };
}

/* ---------------------------------------------------------------------------
 * Display
 * ------------------------------------------------------------------------ */

/**
 * Times are shown in the visitor's own zone, never in ours. The zone is named
 * out loud because a booking on the wrong side of a date line is the classic
 * no-show, and `longGeneric` gives the human name ("Bulgaria Time") instead of
 * the daylight-saving one.
 */
export function formatDay(date: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function formatTimeRange(appointment: Appointment): string {
  const format = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${format.format(appointment.start)} to ${format.format(appointment.end)}`;
}

export function timeZoneLabel(date: Date): string {
  const parts = new Intl.DateTimeFormat(undefined, {
    timeZoneName: "longGeneric",
  }).formatToParts(date);
  return parts.find((part) => part.type === "timeZoneName")?.value ?? "";
}

/* ---------------------------------------------------------------------------
 * Calendar links
 * ------------------------------------------------------------------------ */

/** `YYYYMMDDTHHMMSSZ`, the only stamp format Google's template URL accepts. */
function toUtcStamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function googleCalendarUrl(appointment: Appointment): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT_TITLE,
    dates: `${toUtcStamp(appointment.start)}/${toUtcStamp(appointment.end)}`,
    details: EVENT_DETAILS,
  });
  if (appointment.location) params.set("location", appointment.location);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Outlook for work and school accounts. The consumer host is a different
 * domain, but the buyer here runs an agency, so the work host is the default.
 */
export function outlookCalendarUrl(appointment: Appointment): string {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: EVENT_TITLE,
    body: EVENT_DETAILS,
    startdt: appointment.start.toISOString(),
    enddt: appointment.end.toISOString(),
  });
  if (appointment.location) params.set("location", appointment.location);
  return `https://outlook.office.com/calendar/0/deeplink/compose?${params.toString()}`;
}

/** Commas, semicolons and backslashes are control characters in an ICS value. */
function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

export function icsFile(appointment: Appointment): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Agentica//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${appointment.start.getTime()}-agentica@agenticalab.io`,
    `DTSTAMP:${toUtcStamp(new Date())}`,
    `DTSTART:${toUtcStamp(appointment.start)}`,
    `DTEND:${toUtcStamp(appointment.end)}`,
    `SUMMARY:${escapeIcsText(EVENT_TITLE)}`,
    `DESCRIPTION:${escapeIcsText(EVENT_DETAILS)}`,
  ];
  if (appointment.location) {
    lines.push(`LOCATION:${escapeIcsText(appointment.location)}`);
  }
  lines.push("END:VEVENT", "END:VCALENDAR");
  // RFC 5545 wants CRLF. Some calendar apps reject the file without it.
  return lines.join("\r\n");
}

/**
 * Hands the file to the browser. On a phone this is what opens the native
 * calendar app, so it is the fallback that always works when neither web
 * calendar is the visitor's.
 */
export function downloadIcs(appointment: Appointment): void {
  const blob = new Blob([icsFile(appointment)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "agentica-call.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
