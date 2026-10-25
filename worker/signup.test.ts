import { afterEach, describe, expect, it, vi } from 'vitest';
import { checkEmail, handleSignup, isDisposableHost } from './signup.js';

const mx = (hosts: string[] | null) => async () => hosts;
const ctx = () => {
  const pending: Promise<unknown>[] = [];
  return { pending, waitUntil: (p: Promise<unknown>) => void pending.push(p), passThroughOnException: () => {} } as never as ExecutionContext & { pending: Promise<unknown>[] };
};
const post = (body: unknown, headers: Record<string, string> = {}) =>
  new Request('https://tenscale.ai/resources/signup', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://tenscale.ai', ...headers },
    body: JSON.stringify(body),
  });
const url = new URL('https://tenscale.ai/resources/signup');

afterEach(() => vi.unstubAllGlobals());

describe('checkEmail', () => {
  it('passes a real address on a domain that takes mail', async () => {
    expect(await checkEmail('Ben@Agency.com ', mx(['aspmx.l.google.com']))).toBe('ok');
  });

  it('refuses what is not an address', async () => {
    for (const raw of ['', 'ben', 'ben@', '@agency.com', 'ben@agency', 'ben agency@x.com', 'ben@-x.com']) {
      expect(await checkEmail(raw, mx(['mx.x.com']))).toBe('invalid');
    }
  });

  it('refuses a throwaway inbox, and any subdomain of one', async () => {
    expect(await checkEmail('a@mailinator.com', mx(['mx.mailinator.com']))).toBe('disposable');
    expect(await checkEmail('a@yopmail.com', mx(['mx.yopmail.com']))).toBe('disposable');
    expect(await checkEmail('a@inbox.guerrillamail.com', mx(['mx.x.com']))).toBe('disposable');
  });

  it('refuses a new domain that hands its mail to a throwaway service', async () => {
    expect(await checkEmail('a@brand-new-temp.xyz', mx(['mx.mailinator.com']))).toBe('disposable');
  });

  it('refuses a domain that does not exist or takes no mail', async () => {
    expect(await checkEmail('a@nowhere-at-all.com', mx(null))).toBe('no_mail');
    expect(await checkEmail('a@parked.com', mx([]))).toBe('no_mail');
  });

  it('lets the person through when the resolver fails', async () => {
    expect(await checkEmail('a@agency.com', async () => { throw new Error('timeout'); })).toBe('ok');
  });

  it('does not mistake a real domain for a throwaway one', () => {
    expect(isDisposableHost('gmail.com')).toBe(false);
    expect(isDisposableHost('aspmx.l.google.com')).toBe(false);
    expect(isDisposableHost('outlook.com')).toBe(false);
  });
});

describe('handleSignup', () => {
  const env = { BRIDGE_URL: 'https://bridge.test', BRIDGE_TOKEN: 's3cret' };

  it('answers ok and files the address with the bridge', async () => {
    const fetchMock = vi.fn(async () => new Response('{}'));
    vi.stubGlobal('fetch', fetchMock);
    const c = ctx();
    const res = await handleSignup(post({ email: 'Ben@Agency.com', resource: 'ai-brain' }), url, env, c, { utm_source: 'youtube' }, mx(['mx.agency.com']));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    await Promise.all(c.pending);
    expect(fetchMock).toHaveBeenCalledOnce();
    const [target, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(target).toBe('https://bridge.test/resource?token=s3cret');
    expect(JSON.parse(init.body as string)).toEqual({
      email: 'ben@agency.com',
      resource: 'ai-brain',
      page: 'https://tenscale.ai/resources/ai-brain/',
      firstUtm: { utm_source: 'youtube' },
    });
  });

  it('tells the page why an address was refused, and files nothing', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const res = await handleSignup(post({ email: 'a@mailinator.com', resource: 'ai-brain' }), url, env, ctx(), {}, mx(['mx.mailinator.com']));
    expect(res.status).toBe(422);
    expect(await res.json()).toEqual({ ok: false, reason: 'disposable' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('refuses an unknown resource, another origin and a GET', async () => {
    expect((await handleSignup(post({ email: 'a@agency.com', resource: 'secret' }), url, env, ctx(), {}, mx(['mx.a.com']))).status).toBe(400);
    expect((await handleSignup(post({ email: 'a@agency.com', resource: 'ai-brain' }, { origin: 'https://evil.test' }), url, env, ctx(), {}, mx(['mx.a.com']))).status).toBe(403);
    expect((await handleSignup(new Request(url), url, env, ctx())).status).toBe(405);
  });

  it('tells a bot that fills the hidden field yes, and files nothing', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const res = await handleSignup(post({ email: 'a@agency.com', resource: 'ai-brain', website: 'http://spam' }), url, env, ctx(), {}, mx(['mx.a.com']));
    expect(await res.json()).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
