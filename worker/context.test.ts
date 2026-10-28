import { describe, expect, it } from 'vitest';
import { buildSetCookie } from './cookie.js';
import { lostUtm, newFbp, paidClickSource, parseCookie, readContext, serializeCookie } from './context.js';

const NOW = 1_758_600_000_000;
const ids = () => 'rand-1';
const fbpFor = (now: number) => `fb.1.${now}.1234567890`;
const ctxFor = (url: string, cookie: string | null = null) => readContext(new URL(url), cookie, NOW, ids, fbpFor);

describe('readContext: first visit from an ad', () => {
  const ctx = ctxFor('https://agenticalab.io/landing/?utm_source=facebook&utm_medium=paid&utm_campaign=123&utm_term=456&utm_content=789&fbclid=AbC123');

  it('builds fbc in Meta format and keeps the click id case', () => {
    expect(ctx.fbc).toBe(`fb.1.${NOW}.AbC123`);
    expect(ctx.fbclid).toBe('AbC123');
  });

  it('stores last touch and first touch the same on a first visit', () => {
    expect(ctx.utm).toEqual({ utm_source: 'facebook', utm_medium: 'paid', utm_campaign: '123', utm_term: '456', utm_content: '789' });
    expect(ctx.firstUtm).toEqual(ctx.utm);
    expect(ctx.landingUrl).toContain('/landing/');
    expect(ctx.externalId).toBe('rand-1');
    expect(ctx.firstSeen).toBe(NOW);
  });
});

describe('readContext: return visit', () => {
  const first = ctxFor('https://agenticalab.io/landing/?utm_source=facebook&utm_campaign=111&fbclid=OLD');
  const cookie = `ag_ctx=${serializeCookie(first)}`;

  it('keeps the first touch, the id and the first landing url', () => {
    const later = readContext(new URL('https://agenticalab.io/landing/?utm_source=google&utm_campaign=222'), cookie, NOW + 86_400_000, () => 'rand-2');
    expect(later.externalId).toBe('rand-1');
    expect(later.firstUtm.utm_campaign).toBe('111');
    expect(later.utm.utm_campaign).toBe('222');
    expect(later.firstSeen).toBe(NOW);
  });

  it('keeps the old click id when the new visit has none', () => {
    const later = readContext(new URL('https://agenticalab.io/landing/'), cookie, NOW + 1000, ids);
    expect(later.fbclid).toBe('OLD');
    expect(later.fbc).toBe(`fb.1.${NOW}.OLD`);
  });

  it('replaces the click id when a new ad click arrives', () => {
    const later = readContext(new URL('https://agenticalab.io/landing/?fbclid=NEW'), cookie, NOW + 1000, ids);
    expect(later.fbc).toBe(`fb.1.${NOW + 1000}.NEW`);
  });
});

describe('readContext: Meta ids', () => {
  it('makes an fbp on the first visit, in Meta format', () => {
    expect(ctxFor('https://tenscale.ai/landing/').fbp).toBe(`fb.1.${NOW}.1234567890`);
    expect(newFbp(NOW)).toMatch(new RegExp(`^fb\\.1\\.${NOW}\\.\\d{10}$`));
  });

  it("reuses the pixel's own _fbp and _fbc cookies", () => {
    const ctx = ctxFor('https://tenscale.ai/landing/', '_fbp=fb.1.111.222; _fbc=fb.1.333.PixelClick');
    expect(ctx.fbp).toBe('fb.1.111.222');
    expect(ctx.fbc).toBe('fb.1.333.PixelClick');
  });

  it('keeps the first-seen time when the same click id comes back', () => {
    const ctx = ctxFor('https://tenscale.ai/landing/?fbclid=Same', '_fbc=fb.1.333.Same');
    expect(ctx.fbc).toBe('fb.1.333.Same');
  });

  it('starts a new fbc when a different click id arrives', () => {
    const ctx = ctxFor('https://tenscale.ai/landing/?fbclid=New', '_fbc=fb.1.333.Old');
    expect(ctx.fbc).toBe(`fb.1.${NOW}.New`);
  });

  it('keeps the same fbp across visits', () => {
    const first = ctxFor('https://tenscale.ai/landing/');
    const later = readContext(new URL('https://tenscale.ai/'), `ag_ctx=${serializeCookie(first)}`, NOW + 5000, ids, fbpFor);
    expect(later.fbp).toBe(first.fbp);
  });
});

describe('readContext: plain visit', () => {
  it('works without any parameters', () => {
    const ctx = ctxFor('https://agenticalab.io/landing/');
    expect(ctx.fbc).toBeNull();
    expect(ctx.utm).toEqual({});
    expect(ctx.externalId).toBe('rand-1');
  });
});

describe('cookie round trip', () => {
  it('survives serialize and parse', () => {
    const ctx = ctxFor('https://agenticalab.io/landing/?fbclid=X&utm_source=facebook');
    const back = parseCookie(`ag_ctx=${serializeCookie(ctx)}`);
    expect(back).toMatchObject({ fbclid: 'X', externalId: 'rand-1' });
  });

  it('ignores a damaged cookie instead of throwing', () => {
    expect(parseCookie('ag_ctx=not-base64-%%%')).toBeNull();
  });
});

/** A click id shaped like Meta's: two letters for the app, then base64url of its fields. */
function clickId(app: 'PA' | 'Iw', fields: string): string {
  return app + btoa(fields).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
const PAID = 'extn\x03aem\x010\x00pdof\x02adid\x01\xab7\xec_\xfc\xc3\x91srtc\x06';
const ORGANIC = 'extn\x03aem\x010\x00pdof\x02srtc\x06';

describe('an ad click that lost its UTMs', () => {
  it('tells a paid Instagram or Facebook click from its click id', () => {
    expect(paidClickSource(clickId('PA', PAID))).toBe('ig');
    expect(paidClickSource(clickId('Iw', PAID))).toBe('fb');
  });

  it('leaves a link from a post or a bio, and a click id it cannot read, unpaid', () => {
    expect(paidClickSource(clickId('PA', ORGANIC))).toBeNull();
    expect(paidClickSource('IwAR3xYz')).toBeNull();
    expect(paidClickSource('AbC123')).toBeNull();
    expect(paidClickSource(null)).toBeNull();
  });

  it('files the visit as a paid click from that app, last and first touch', () => {
    const ctx = ctxFor(`https://tenscale.ai/landing-sp/?fbclid=${clickId('PA', PAID)}`);
    expect(ctx.utm).toEqual({ utm_source: 'ig', utm_medium: 'paid' });
    expect(ctx.firstUtm).toEqual({ utm_source: 'ig', utm_medium: 'paid' });
  });

  it("never overrides the ad's own UTMs", () => {
    const url = new URL(`https://tenscale.ai/landing-sp/?utm_source=fb&utm_medium=paid&utm_campaign=42&fbclid=${clickId('PA', PAID)}`);
    expect(lostUtm(url)).toBeNull();
    expect(ctxFor(url.toString()).utm.utm_campaign).toBe('42');
  });
});

describe('buildSetCookie', () => {
  it('is a server cookie with the 400-day cap', () => {
    const value = buildSetCookie('abc');
    expect(value).toContain('Max-Age=34560000');
    expect(value).toContain('Secure');
    expect(value).toContain('HttpOnly');
    expect(value).toContain('SameSite=Lax');
  });
});
