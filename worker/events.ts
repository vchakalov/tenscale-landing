/**
 * The page's events, on their way to Meta's Conversions API.
 *
 * The browser sends each one to the pixel and here, with the same event id, so
 * Meta keeps one copy when both arrive and still gets ours when an ad blocker
 * stopped the pixel. This endpoint is open to anyone, so it takes only these
 * names with these values and nothing else: no free text reaches the dataset.
 *
 * PageView comes this way too, sent by the page once its script runs. It used
 * to go out with every HTML download, which counted every scanner as a visit.
 */
export const VIDEO_IDS = ['vsl', 'thank_you'] as const;
export const VIDEO_PERCENTS = [25, 50, 75, 95] as const;
/** The landing's buttons, then the offer page's (/offer). */
export const BUTTON_IDS = [
  'hero_desktop', 'hero_mobile', 'after_benefits', 'after_objections', 'sticky_mobile',
  'offer_hero', 'offer_means', 'offer_bonuses', 'offer_book',
] as const;
/** Where the calendar was opened from: the landing's and offer page's buttons, the home page's, or anything else. */
export const CALENDAR_SOURCES = [...BUTTON_IDS, 'hero', 'header', 'guarantee', 'proof', 'footer', 'other'] as const;

export interface EngagementEvent {
  eventName: 'PageView' | 'VideoProgress' | 'ViewContent' | 'ButtonClick' | 'CalendarOpen';
  eventId: string;
  customData: Record<string, string | number>;
  /** The page, without its query: the thank-you URL carries the lead's email. */
  sourceUrl: string;
}

const EVENT_ID = /^[A-Za-z0-9-]{8,64}$/;

function oneOf<T>(list: readonly T[], value: unknown): value is T {
  return list.includes(value as T);
}

export function parseEngagement(body: unknown, siteOrigin: string): EngagementEvent | null {
  if (typeof body !== 'object' || body === null) return null;
  const b = body as Record<string, unknown>;
  const params = (typeof b.params === 'object' && b.params !== null ? b.params : {}) as Record<string, unknown>;
  if (typeof b.event_id !== 'string' || !EVENT_ID.test(b.event_id)) return null;
  if (typeof b.url !== 'string') return null;

  let page: URL;
  try {
    page = new URL(b.url);
  } catch {
    return null;
  }
  if (page.origin !== siteOrigin) return null;
  const sourceUrl = `${page.origin}${page.pathname}`;
  const base = { eventId: b.event_id, sourceUrl };

  switch (b.event_name) {
    case 'PageView':
      return { ...base, eventName: 'PageView', customData: {} };
    case 'VideoProgress':
      if (!oneOf(VIDEO_IDS, params.video_id) || !oneOf(VIDEO_PERCENTS, params.percent)) return null;
      return { ...base, eventName: 'VideoProgress', customData: { video_id: params.video_id, percent: params.percent } };
    case 'ViewContent':
      if (params.content_name !== 'vsl') return null;
      return { ...base, eventName: 'ViewContent', customData: { content_name: 'vsl' } };
    case 'ButtonClick':
      if (!oneOf(BUTTON_IDS, params.button_id)) return null;
      return { ...base, eventName: 'ButtonClick', customData: { button_id: params.button_id } };
    case 'CalendarOpen':
      if (!oneOf(CALENDAR_SOURCES, params.source)) return null;
      return { ...base, eventName: 'CalendarOpen', customData: { source: params.source } };
    default:
      return null;
  }
}
