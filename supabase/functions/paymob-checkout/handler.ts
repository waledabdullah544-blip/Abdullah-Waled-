// POST {plan:'monthly'|'yearly'} with the customer's Authorization header -> {url} of Paymob Unified Checkout.
import { db, json, CORS, type Env } from '../_shared/db.ts';
import { intentionBody, makeReference, checkoutUrl, PAYMOB_BASE, type Plan } from '../_shared/paymob.ts';
export async function handle(req: Request, env: Env, f: typeof fetch = fetch): Promise<Response> {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405);
  const D = db(env, f);
  const user = await D.user(req.headers.get('Authorization'));
  if (!user || !user.id) return json({ error: 'Please sign in first.' }, 401);
  let plan: Plan; try { plan = (await req.json()).plan; } catch { return json({ error: 'Bad request' }, 400); }
  if (plan !== 'monthly' && plan !== 'yearly') return json({ error: 'Choose monthly or yearly.' }, 400);
  const [s] = await D.get('settings?id=eq.1&select=*');
  const amount = plan === 'yearly' ? s.price_yearly_cents : s.price_monthly_cents;
  if (!amount) return json({ error: 'Prices are not set yet. The owner sets them on the admin page.' }, 400);
  const ids = (env('PAYMOB_INTEGRATION_IDS') || '').split(',').map(x => parseInt(x.trim(), 10)).filter(Number.isFinite);
  if (!env('PAYMOB_SECRET_KEY') || !env('PAYMOB_PUBLIC_KEY') || !ids.length) return json({ error: 'Payments are not set up yet (Paymob keys).' }, 503);
  const [p] = await D.get('profiles?id=eq.' + user.id + '&select=name,email');
  const reference = makeReference(user.id, plan);
  const appUrl = (env('APP_URL') || '').replace(/\/+$/, '');
  const body = intentionBody({ amountCents: amount, currency: s.currency, plan, integrationIds: ids, email: user.email, name: p && p.name,
    reference, notificationUrl: D.url + '/functions/v1/paymob-webhook', redirectionUrl: appUrl + '/?paid=1' });
  const [pay] = await D.insert('payments', { user_id: user.id, plan, amount_cents: amount, currency: s.currency, order_id: reference, success: false });
  const r = await f(PAYMOB_BASE + '/v1/intention/', { method: 'POST', headers: { Authorization: 'Token ' + env('PAYMOB_SECRET_KEY'), 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const out = await r.json().catch(() => ({}));
  if (!r.ok || !out.client_secret) { await D.patch('payments?id=eq.' + pay.id, { raw: { error: out } }); return json({ error: 'Paymob refused the payment request: ' + JSON.stringify(out).slice(0, 300) }, 502); }
  await D.patch('payments?id=eq.' + pay.id, { raw: { intention_id: out.id, intention_order_id: out.intention_order_id } });
  return json({ url: checkoutUrl(env('PAYMOB_PUBLIC_KEY')!, out.client_secret), reference });
}
