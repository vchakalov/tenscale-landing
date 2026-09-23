import { readRawCookie } from './cookie.js';

export interface TrackingContext {
  fbclid: string | null;
  fbc: string | null;
  fbp: string | null;
  utm: Record<string, string>;
  firstUtm: Record<string, string>;
  landingUrl: string;
  firstSeen: number;
  externalId: string;
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

function utmFrom(url: URL): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = url.searchParams.get(key);
    if (value) out[key] = value;
  }
  return out;
}

export function parseCookie(header: string | null): Partial<TrackingContext> | null {
  const raw = readRawCookie(header);
  if (!raw) return null;
  try {
    return JSON.parse(atob(decodeURIComponent(raw))) as Partial<TrackingContext>;
  } catch {
    return null; // a damaged cookie is the same as no cookie
  }
}

export function serializeCookie(ctx: TrackingContext): string {
  return encodeURIComponent(btoa(JSON.stringify(ctx)));
}

export function readContext(url: URL, cookieHeader: string | null, now: number, randomId: () => string): TrackingContext {
  const old = parseCookie(cookieHeader);
  const utm = utmFrom(url);
  const clickId = url.searchParams.get('fbclid');

  // The click id is case sensitive: Meta says never normalize it.
  const fbclid = clickId ?? old?.fbclid ?? null;
  const fbc = clickId ? `fb.1.${now}.${clickId}` : (old?.fbc ?? null);

  return {
    fbclid,
    fbc,
    fbp: old?.fbp ?? null,
    utm: Object.keys(utm).length > 0 ? utm : (old?.utm ?? {}),
    firstUtm: old?.firstUtm ?? utm,
    landingUrl: old?.landingUrl ?? url.toString(),
    firstSeen: old?.firstSeen ?? now,
    externalId: old?.externalId ?? randomId(),
  };
}
