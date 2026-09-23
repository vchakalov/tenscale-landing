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
