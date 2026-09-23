export interface CapiUserData {
  em?: string;
  ph?: string;
  fn?: string;
  ln?: string;
  externalId?: string;
  fbc?: string | null;
  fbp?: string | null;
  clientIp?: string | null;
  clientUserAgent?: string | null;
}

export interface CapiEvent {
  eventName: string;
  eventId: string;
  eventTime: number;
  eventSourceUrl: string;
  actionSource: 'website' | 'phone_call' | 'other' | 'system_generated';
  userData: CapiUserData;
  customData?: Record<string, unknown>;
}

const GRAPH_VERSION = 'v23.0';

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function normalizePhone(value: string): string {
  return value.replace(/\D/g, '').replace(/^0+/, '');
}

export async function sha256Hex(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function buildPayload(event: CapiEvent, testCode?: string): Promise<unknown> {
  const u = event.userData;
  const user_data: Record<string, string> = {};
  if (u.em) user_data.em = await sha256Hex(normalizeEmail(u.em));
  if (u.ph) user_data.ph = await sha256Hex(normalizePhone(u.ph));
  if (u.fn) user_data.fn = await sha256Hex(u.fn.trim().toLowerCase());
  if (u.ln) user_data.ln = await sha256Hex(u.ln.trim().toLowerCase());
  if (u.externalId) user_data.external_id = u.externalId;
  // Never hashed, by Meta's rule:
  if (u.fbc) user_data.fbc = u.fbc;
  if (u.fbp) user_data.fbp = u.fbp;
  if (u.clientIp) user_data.client_ip_address = u.clientIp;
  if (u.clientUserAgent) user_data.client_user_agent = u.clientUserAgent;

  return {
    data: [
      {
        event_name: event.eventName,
        event_id: event.eventId,
        event_time: event.eventTime,
        event_source_url: event.eventSourceUrl,
        action_source: event.actionSource,
        user_data,
        ...(event.customData ? { custom_data: event.customData } : {}),
      },
    ],
    ...(testCode ? { test_event_code: testCode } : {}),
  };
}

export async function sendCapi(
  pixelId: string,
  token: string,
  event: CapiEvent,
  fetchFn: typeof fetch = fetch,
  testCode?: string,
): Promise<{ ok: boolean; status: number; body: string }> {
  const payload = await buildPayload(event, testCode);
  const res = await fetchFn(`https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const body = await res.text();
  return { ok: res.ok, status: res.status, body };
}
