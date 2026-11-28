// Standard Webhooks signature check (used by Supabase Auth hooks).
// secret "v1,whsec_<base64>"; header webhook-signature "v1,<base64> v1,<base64>"; signed text "<webhook-id>.<webhook-timestamp>.<body>" with HMAC-SHA256.
const b64 = (s: string) => Uint8Array.from(atob(s), c => c.charCodeAt(0));
const tob64 = (b: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(b)));
export async function signStd(secret: string, id: string, ts: string, body: string): Promise<string> {
  const raw = secret.replace(/^v1,/, '').replace(/^whsec_/, '');
  const key = await crypto.subtle.importKey('raw', b64(raw), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return tob64(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${id}.${ts}.${body}`)));
}
export async function verifyStd(secret: string, headers: Headers, body: string, now = Date.now()): Promise<boolean> {
  const id = headers.get('webhook-id'), ts = headers.get('webhook-timestamp'), sig = headers.get('webhook-signature');
  if (!secret || !id || !ts || !sig) return false;
  if (Math.abs(now / 1000 - Number(ts)) > 300) return false;   // older than 5 minutes: replay
  const want = await signStd(secret, id, ts, body);
  return sig.split(' ').some(p => { const v = p.split(',')[1] || ''; if (v.length !== want.length) return false; let d = 0; for (let i = 0; i < v.length; i++) d |= v.charCodeAt(i) ^ want.charCodeAt(i); return d === 0; });
}
