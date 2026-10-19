import { readRawCookie } from './cookie.js';
import type { TrackingContext } from './context.js';

/**
 * Who Meta hears about.
 *
 * From October 2026 the dataset gets real people who came from Meta and no one
 * else. The first dataset was 98% bots: the Worker sent a PageView for every
 * HTML download, and scanners on hosting networks downloaded thousands. Every
 * booking in it was a team test. Ben chose to start the new dataset narrow:
 * a visitor counts only after arriving from Facebook or Instagram, at least
 * once, by an ad click id or a Meta `utm_source`. The cookie keeps both, so a
 * visitor who clicked an ad and comes back later from Google still counts.
 *
 * What it gives up: a person who saw an ad without clicking and came by
 * another way. The research said to send every real person; Ben judged the
 * bot risk outside Meta traffic the bigger one for now. `META_AUDIENCE=all`
 * switches to every real person; the other filters stay either way.
 */

/** `utm_source` values that mean Meta: our `{{site_source_name}}` codes and the spelled-out names. */
export const META_SOURCES = new Set(['fb', 'ig', 'an', 'msg', 'th', 'facebook', 'instagram', 'messenger', 'threads']);

/** Agents that announce themselves as scripts, crawlers or speed tests, Meta's own crawlers included. */
export const BOT_AGENT =
  /bot|crawl|spider|slurp|facebookexternalhit|meta-external|headless|lighthouse|pagespeed|python|curl|wget|httpclient|go-http|okhttp|axios|node-fetch|scrapy/i;

/**
 * Cloud and hosting networks. People browse from homes and phones; requests
 * from these come from servers, and a headless browser there can run our
 * JavaScript. iCloud Private Relay and VPN networks are deliberately absent:
 * real people use them.
 */
export const HOSTING_ASNS = new Set([
  16509, 14618, // Amazon AWS
  15169, 396982, // Google Cloud
  8075, // Microsoft Azure
  31898, // Oracle Cloud
  14061, // DigitalOcean
  24940, // Hetzner
  16276, // OVH
  63949, // Linode
  20473, // Vultr
  51167, // Contabo
  12876, // Scaleway
  45102, // Alibaba Cloud
  132203, // Tencent Cloud
  48090, // Techoff Srv: the scanner caught on 19 October 2026
]);

/** Set once from the team link, so our own visits never reach Meta. */
export const TEAM_COOKIE = 'ag_team';

export type Verdict = 'report' | 'not_meta' | 'team' | 'country' | 'hosting' | 'bot';

export interface AudienceEnv {
  META_AUDIENCE?: string;
  /** Comma-separated ISO country codes whose visitors are never reported, e.g. "BG". */
  EXCLUDE_COUNTRIES?: string;
}

type Touch = Pick<TrackingContext, 'fbclid' | 'fbc' | 'utm' | 'firstUtm'>;

export function cameFromMeta(ctx: Partial<Touch> | null): boolean {
  if (!ctx) return false;
  if (ctx.fbclid || ctx.fbc) return true;
  return [ctx.utm?.utm_source, ctx.firstUtm?.utm_source].some((s) => !!s && META_SOURCES.has(s.toLowerCase()));
}

/** Whether this request's visitor may be reported to Meta, and if not, why. */
export function verdictFor(request: Request, ctx: Partial<Touch> | null, env: AudienceEnv): Verdict {
  if (BOT_AGENT.test(request.headers.get('user-agent') ?? 'bot')) return 'bot';
  const cf = (request as { cf?: { asn?: number; country?: string } }).cf;
  if (cf?.asn && HOSTING_ASNS.has(cf.asn)) return 'hosting';
  if (readRawCookie(request.headers.get('cookie'), TEAM_COOKIE) === '1') return 'team';
  const excluded = (env.EXCLUDE_COUNTRIES ?? '').split(',').map((c) => c.trim().toUpperCase()).filter(Boolean);
  if (cf?.country && excluded.includes(cf.country.toUpperCase())) return 'country';
  if ((env.META_AUDIENCE ?? 'meta') !== 'all' && !cameFromMeta(ctx)) return 'not_meta';
  return 'report';
}
