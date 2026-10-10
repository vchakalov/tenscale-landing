export const COOKIE_NAME = 'ag_ctx';
const MAX_AGE_SECONDS = 400 * 24 * 60 * 60; // Chrome caps any cookie at 400 days

export function readRawCookie(header: string | null, name: string = COOKIE_NAME): string | null {
  if (!header) return null;
  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) return rest.join('=');
  }
  return null;
}

export function buildSetCookie(value: string, name: string = COOKIE_NAME): string {
  // Written on the document response, never from JavaScript: Safari caps
  // document.cookie to 24 hours on an ad-click landing (ITP 2.2).
  return `${name}=${value}; Path=/; Max-Age=${MAX_AGE_SECONDS}; Secure; HttpOnly; SameSite=Lax`;
}

const META_MAX_AGE_SECONDS = 90 * 24 * 60 * 60;

/**
 * `_fbp` and `_fbc`, the cookies the Meta pixel would write, written by us on
 * the page response so they exist even when the pixel is blocked, and so
 * Safari does not cut them to a day the way it does a cookie set from
 * JavaScript. Not HttpOnly: the pixel must be able to read and reuse them.
 * The domain matches the one the pixel writes to, so there is never a second
 * copy of either.
 */
export function buildMetaCookie(name: '_fbp' | '_fbc', value: string, host: string, siteHost: string): string {
  const onSite = host === siteHost || host.endsWith(`.${siteHost}`);
  return `${name}=${value}; Path=/; Max-Age=${META_MAX_AGE_SECONDS}; Secure; SameSite=Lax${onSite ? `; Domain=${siteHost}` : ''}`;
}
