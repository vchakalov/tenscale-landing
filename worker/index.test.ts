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
    const res = await worker.fetch(new Request('https://tenscale.ai/landing/?fbclid=AbC123'), envWith(html), ctx);
    const cookie = res.headers.get('set-cookie')!;
    expect(cookie).toContain('ag_ctx=');
    expect(cookie).toContain('HttpOnly');
    expect(cookie).toContain('Max-Age=34560000');
  });

  it('injects the context for the page to read', async () => {
    const res = await worker.fetch(new Request('https://tenscale.ai/landing/?fbclid=AbC123&utm_campaign=42'), envWith(html), ctx);
    const body = await res.text();
    expect(body).toContain('window.__ag=');
    expect(body).toContain('AbC123');
    expect(body).toContain('"utm_campaign":"42"');
  });

  it('leaves a non-HTML asset untouched', async () => {
    const env = { ASSETS: { fetch: async () => new Response('body{}', { headers: { 'content-type': 'text/css' } }) } } as never;
    const res = await worker.fetch(new Request('https://tenscale.ai/style.css'), env, ctx);
    expect(res.headers.get('set-cookie')).toBeNull();
  });

  it('sends nothing to Meta when the pixel is not configured', async () => {
    const spy = vi.spyOn(globalThis, 'fetch');
    await worker.fetch(new Request('https://tenscale.ai/landing/'), envWith(html), ctx);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe('POST /booking/prep', () => {
  it('answers ok', async () => {
    const res = await worker.fetch(new Request('https://tenscale.ai/booking/prep', { method: 'POST', body: '{"step":"open"}' }), envWith(html), ctx);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });
});

describe('canonical host', () => {
  it('sends www and the old domain to tenscale.ai with a 301, keeping path and query', async () => {
    for (const host of ['www.tenscale.ai', 'agenticalab.io', 'www.agenticalab.io']) {
      const res = await worker.fetch(new Request(`https://${host}/landing/?fbclid=AbC123&utm_campaign=42`), envWith(html), ctx);
      expect(res.status).toBe(301);
      expect(res.headers.get('location')).toBe('https://tenscale.ai/landing/?fbclid=AbC123&utm_campaign=42');
    }
  });

  it('serves tenscale.ai itself without a redirect', async () => {
    const res = await worker.fetch(new Request('https://tenscale.ai/'), envWith(html), ctx);
    expect(res.status).toBe(200);
  });

  it('never redirects a POST, which would drop its body', async () => {
    const res = await worker.fetch(new Request('https://agenticalab.io/booking/prep', { method: 'POST', body: '{}' }), envWith(html), ctx);
    expect(res.status).toBe(200);
  });
});

describe('PostHog relay', () => {
  it('forwards /relay/* to PostHog without our cookies, with the visitor IP', async () => {
    const seen: { url: string; cookie: string | null; xff: string | null; body: string }[] = [];
    const original = globalThis.fetch;
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const h = new Headers(init?.headers);
      seen.push({
        url: String(input),
        cookie: h.get('cookie'),
        xff: h.get('x-forwarded-for'),
        body: init?.body ? new TextDecoder().decode(init.body as ArrayBuffer) : '',
      });
      return new Response('ok');
    }) as typeof fetch;
    try {
      await worker.fetch(
        new Request('https://tenscale.ai/relay/e/?ver=1', {
          method: 'POST',
          body: '{"event":"x"}',
          headers: { cookie: 'ag_ctx=secret', 'cf-connecting-ip': '1.2.3.4' },
        }),
        envWith(html),
        ctx,
      );
      await worker.fetch(new Request('https://tenscale.ai/relay/static/recorder.js'), envWith(html), ctx);
    } finally {
      globalThis.fetch = original;
    }
    expect(seen[0]).toEqual({ url: 'https://us.i.posthog.com/e/?ver=1', cookie: null, xff: '1.2.3.4', body: '{"event":"x"}' });
    expect(seen[1].url).toBe('https://us-assets.i.posthog.com/static/recorder.js');
  });
});
