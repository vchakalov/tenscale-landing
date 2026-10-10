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

/** The fbclid inside an fbc value, `fb.1.<ms>.<fbclid>`. */
function clickIdOf(fbc: string | null): string | null {
  if (!fbc) return null;
  const parts = fbc.split('.');
  return parts.length >= 4 ? parts.slice(3).join('.') : null;
}

/** Meta's browser id format. The pixel reuses an `_fbp` it finds instead of making its own. */
export function newFbp(now: number): string {
  return `fb.1.${now}.${1_000_000_000 + Math.floor(Math.random() * 9_000_000_000)}`;
}

export function readContext(
  url: URL,
  cookieHeader: string | null,
  now: number,
  randomId: () => string,
  makeFbp: (now: number) => string = newFbp,
): TrackingContext {
  const old = parseCookie(cookieHeader);
  const utm = utmFrom(url);
  const clickId = url.searchParams.get('fbclid');

  // The click id is case sensitive: Meta says never normalize it. A click id we
  // already hold keeps the time it was first seen, which is what Meta asks for.
  const fbclid = clickId ?? old?.fbclid ?? null;
  const knownFbc = readRawCookie(cookieHeader, '_fbc') ?? old?.fbc ?? null;
  const fbc = clickId && clickIdOf(knownFbc) !== clickId ? `fb.1.${now}.${clickId}` : knownFbc;
  // Without a pixel (blocked, or not loaded yet) nobody else makes this id.
  const fbp = readRawCookie(cookieHeader, '_fbp') ?? old?.fbp ?? makeFbp(now);

  return {
    fbclid,
    fbc,
    fbp,
    utm: Object.keys(utm).length > 0 ? utm : (old?.utm ?? {}),
    firstUtm: old?.firstUtm ?? utm,
    landingUrl: old?.landingUrl ?? url.toString(),
    firstSeen: old?.firstSeen ?? now,
    externalId: old?.externalId ?? randomId(),
  };
}
