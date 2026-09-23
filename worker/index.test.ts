import { describe, expect, it, vi } from 'vitest';
import worker from './index.js';

function envWith(html: string, extra: Record<string, string> = {}) {
  return {
    ASSETS: { fetch: async () => new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' } }) },
    ...extra,
  } as never;
}
const ctx = { waitUntil: (p: Promise<unknown>) => void p, passThroughOnException: () => {} } as never;
const html = '<html><head><title>t</title></head><body>hi</body></html>';

describe('page requests', () => {
  it('sets the first-party cookie on the page response', async () => {
    const res = await worker.fetch(new Request('https://agenticalab.io/landing/?fbclid=AbC123'), envWith(html), ctx);
    const cookie = res.headers.get('set-cookie')!;
    expect(cookie).toContain('ag_ctx=');
    expect(cookie).toContain('HttpOnly');
    expect(cookie).toContain('Max-Age=34560000');
  });

  it('injects the context for the page to read', async () => {
    const res = await worker.fetch(new Request('https://agenticalab.io/landing/?fbclid=AbC123&utm_campaign=42'), envWith(html), ctx);
    const body = await res.text();
    expect(body).toContain('window.__ag=');
    expect(body).toContain('AbC123');
    expect(body).toContain('"utm_campaign":"42"');
  });

  it('leaves a non-HTML asset untouched', async () => {
    const env = { ASSETS: { fetch: async () => new Response('body{}', { headers: { 'content-type': 'text/css' } }) } } as never;
    const res = await worker.fetch(new Request('https://agenticalab.io/style.css'), env, ctx);
    expect(res.headers.get('set-cookie')).toBeNull();
  });

  it('sends nothing to Meta when the pixel is not configured', async () => {
    const spy = vi.spyOn(globalThis, 'fetch');
    await worker.fetch(new Request('https://agenticalab.io/landing/'), envWith(html), ctx);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe('POST /booking/prep', () => {
  it('answers ok', async () => {
    const res = await worker.fetch(new Request('https://agenticalab.io/booking/prep', { method: 'POST', body: '{"step":"open"}' }), envWith(html), ctx);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });
});
