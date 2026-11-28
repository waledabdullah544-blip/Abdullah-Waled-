// Paymob "transaction processed" callback. Verifies the HMAC, then extends the customer's subscription once per transaction.
import { db, json, startOfDayIso, type Env } from '../_shared/db.ts';
import { verifyTransaction, referenceOf, parseReference, extend } from '../_shared/paymob.ts';
import { sendMail, receiptEmail } from '../_shared/email.ts';
export async function handle(req: Request, env: Env, f: typeof fetch = fetch): Promise<Response> {
  if (req.method !== 'POST') return json({ ok: true });            // the browser redirect (GET) is not used for granting
  const hmac = new URL(req.url).searchParams.get('hmac') || '';
  let body: any; try { body = await req.json(); } catch { return json({ error: 'bad json' }, 400); }
  const obj = body && body.obj;
  if (!(await verifyTransaction(obj, hmac, env('PAYMOB_HMAC') || ''))) return json({ error: 'bad hmac' }, 401);
  if (body.type && body.type !== 'TRANSACTION') return json({ ok: true, ignored: body.type });
  const D = db(env, f), ref = referenceOf(obj), who = parseReference(ref);
  if (!who) return json({ ok: true, ignored: 'unknown reference' });
  const txn = String(obj.id);
  const done = await D.get('payments?provider_txn=eq.' + encodeURIComponent(txn) + '&success=eq.true&select=id');
  if (done.length) return json({ ok: true, duplicate: true });
  const [pend] = await D.get('payments?order_id=eq.' + encodeURIComponent(ref) + '&select=*');
  const ok = obj.success === true && obj.pending !== true && obj.is_voided !== true && obj.is_refunded !== true;
  const amountOk = !!pend && Number(obj.amount_cents) === Number(pend.amount_cents) && (!obj.currency || obj.currency === pend.currency) && pend.user_id === who.uid;
  if (!ok || !amountOk) {
    if (pend) await D.patch('payments?id=eq.' + pend.id, { raw: { ...(pend.raw || {}), last: obj, note: !ok ? 'not successful' : 'amount / user mismatch' } });
    return json({ ok: true, granted: false });
  }
  const [prof] = await D.get('profiles?id=eq.' + who.uid + '&select=period_end,email');
  const end = extend(prof ? prof.period_end : null, who.plan);
  await D.patch('profiles?id=eq.' + who.uid, { plan: who.plan, period_end: end, canceled: false });
  await D.patch('payments?id=eq.' + pend.id, { success: true, provider_txn: txn, amount_cents: obj.amount_cents, raw: obj });
  if (prof && prof.email) {
    const m = receiptEmail(who.plan, obj.amount_cents, pend.currency, end, env('APP_URL') || '');
    try { await sendMail({ to: prof.email, ...m, kind: 'receipt' }, env,
      async p => (await D.get(`email_log?provider=eq.${p}&ok=eq.true&created_at=gte.${startOfDayIso()}&select=id`)).length,
      async (p, okk, err) => { await D.insert('email_log', { to_email: prof.email, kind: 'receipt', provider: p, ok: okk, error: err || null }); }, f); } catch (_) { /* the payment still counts */ }
  }
  return json({ ok: true, granted: true, period_end: end });
}
