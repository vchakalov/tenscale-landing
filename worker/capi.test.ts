import { describe, expect, it, vi } from 'vitest';
import { buildPayload, normalizeEmail, normalizePhone, sendCapi, sha256Hex } from './capi.js';

const event = {
  eventName: 'Lead',
  eventId: 'ev-1',
  eventTime: 1_758_600_000,
  eventSourceUrl: 'https://agenticalab.io/landing/',
  actionSource: 'website' as const,
  userData: {
    em: 'John_Smith@Gmail.com ',
    ph: '(650) 555-1212',
    externalId: 'rand-1',
    fbc: 'fb.1.1758600000000.AbC123',
    fbp: 'fb.1.1758600000000.999',
    clientIp: '1.2.3.4',
    clientUserAgent: 'Mozilla/5.0',
  },
};

describe('normalizing', () => {
  it('lowercases and trims an email, and strips everything but digits from a phone', () => {
    expect(normalizeEmail(' John_Smith@Gmail.com ')).toBe('john_smith@gmail.com');
    expect(normalizePhone('(650) 555-1212')).toBe('6505551212');
  });
});

describe('buildPayload', () => {
  it('hashes email and phone, and never hashes fbc, fbp, ip or user agent', async () => {
    const payload = (await buildPayload(event)) as { data: { user_data: Record<string, string>; event_name: string; action_source: string; event_source_url: string }[] };
    const u = payload.data[0].user_data;
    expect(u.em).toBe(await sha256Hex('john_smith@gmail.com'));
    expect(u.ph).toBe(await sha256Hex('6505551212'));
    expect(u.fbc).toBe('fb.1.1758600000000.AbC123');
    expect(u.fbp).toBe('fb.1.1758600000000.999');
    expect(u.client_ip_address).toBe('1.2.3.4');
    expect(u.client_user_agent).toBe('Mozilla/5.0');
    expect(payload.data[0].event_name).toBe('Lead');
    expect(payload.data[0].action_source).toBe('website');
    expect(payload.data[0].event_source_url).toBe('https://agenticalab.io/landing/');
  });

  it('leaves out what it does not have', async () => {
    const payload = (await buildPayload({ ...event, userData: { externalId: 'x' } })) as { data: { user_data: Record<string, string> }[] };
    expect(Object.keys(payload.data[0].user_data)).toEqual(['external_id']);
  });

  it('adds the test code only when given', async () => {
    const plain = (await buildPayload(event)) as Record<string, unknown>;
    expect(plain.test_event_code).toBeUndefined();
    const test = (await buildPayload(event, 'TEST123')) as Record<string, unknown>;
    expect(test.test_event_code).toBe('TEST123');
  });
});

describe('sendCapi', () => {
  it('posts to the right graph endpoint with the token', async () => {
    const calls: { url: string; init: RequestInit }[] = [];
    const fn = (async (url: string, init: RequestInit) => {
      calls.push({ url, init });
      return new Response('{"events_received":1}', { status: 200 });
    }) as unknown as typeof fetch;

    const res = await sendCapi('PIX1', 'TOK1', event, fn);

    expect(res.ok).toBe(true);
    expect(calls[0].url).toBe('https://graph.facebook.com/v23.0/PIX1/events?access_token=TOK1');
    expect(JSON.parse(calls[0].init.body as string).data[0].event_id).toBe('ev-1');
  });

  it('reports a failure instead of throwing', async () => {
    const fn = (async () => new Response('{"error":{"message":"bad"}}', { status: 400 })) as unknown as typeof fetch;
    const res = await sendCapi('PIX1', 'TOK1', event, fn);
    expect(res).toMatchObject({ ok: false, status: 400 });
  });
});
