// Run once a day (GitHub Actions schedule): emails customers whose subscription or trial ends in `remind_days` days.
import { db, json, startOfDayIso, type Env } from '../_shared/db.ts';
import { sendMail, reminderEmail } from '../_shared/email.ts';
export async function handle(req: Request, env: Env, f: typeof fetch = fetch, now = new Date()): Promise<Response> {
  const secret = env('CRON_SECRET') || '';
  if (!secret || req.headers.get('x-cron-secret') !== secret) return json({ error: 'forbidden' }, 403);
  const D = db(env, f), [s] = await D.get('settings?id=eq.1&select=remind_days');
  const days = s ? s.remind_days : 3, from = new Date(now.getTime() + (days - 1) * 864e5).toISOString(), to = new Date(now.getTime() + days * 864e5).toISOString();
  const paid = await D.get(`profiles?canceled=eq.false&period_end=gt.${from}&period_end=lte.${to}&select=email,period_end`);
  const trial = await D.get(`profiles?period_end=is.null&trial_end=gt.${from}&trial_end=lte.${to}&select=email,trial_end`);
  const app = (env('APP_URL') || '').replace(/\/+$/, '');
  let sent = 0, failed = 0;
  for (const p of [...paid.map((x: any) => ({ to: x.email, end: x.period_end })), ...trial.map((x: any) => ({ to: x.email, end: x.trial_end }))]) {
    if (!p.to) continue;
    try { await sendMail({ to: p.to, ...reminderEmail(p.end, days, app + '/?plans=1'), kind: 'reminder' }, env,
      async pr => (await D.get(`email_log?provider=eq.${pr}&ok=eq.true&created_at=gte.${startOfDayIso(now)}&select=id`)).length,
      async (pr, ok, err) => { await D.insert('email_log', { to_email: p.to, kind: 'reminder', provider: pr, ok, error: err || null }); }, f); sent++; } catch (_) { failed++; }
  }
  return json({ ok: true, sent, failed });
}
