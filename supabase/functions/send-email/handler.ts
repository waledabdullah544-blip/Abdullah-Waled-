// Supabase Auth "Send Email" hook: every sign-up / password reset / magic link email goes through the router (never stops).
import { db, json, startOfDayIso, type Env } from '../_shared/db.ts';
import { verifyStd } from '../_shared/webhook.ts';
import { sendMail, authEmail } from '../_shared/email.ts';
export async function handle(req: Request, env: Env, f: typeof fetch = fetch): Promise<Response> {
  const raw = await req.text();
  if (!(await verifyStd(env('SEND_EMAIL_HOOK_SECRET') || '', req.headers, raw))) return json({ error: { http_code: 401, message: 'bad signature' } }, 401);
  const { user, email_data: e } = JSON.parse(raw);
  const D = db(env, f), base = (env('SUPABASE_URL') || '').replace(/\/+$/, ''), app = env('APP_URL') || e.site_url || '';
  const link = (hash: string) => `${base}/auth/v1/verify?token=${encodeURIComponent(hash)}&type=${encodeURIComponent(e.email_action_type)}&redirect_to=${encodeURIComponent(e.redirect_to || app)}`;
  const jobs: { to: string; hash: string; code: string }[] = [{ to: user.email, hash: e.token_hash, code: e.token }];
  if (e.email_action_type === 'email_change' && user.new_email && e.token_hash_new) jobs.push({ to: user.new_email, hash: e.token_hash_new, code: e.token_new });
  try {
    for (const j of jobs) {
      if (!j.to) continue;
      const m = authEmail(e.email_action_type, link(j.hash), j.code);
      await sendMail({ to: j.to, ...m, kind: e.email_action_type }, env,
        async p => (await D.get(`email_log?provider=eq.${p}&ok=eq.true&created_at=gte.${startOfDayIso()}&select=id`)).length,
        async (p, ok, err) => { await D.insert('email_log', { to_email: j.to, kind: e.email_action_type, provider: p, ok, error: err || null }); }, f);
    }
    return json({});
  } catch (x) { return json({ error: { http_code: 500, message: String((x as Error).message || x) } }, 500); }
}
