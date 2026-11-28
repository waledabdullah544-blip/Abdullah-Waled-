// Paymob (Egypt) helpers, shared by paymob-checkout and paymob-webhook. No Deno- or Node-only APIs: runs in both (tests run it in Node).
// API used: Create Intention  POST https://accept.paymob.com/v1/intention/  (Authorization: Token <secret key>)
//           Unified Checkout  https://accept.paymob.com/unifiedcheckout/?publicKey=<public key>&clientSecret=<client_secret>
//           Transaction processed callback: JSON {type:"TRANSACTION", obj:{...}}, ?hmac=<hex> = HMAC-SHA512(hmac secret, values of HMAC_KEYS joined)
// Check these against your Paymob dashboard docs when the merchant account is opened (README lists what to verify).

export const PAYMOB_BASE = 'https://accept.paymob.com';

/** the keys of the transaction callback that are signed, in order */
export const HMAC_KEYS = ['amount_cents', 'created_at', 'currency', 'error_occured', 'has_parent_transaction', 'id', 'integration_id',
  'is_3d_secure', 'is_auth', 'is_capture', 'is_refunded', 'is_standalone_payment', 'is_voided', 'order.id', 'owner', 'pending',
  'source_data.pan', 'source_data.sub_type', 'source_data.type', 'success'];

const pick = (o: any, path: string) => path.split('.').reduce((v, k) => (v == null ? v : v[k]), o);
const str = (v: unknown) => (v === null || v === undefined ? '' : typeof v === 'boolean' ? (v ? 'true' : 'false') : String(v));

export function hmacString(obj: any): string {
  return HMAC_KEYS.map(k => str(pick(obj, k))).join('');
}

const hex = (b: ArrayBuffer) => [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');

export async function hmacSha512Hex(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-512' }, false, ['sign']);
  return hex(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data)));
}

/** constant-time compare of two hex strings */
export function sameHex(a: string, b: string): boolean {
  a = (a || '').toLowerCase(); b = (b || '').toLowerCase();
  if (a.length !== b.length || !a.length) return false;
  let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

export async function verifyTransaction(obj: any, hmac: string, secret: string): Promise<boolean> {
  if (!obj || !hmac || !secret) return false;
  return sameHex(await hmacSha512Hex(secret, hmacString(obj)), hmac);
}

export type Plan = 'monthly' | 'quarterly' | 'semiannual';
/** months each plan adds */
export const PLAN_MONTHS: Record<Plan, number> = { monthly: 1, quarterly: 3, semiannual: 6 };
/** where each plan's price lives in the settings row */
export const PLAN_PRICE: Record<Plan, string> = { monthly: 'price_monthly_cents', quarterly: 'price_quarterly_cents', semiannual: 'price_semiannual_cents' };
export const PLAN_LABEL: Record<Plan, string> = { monthly: 'Masar Pro - 1 month', quarterly: 'Masar Pro - 3 months', semiannual: 'Masar Pro - 6 months' };
export const isPlan = (p: unknown): p is Plan => p === 'monthly' || p === 'quarterly' || p === 'semiannual';

/** the reference Paymob carries back to us: <user id>.<plan>.<time> */
export const makeReference = (uid: string, plan: Plan, now = Date.now()) => `${uid}.${plan}.${now.toString(36)}`;
export function parseReference(ref: string): { uid: string; plan: Plan } | null {
  const m = /^([0-9a-f-]{36})\.(monthly|quarterly|semiannual)\.[0-9a-z]+$/.exec(ref || '');
  return m ? { uid: m[1], plan: m[2] as Plan } : null;
}

/** body of the Create Intention request */
export function intentionBody(o: { amountCents: number; currency: string; plan: Plan; integrationIds: number[]; email: string; name?: string;
  reference: string; notificationUrl: string; redirectionUrl: string }) {
  const [first, ...rest] = (o.name || o.email.split('@')[0]).trim().split(/\s+/);
  const label = PLAN_LABEL[o.plan];
  return {
    amount: o.amountCents,
    currency: o.currency,
    payment_methods: o.integrationIds,
    items: [{ name: label, amount: o.amountCents, description: label, quantity: 1 }],
    billing_data: { first_name: first || 'Masar', last_name: rest.join(' ') || 'Customer', email: o.email, phone_number: 'NA',
      apartment: 'NA', floor: 'NA', street: 'NA', building: 'NA', city: 'NA', country: 'EG', state: 'NA', postal_code: 'NA' },
    customer: { first_name: first || 'Masar', last_name: rest.join(' ') || 'Customer', email: o.email },
    special_reference: o.reference,
    notification_url: o.notificationUrl,
    redirection_url: o.redirectionUrl,
    extras: { masar_ref: o.reference, plan: o.plan },
  };
}

export const checkoutUrl = (publicKey: string, clientSecret: string) =>
  `${PAYMOB_BASE}/unifiedcheckout/?publicKey=${encodeURIComponent(publicKey)}&clientSecret=${encodeURIComponent(clientSecret)}`;

/** where the reference can be found in the callback (Paymob puts special_reference in order.merchant_order_id) */
export function referenceOf(obj: any): string {
  return str(pick(obj, 'order.merchant_order_id') || pick(obj, 'special_reference') || pick(obj, 'payment_key_claims.extra.masar_ref') || pick(obj, 'extras.masar_ref'));
}

/** new paid-until date: from the later of now and the current end, plus the plan's months (Jan 31 + 1 month = Feb 28/29) */
export function extend(periodEnd: string | null, plan: Plan, now = new Date()): string {
  const base = new Date(Math.max(now.getTime(), periodEnd ? Date.parse(periodEnd) || 0 : 0));
  const d = new Date(base), day = d.getUTCDate();
  d.setUTCDate(1); d.setUTCMonth(d.getUTCMonth() + PLAN_MONTHS[plan]);
  const last = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
  d.setUTCDate(Math.min(day, last));
  return d.toISOString();
}
