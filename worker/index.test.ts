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

  it('writes _fbp and _fbc as readable cookies on the site domain, for the pixel to reuse', async () => {
    const res = await worker.fetch(new Request('https://tenscale.ai/landing/?fbclid=AbC123'), envWith(html), ctx);
    const cookies = res.headers.getSetCookie();
    const fbp = cookies.find((c) => c.startsWith('_fbp='))!;
    const fbc = cookies.find((c) => c.startsWith('_fbc='))!;
    expect(fbp).toMatch(/^_fbp=fb\.1\.\d+\.\d{10};/);
    expect(fbc).toMatch(/^_fbc=fb\.1\.\d+\.AbC123;/);
    for (const c of [fbp, fbc]) {
      expect(c).toContain('Max-Age=7776000');
      expect(c).toContain('Domain=tenscale.ai');
      expect(c).not.toContain('HttpOnly');
    }
  });

  it('gives the pixel a hashed external id', async () => {
    const res = await worker.fetch(new Request('https://tenscale.ai/landing/'), envWith(html), ctx);
    expect(await res.text()).toMatch(/"externalIdHash":"[0-9a-f]{64}"/);
  });

  it('serves a page whose UTM is in Cyrillic, and reads its cookie back', async () => {
    const res = await worker.fetch(
      new Request('https://tenscale.ai/landing/?utm_campaign=%D0%9F%D1%83%D1%81%D0%BD%D0%B8%20%F0%9F%9A%80'),
      envWith(html),
      ctx,
    );
    expect(res.status).toBe(200);
    const cookie = res.headers.getSetCookie().find((c) => c.startsWith('ag_ctx='))!.split(';')[0];
    const back = await worker.fetch(new Request('https://tenscale.ai/', { headers: { cookie } }), envWith(html), ctx);
    expect(await back.text()).toContain('"utm_campaign":"Пусни 🚀"');
  });

  it('still serves the page when tracking throws after reading it', async () => {
    // The cookie is encoded after the page body has been read: the case that took the site down.
    const spy = vi.spyOn(globalThis, 'btoa').mockImplementation(() => {
      throw new Error('boom');
    });
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    try {
      const res = await worker.fetch(new Request('https://tenscale.ai/landing/'), envWith(html), ctx);
      expect(res.status).toBe(200);
      expect(await res.text()).toBe(html);
    } finally {
      spy.mockRestore();
      log.mockRestore();
    }
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

describe('who Meta hears about, decided on the page response', () => {
  const meta = { META_PIXEL_ID: 'PIX1', META_CAPI_TOKEN: 'TOK1' };
  const phone = { 'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) [FBAN/FBIOS]' };
  async function open(url: string, headers: Record<string, string> = phone, extra: Record<string, string> = {}) {
    const sent: unknown[] = [];
    const original = globalThis.fetch;
    const pending: Promise<unknown>[] = [];
    const waitCtx = { waitUntil: (p: Promise<unknown>) => void pending.push(p), passThroughOnException: () => {} } as never;
    globalThis.fetch = (async (_input: RequestInfo | URL, req?: RequestInit) => {
      sent.push(req?.body);
      return new Response('{}');
    }) as typeof fetch;
    try {
      const res = await worker.fetch(new Request(url, { headers }), envWith(html, { ...meta, ...extra }), waitCtx);
      await Promise.all(pending);
      const body = await res.text();
      const report = /"report":(true|false)/.exec(body)?.[1];
      return { sent, report: report === 'true', cookies: res.headers.getSetCookie() };
    } finally {
      globalThis.fetch = original;
    }
  }

  it('sends nothing to Meta for a page download: the page sends its own PageView once it runs', async () => {
    expect((await open('https://tenscale.ai/landing/?fbclid=AbC123')).sent).toEqual([]);
  });

  it('tells the page to start the pixel for a person from a Meta ad', async () => {
    expect((await open('https://tenscale.ai/landing/?fbclid=AbC123&utm_source=ig')).report).toBe(true);
  });

  it('keeps the pixel off for a visitor who never came from Meta, and for a crawler', async () => {
    expect((await open('https://tenscale.ai/landing/')).report).toBe(false);
    expect((await open('https://tenscale.ai/landing/?utm_source=google')).report).toBe(false);
    expect((await open('https://tenscale.ai/landing/?fbclid=AbC123', { 'user-agent': 'facebookexternalhit/1.1' })).report).toBe(false);
  });

  it('reports everyone real when the audience is switched to all', async () => {
    expect((await open('https://tenscale.ai/landing/', phone, { META_AUDIENCE: 'all' })).report).toBe(true);
  });

  it('marks a browser as the team from the team link, and never reports it', async () => {
    const joined = await open('https://tenscale.ai/?team=s3cret&fbclid=AbC123', phone, { TEAM_KEY: 's3cret' });
    expect(joined.report).toBe(false);
    expect(joined.cookies.find((c) => c.startsWith('ag_team=1'))).toContain('HttpOnly');
    const wrongKey = await open('https://tenscale.ai/?team=guess&fbclid=AbC123', phone, { TEAM_KEY: 's3cret' });
    expect(wrongKey.cookies.some((c) => c.startsWith('ag_team='))).toBe(false);
    expect((await open('https://tenscale.ai/landing/?fbclid=AbC123', { ...phone, cookie: 'ag_team=1' })).report).toBe(false);
  });
});

describe('POST /booking/prep', () => {
  it('answers ok', async () => {
    const res = await worker.fetch(new Request('https://tenscale.ai/booking/prep', { method: 'POST', body: '{"step":"open"}' }), envWith(html), ctx);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });
});

describe('engagement events to Meta', () => {
  const meta = { META_PIXEL_ID: 'PIX1', META_CAPI_TOKEN: 'TOK1' };
  /** A phone that arrived from a Meta ad: the visitor these events are for. */
  const fromAd = { 'user-agent': 'Mozilla/5.0 (iPhone) [FBAN/FBIOS]', cookie: '_fbc=fb.1.1.Click' };
  async function post(body: unknown, extra: Record<string, string> = {}) {
    const headers = { ...fromAd, ...extra };
    const sent: Record<string, unknown>[] = [];
    const original = globalThis.fetch;
    const pending: Promise<unknown>[] = [];
    const waitCtx = { waitUntil: (p: Promise<unknown>) => void pending.push(p), passThroughOnException: () => {} } as never;
    globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
      sent.push(JSON.parse(init!.body as string).data[0]);
      return new Response('{}');
    }) as typeof fetch;
    try {
      const res = await worker.fetch(
        new Request('https://tenscale.ai/booking/prep', { method: 'POST', body: JSON.stringify(body), headers }),
        envWith(html, meta),
        waitCtx,
      );
      await Promise.all(pending);
      expect(res.status).toBe(200);
    } finally {
      globalThis.fetch = original;
    }
    return sent;
  }
  const video = {
    event_name: 'VideoProgress',
    event_id: 'b7f0c2de-1111-4a2b-9c3d-123456789abc',
    params: { video_id: 'vsl', percent: 50 },
    url: 'https://tenscale.ai/thank-you/?Invitee_email=a%40b.com',
  };

  it('forwards an allowed event with the stored ids, the visitor address and a clean URL', async () => {
    const [event] = await post(video, {
      cookie: '_fbp=fb.1.1.2222222222; _fbc=fb.1.1.Click',
      'cf-connecting-ip': '1.2.3.4',
      'user-agent': 'UA',
    });
    expect(event).toMatchObject({
      event_name: 'VideoProgress',
      event_id: video.event_id,
      action_source: 'website',
      event_source_url: 'https://tenscale.ai/thank-you/',
      custom_data: { video_id: 'vsl', percent: 50 },
      user_data: { fbp: 'fb.1.1.2222222222', fbc: 'fb.1.1.Click', client_ip_address: '1.2.3.4', client_user_agent: 'UA' },
    });
  });

  it('drops names and values that are not on the list, and other origins', async () => {
    expect(await post({ ...video, event_name: 'Purchase' })).toEqual([]);
    expect(await post({ ...video, params: { video_id: 'vsl', percent: 33 } })).toEqual([]);
    expect(await post({ ...video, params: { button_id: 'nope' }, event_name: 'ButtonClick' })).toEqual([]);
    expect(await post({ ...video, url: 'https://evil.example/' })).toEqual([]);
    expect(await post(video, { origin: 'https://evil.example' })).toEqual([]);
    expect(await post('not json')).toEqual([]);
  });

  it('forwards the PageView the page sends once it runs, under the event id the pixel used', async () => {
    const [view] = await post({ event_name: 'PageView', event_id: video.event_id, params: {}, url: 'https://tenscale.ai/landing/?fbclid=Click' });
    expect(view).toMatchObject({ event_name: 'PageView', event_id: video.event_id, event_source_url: 'https://tenscale.ai/landing/' });
  });

  it('sends nothing for a visitor who never came from Meta, the team, or a crawler', async () => {
    expect(await post(video, { cookie: '' })).toEqual([]);
    expect(await post(video, { cookie: '_fbc=fb.1.1.Click; ag_team=1' })).toEqual([]);
    expect(await post(video, { 'user-agent': 'facebookexternalhit/1.1' })).toEqual([]);
  });

  it('accepts ButtonClick and ViewContent', async () => {
    const [click] = await post({ ...video, event_name: 'ButtonClick', params: { button_id: 'sticky_mobile' } });
    expect(click.custom_data).toEqual({ button_id: 'sticky_mobile' });
    const [view] = await post({ ...video, event_name: 'ViewContent', params: { content_name: 'vsl' } });
    expect(view.custom_data).toEqual({ content_name: 'vsl' });
  });

  it('accepts CalendarOpen from a known button, and nothing else under that name', async () => {
    const [open] = await post({ ...video, event_name: 'CalendarOpen', params: { source: 'hero' } });
    expect(open).toMatchObject({ event_name: 'CalendarOpen', custom_data: { source: 'hero' } });
    const [fromLanding] = await post({ ...video, event_name: 'CalendarOpen', params: { source: 'sticky_mobile' } });
    expect(fromLanding.custom_data).toEqual({ source: 'sticky_mobile' });
    expect(await post({ ...video, event_name: 'CalendarOpen', params: { source: 'anything' } })).toEqual([]);
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
