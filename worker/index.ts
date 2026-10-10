/// <reference types="@cloudflare/workers-types" />
import { sendCapi, sha256Hex } from './capi.js';
import { parseCookie, readContext, serializeCookie } from './context.js';
import { buildMetaCookie, buildSetCookie, readRawCookie } from './cookie.js';
import { parseEngagement } from './events.js';

export interface Env {
  ASSETS: Fetcher;
  META_PIXEL_ID?: string;
  META_CAPI_TOKEN?: string;
  META_TEST_EVENT_CODE?: string;
}

/** Meta's answer, one line per event, so `wrangler tail` shows what was accepted. */
function logCapi(eventName: string, result: { ok: boolean; status: number; body: string }): void {
  console.log(
    JSON.stringify({
      level: result.ok ? 'info' : 'error',
      message: `capi ${eventName} -> ${result.status}`,
      ...(result.ok ? {} : { body: result.body.slice(0, 300) }),
    }),
  );
}

/** Our own endpoint name: /collect, /track and /api/events are all in blocklists. */
const EVENT_PATH = '/booking/prep';

/**
 * The one address the site lives at. www and the old agenticalab.io served
 * the same pages with a 200, which search engines read as three copies of one
 * site splitting the same authority. They now answer a permanent redirect to
 * the same path and query here, so an old ad link keeps its fbclid and UTMs.
 * Only GET and HEAD move: a POST that got a redirect would lose its body.
 */
export const CANONICAL_HOST = 'tenscale.ai';

/**
 * PostHog, reached through our own domain. Ad blockers drop requests to
 * posthog.com, and a path called /track or /analytics is in their lists too,
 * so the browser talks to tenscale.ai/relay and the Worker forwards it.
 * Static files (the recorder, the toolbar) come from PostHog's asset host.
 */
export const RELAY_PREFIX = '/relay';
const POSTHOG_API_HOST = 'us.i.posthog.com';
const POSTHOG_ASSET_HOST = 'us-assets.i.posthog.com';

export async function relayToPosthog(request: Request, url: URL): Promise<Response> {
  const path = url.pathname.slice(RELAY_PREFIX.length) || '/';
  const host = path.startsWith('/static/') ? POSTHOG_ASSET_HOST : POSTHOG_API_HOST;
  const headers = new Headers(request.headers);
  // Our cookies are none of PostHog's business; the visitor's address is,
  // for the country breakdown, and would otherwise be the Worker's.
  headers.delete('cookie');
  const ip = request.headers.get('cf-connecting-ip');
  if (ip) headers.set('X-Forwarded-For', ip);
  const init: RequestInit = { method: request.method, headers, redirect: 'manual' };
  if (request.method !== 'GET' && request.method !== 'HEAD') init.body = await request.arrayBuffer();
  return fetch(`https://${host}${path}${url.search}`, init);
}

export function canonicalRedirect(request: Request, url: URL): Response | null {
  if (url.hostname === CANONICAL_HOST) return null;
  if (request.method !== 'GET' && request.method !== 'HEAD') return null;
  const target = new URL(url.pathname + url.search, `https://${CANONICAL_HOST}`);
  return Response.redirect(target.toString(), 301);
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === RELAY_PREFIX || url.pathname.startsWith(`${RELAY_PREFIX}/`)) {
      return relayToPosthog(request, url);
    }

    const redirect = canonicalRedirect(request, url);
    if (redirect) return redirect;

    if (request.method === 'POST' && url.pathname === EVENT_PATH) {
      await forwardEngagement(request, url, env, ctx).catch(() => undefined);
      // The same answer whatever came in: a caller learns nothing from it.
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

/**
 * A video milestone or a button click from the page, sent on to Meta with what
 * only the server knows: the visitor's address, browser and stored ids.
 */
async function forwardEngagement(request: Request, url: URL, env: Env, ctx: ExecutionContext): Promise<void> {
  if (!env.META_PIXEL_ID || !env.META_CAPI_TOKEN) return;
  const origin = request.headers.get('origin');
  if (origin && origin !== url.origin) return;
  const text = await request.text();
  if (text.length > 2048) return;
  const event = parseEngagement(JSON.parse(text), url.origin);
  if (!event) return;

  const cookie = request.headers.get('cookie');
  const stored = parseCookie(cookie);
  ctx.waitUntil(
    sendCapi(
      env.META_PIXEL_ID,
      env.META_CAPI_TOKEN,
      {
        eventName: event.eventName,
        eventId: event.eventId,
        eventTime: Math.floor(Date.now() / 1000),
        eventSourceUrl: event.sourceUrl,
        actionSource: 'website',
        userData: {
          externalId: stored?.externalId,
          fbc: readRawCookie(cookie, '_fbc') ?? stored?.fbc ?? null,
          fbp: readRawCookie(cookie, '_fbp') ?? stored?.fbp ?? null,
          clientIp: request.headers.get('cf-connecting-ip'),
          clientUserAgent: request.headers.get('user-agent'),
        },
        customData: event.customData,
      },
      fetch,
      env.META_TEST_EVENT_CODE,
    )
      .then((result) => logCapi(event.eventName, result))
      .catch(() => undefined),
  );
}

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
      // The pixel sends external_id as given; hashed here, it matches what the
      // server sends for the same visitor.
      externalIdHash: await sha256Hex(context.externalId),
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
    if (context.fbp) response.headers.append('Set-Cookie', buildMetaCookie('_fbp', context.fbp, url.hostname, CANONICAL_HOST));
    if (context.fbc) response.headers.append('Set-Cookie', buildMetaCookie('_fbc', context.fbc, url.hostname, CANONICAL_HOST));

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
        )
          .then((result) => logCapi('PageView', result))
          .catch(() => undefined),
      );
    }

    return response;
}
