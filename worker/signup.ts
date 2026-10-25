import { disposableEmailBlocklist } from 'disposable-email-domains-js';

/**
 * The email gate in front of a free resource (src/app/resources).
 *
 * An address passes when it is shaped like one, its domain is not a
 * throwaway inbox, and the domain can receive mail. The throwaway list is the
 * community one PyPI uses (disposable-email-domains, ~9k domains). A new
 * throwaway domain that is not on it yet usually still hands its mail to a
 * service that is, so the mail servers are checked against the list too.
 *
 * The page gets a reason it can show; the address goes on to the bridge,
 * which files it in GHL with the resource's tag.
 */
export const SIGNUP_PATH = '/resources/signup';
export const RESOURCES = ['ai-brain'] as const;
type Resource = (typeof RESOURCES)[number];

export type Verdict = 'ok' | 'invalid' | 'disposable' | 'no_mail';

const DISPOSABLE = new Set(disposableEmailBlocklist());
const EMAIL = /^[^\s@]+@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/;

/** mail.mailinator.com is mailinator.com: the host and every parent but the TLD. */
export function isDisposableHost(host: string): boolean {
  const parts = host.toLowerCase().replace(/\.$/, '').split('.');
  for (let i = 0; i < parts.length - 1; i++) {
    if (DISPOSABLE.has(parts.slice(i).join('.'))) return true;
  }
  return false;
}

/**
 * The domain's mail servers, from Cloudflare's resolver over HTTPS: `null`
 * when the domain does not exist, an empty list when it takes no mail
 * (no MX, or the "0 ." record that says so outright).
 */
export async function mxHosts(domain: string): Promise<string[] | null> {
  const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=MX`, {
    headers: { accept: 'application/dns-json' },
  });
  if (!res.ok) throw new Error(`dns ${res.status}`);
  const body = (await res.json()) as { Status: number; Answer?: { type: number; data: string }[] };
  if (body.Status === 3) return null;
  if (body.Status !== 0) throw new Error(`dns status ${body.Status}`);
  return (body.Answer ?? [])
    .filter((answer) => answer.type === 15)
    .map((answer) => (answer.data.trim().split(/\s+/)[1] ?? '').replace(/\.$/, '').toLowerCase())
    .filter((host) => host !== '');
}

export async function checkEmail(raw: string, resolve: (domain: string) => Promise<string[] | null> = mxHosts): Promise<Verdict> {
  const email = raw.trim().toLowerCase();
  if (email.length > 254 || !EMAIL.test(email)) return 'invalid';
  const domain = email.slice(email.lastIndexOf('@') + 1);
  if (isDisposableHost(domain)) return 'disposable';

  let hosts: string[] | null;
  try {
    hosts = await resolve(domain);
  } catch {
    // A resolver that does not answer says nothing about the person: let them through.
    return 'ok';
  }
  if (hosts === null || hosts.length === 0) return 'no_mail';
  if (hosts.some(isDisposableHost)) return 'disposable';
  return 'ok';
}

export interface SignupEnv {
  /** integration-bridge, and its webhook token (a secret). Without both, nothing is filed. */
  BRIDGE_URL?: string;
  BRIDGE_TOKEN?: string;
}

function answer(body: { ok: boolean; reason?: Verdict }, status = 200): Response {
  return Response.json(body, { status, headers: { 'cache-control': 'no-store' } });
}

export async function handleSignup(
  request: Request,
  url: URL,
  env: SignupEnv,
  ctx: ExecutionContext,
  firstUtm: Record<string, string> = {},
  resolve?: (domain: string) => Promise<string[] | null>,
): Promise<Response> {
  if (request.method !== 'POST') return new Response('method not allowed', { status: 405 });
  const origin = request.headers.get('origin');
  if (origin && origin !== url.origin) return answer({ ok: false, reason: 'invalid' }, 403);

  const text = await request.text();
  let body: { email?: unknown; resource?: unknown; website?: unknown } = {};
  try {
    body = text.length <= 2048 ? JSON.parse(text) : {};
  } catch {
    // an unreadable body is an invalid one
  }
  const resource = RESOURCES.find((r) => r === body.resource);
  if (!resource || typeof body.email !== 'string') return answer({ ok: false, reason: 'invalid' }, 400);

  // A field no person sees or fills: a bot that fills it is told yes and filed nowhere.
  if (typeof body.website === 'string' && body.website !== '') return answer({ ok: true });

  const email = body.email.trim().toLowerCase();
  const verdict = await checkEmail(email, resolve);
  // The domain only: the address itself stays out of the logs.
  console.log(JSON.stringify({ level: 'info', message: `signup ${resource}: ${verdict}`, domain: email.split('@')[1] ?? '' }));
  if (verdict !== 'ok') return answer({ ok: false, reason: verdict }, 422);

  if (env.BRIDGE_URL && env.BRIDGE_TOKEN) {
    ctx.waitUntil(fileWithBridge(env.BRIDGE_URL, env.BRIDGE_TOKEN, email, resource, url, firstUtm));
  }
  return answer({ ok: true });
}

async function fileWithBridge(
  bridgeUrl: string,
  token: string,
  email: string,
  resource: Resource,
  url: URL,
  firstUtm: Record<string, string>,
): Promise<void> {
  try {
    const res = await fetch(`${bridgeUrl}/resource?token=${encodeURIComponent(token)}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, resource, page: `${url.origin}/resources/${resource}/`, firstUtm }),
    });
    if (!res.ok) throw new Error(`bridge ${res.status}`);
  } catch (error) {
    console.log(JSON.stringify({ level: 'error', message: `signup ${resource} not filed: ${String(error)}` }));
  }
}
