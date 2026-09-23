/// <reference types="@cloudflare/workers-types" />
import { sendCapi } from './capi.js';
import { readContext, serializeCookie } from './context.js';
import { buildSetCookie } from './cookie.js';

export interface Env {
  ASSETS: Fetcher;
  META_PIXEL_ID?: string;
  META_CAPI_TOKEN?: string;
  META_TEST_EVENT_CODE?: string;
}

/** Our own endpoint name: /collect, /track and /api/events are all in blocklists. */
const EVENT_PATH = '/booking/prep';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'POST' && url.pathname === EVENT_PATH) {
      return Response.json({ ok: true });
    }

    const asset = await env.ASSETS.fetch(request);
    try {
      return await withTracking(request, url, asset, env, ctx);
    } catch (error) {
      // The page must never break because of tracking. Serve it untouched.
      console.log(JSON.stringify({ level: 'error', message: `tracking failed: ${String(error)}` }));
      return asset;
    }
  },
};

async function withTracking(request: Request, url: URL, asset: Response, env: Env, ctx: ExecutionContext): Promise<Response> {
    const type = asset.headers.get('content-type') ?? '';
    if (!type.includes('text/html')) return asset;

    const now = Date.now();
    const context = readContext(url, request.headers.get('cookie'), now, () => crypto.randomUUID());
    const eventId = crypto.randomUUID();

    const injected = {
      fbc: context.fbc,
      fbp: context.fbp,
      utm: context.utm,
      firstUtm: context.firstUtm,
      externalId: context.externalId,
      pageViewEventId: eventId,
      pixelId: env.META_PIXEL_ID ?? null,
    };

    // A text insert, not HTMLRewriter: the pages are a small static export, and
    // this runs the same way in tests as in the Worker runtime.
    const html = await asset.text();
    const tag = `<script>window.__ag=${JSON.stringify(injected).replace(/</g, '\\u003c')}</script>`;
    const withTag = html.includes('</head>') ? html.replace('</head>', `${tag}</head>`) : tag + html;
    const response = new Response(withTag, asset);

    response.headers.append('Set-Cookie', buildSetCookie(serializeCookie(context)));

    if (env.META_PIXEL_ID && env.META_CAPI_TOKEN) {
      ctx.waitUntil(
        sendCapi(
          env.META_PIXEL_ID,
          env.META_CAPI_TOKEN,
          {
            eventName: 'PageView',
            eventId,
            eventTime: Math.floor(now / 1000),
            eventSourceUrl: url.toString(),
            actionSource: 'website',
            userData: {
              externalId: context.externalId,
              fbc: context.fbc,
              fbp: context.fbp,
              clientIp: request.headers.get('cf-connecting-ip'),
              clientUserAgent: request.headers.get('user-agent'),
            },
          },
          fetch,
          env.META_TEST_EVENT_CODE,
        ).catch(() => undefined),
      );
    }

    return response;
}
