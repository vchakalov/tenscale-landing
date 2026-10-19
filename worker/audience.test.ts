import { describe, expect, it } from 'vitest';
import { cameFromMeta, verdictFor } from './audience.js';

const phone = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) [FBAN/FBIOS]';

/** A request as the Worker sees it, with Cloudflare's `cf` facts attached. */
function req(headers: Record<string, string> = {}, cf: { asn?: number; country?: string } = {}): Request {
  const r = new Request('https://tenscale.ai/booking/prep', { method: 'POST', headers: { 'user-agent': phone, ...headers } });
  Object.defineProperty(r, 'cf', { value: cf });
  return r;
}

const adClick = { fbclid: 'AbC', fbc: 'fb.1.1.AbC', utm: { utm_source: 'ig' }, firstUtm: { utm_source: 'ig' } };
const direct = { fbclid: null, fbc: null, utm: {}, firstUtm: {} };

describe('cameFromMeta', () => {
  it('counts an ad click id, a Meta source now, or a Meta source on the first visit', () => {
    expect(cameFromMeta(adClick)).toBe(true);
    expect(cameFromMeta({ ...direct, fbc: 'fb.1.1.X' })).toBe(true);
    expect(cameFromMeta({ ...direct, utm: { utm_source: 'FB' } })).toBe(true);
    expect(cameFromMeta({ ...direct, utm: { utm_source: 'google' }, firstUtm: { utm_source: 'instagram' } })).toBe(true);
  });

  it('does not count anyone else', () => {
    expect(cameFromMeta(direct)).toBe(false);
    expect(cameFromMeta({ ...direct, utm: { utm_source: 'google' } })).toBe(false);
    expect(cameFromMeta(null)).toBe(false);
  });
});

describe('verdictFor', () => {
  it('reports a person who came from Meta', () => {
    expect(verdictFor(req(), adClick, {})).toBe('report');
  });

  it('skips a visitor who never came from Meta, unless the audience is everyone', () => {
    expect(verdictFor(req(), direct, {})).toBe('not_meta');
    expect(verdictFor(req(), direct, { META_AUDIENCE: 'all' })).toBe('report');
  });

  it('skips bots, Meta crawlers included, and requests with no browser at all', () => {
    expect(verdictFor(req({ 'user-agent': 'facebookexternalhit/1.1' }), adClick, {})).toBe('bot');
    expect(verdictFor(req({ 'user-agent': 'Mozilla/5.0 HeadlessChrome/131' }), adClick, {})).toBe('bot');
    const bare = new Request('https://tenscale.ai/');
    expect(verdictFor(bare, adClick, {})).toBe('bot');
  });

  it('skips hosting networks, even with an ad click id and a browser agent', () => {
    expect(verdictFor(req({}, { asn: 48090 }), adClick, { META_AUDIENCE: 'all' })).toBe('hosting');
    expect(verdictFor(req({}, { asn: 16509 }), adClick, {})).toBe('hosting');
    expect(verdictFor(req({}, { asn: 7922 }), adClick, {})).toBe('report'); // a home ISP (Comcast)
  });

  it('skips the team and excluded countries', () => {
    expect(verdictFor(req({ cookie: 'ag_team=1' }), adClick, {})).toBe('team');
    expect(verdictFor(req({}, { country: 'BG' }), adClick, { EXCLUDE_COUNTRIES: 'bg, ro' })).toBe('country');
    expect(verdictFor(req({}, { country: 'US' }), adClick, { EXCLUDE_COUNTRIES: 'BG' })).toBe('report');
  });
});
