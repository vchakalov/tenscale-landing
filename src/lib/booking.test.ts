import { describe, expect, it } from 'vitest';
import { bookingUrlWithContext } from './booking.js';

describe('bookingUrlWithContext', () => {
  it('adds the stored tracking values to the widget url', () => {
    const url = bookingUrlWithContext('https://app.iclosed.io/e/agentica/meet', {
      fbc: 'fb.1.1.AbC',
      fbp: 'fb.1.1.999',
      utm: { utm_source: 'facebook', utm_campaign: '42' },
      firstUtm: {},
      externalId: 'ext-1',
      pageViewEventId: 'ev',
      pixelId: null,
    });
    const parsed = new URL(url);
    expect(parsed.searchParams.get('utm_source')).toBe('facebook');
    expect(parsed.searchParams.get('utm_campaign')).toBe('42');
    expect(parsed.searchParams.get('fbc')).toBe('fb.1.1.AbC');
    expect(parsed.searchParams.get('fbp')).toBe('fb.1.1.999');
    expect(parsed.searchParams.get('external_id')).toBe('ext-1');
  });

  it('returns the plain url when there is no context', () => {
    expect(bookingUrlWithContext('https://app.iclosed.io/e/agentica/meet', null)).toBe('https://app.iclosed.io/e/agentica/meet');
  });
});
