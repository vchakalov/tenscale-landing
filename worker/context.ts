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

/**
 * The app a paid Meta click came from, read out of its click id.
 *
 * Instagram drops an ad's URL parameters on most clicks (78% of them from 20
 * October 2026) but keeps the fbclid, and the fbclid of an ad click carries an
 * `adid` field. Its first two characters name the app: `PA` Instagram, `Iw`
 * Facebook. A link in a post or a bio gets an fbclid too, without `adid`, and
 * is not a paid click. Meta does not document the format, so a click id this
 * cannot read counts as not paid.
 */
export function paidClickSource(fbclid: string | null): 'ig' | 'fb' | null {
  if (!fbclid) return null;
  const app = fbclid.startsWith('PA') ? 'ig' : fbclid.startsWith('Iw') ? 'fb' : null;
  if (!app) return null;
  try {
    const body = fbclid.slice(2).replace(/-/g, '+').replace(/_/g, '/');
    return atob(body + '='.repeat((4 - (body.length % 4)) % 4)).includes('adid') ? app : null;
  } catch {
    return null;
  }
}

/**
 * What an ad click without UTMs is: `utm_source` the app (`ig`, `fb`, the
 * codes our ads' `{{site_source_name}}` gives) and `utm_medium` paid. Null when
 * the URL has its own UTMs, or the click was not a paid one.
 */
export function lostUtm(url: URL): Record<string, string> | null {
  if (Object.keys(utmFrom(url)).length > 0) return null;
  const source = paidClickSource(url.searchParams.get('fbclid'));
  return source ? { utm_source: source, utm_medium: 'paid' } : null;
}

/*
  base64 of the UTF-8 bytes. btoa alone takes only Latin-1, so a UTM value in
  Cyrillic or with an emoji threw, and the page failed. ASCII-only cookies
  written before this read back the same.
*/
function toBase64(text: string): string {
  let binary = '';
  for (const byte of new TextEncoder().encode(text)) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function fromBase64(encoded: string): string {
  return new TextDecoder().decode(Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0)));
}

export function parseCookie(header: string | null): Partial<TrackingContext> | null {
  const raw = readRawCookie(header);
  if (!raw) return null;
  try {
    return JSON.parse(fromBase64(decodeURIComponent(raw))) as Partial<TrackingContext>;
  } catch {
    return null; // a damaged cookie is the same as no cookie
  }
}

export function serializeCookie(ctx: TrackingContext): string {
  return encodeURIComponent(toBase64(JSON.stringify(ctx)));
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
  const utm = lostUtm(url) ?? utmFrom(url);
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
