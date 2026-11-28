// Email router: sends through the first provider that is set up and still has free quota today, and falls through on any error:
//   Brevo -> Mailjet -> Resend -> Amazon SES (pay-as-you-go, no daily cap). So email never stops.
// Plain fetch + WebCrypto only (Deno and Node).

export type Mail = { to: string; subject: string; html: string; text: string; kind?: string };
export type Env = (k: string) => string | undefined;
export type Provider = { id: string; daily: number; ready: (env: Env) => boolean; send: (m: Mail, env: Env, f: typeof fetch) => Promise<void> };

const from = (env: Env) => ({ email: env('MAIL_FROM') || 'no-reply@example.com', name: env('MAIL_FROM_NAME') || 'Masar' });
async function check(r: Response, who: string) { if (!r.ok) throw new Error(who + ' ' + r.status + ': ' + (await r.text()).slice(0, 300)); }
const num = (v: string | undefined, d: number) => { const n = parseInt(v || '', 10); return Number.isFinite(n) && n >= 0 ? n : d; };

export const PROVIDERS: Provider[] = [
  { id: 'brevo', daily: 300, ready: e => !!e('BREVO_API_KEY'),
    send: async (m, e, f) => { const s = from(e); await check(await f('https://api.brevo.com/v3/smtp/email', { method: 'POST', headers: { 'api-key': e('BREVO_API_KEY')!, 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ sender: { email: s.email, name: s.name }, to: [{ email: m.to }], subject: m.subject, htmlContent: m.html, textContent: m.text }) }), 'Brevo'); } },
  { id: 'mailjet', daily: 200, ready: e => !!(e('MAILJET_API_KEY') && e('MAILJET_SECRET_KEY')),
    send: async (m, e, f) => { const s = from(e); await check(await f('https://api.mailjet.com/v3.1/send', { method: 'POST', headers: { 'Authorization': 'Basic ' + btoa(e('MAILJET_API_KEY') + ':' + e('MAILJET_SECRET_KEY')), 'Content-Type': 'application/json' },
      body: JSON.stringify({ Messages: [{ From: { Email: s.email, Name: s.name }, To: [{ Email: m.to }], Subject: m.subject, HTMLPart: m.html, TextPart: m.text }] }) }), 'Mailjet'); } },
  { id: 'resend', daily: 100, ready: e => !!e('RESEND_API_KEY'),
    send: async (m, e, f) => { const s = from(e); await check(await f('https://api.resend.com/emails', { method: 'POST', headers: { 'Authorization': 'Bearer ' + e('RESEND_API_KEY'), 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: `${s.name} <${s.email}>`, to: [m.to], subject: m.subject, html: m.html, text: m.text }) }), 'Resend'); } },
  { id: 'ses', daily: Infinity, ready: e => !!(e('SES_ACCESS_KEY_ID') && e('SES_SECRET_ACCESS_KEY') && e('SES_REGION')),
    send: async (m, e, f) => { const s = from(e), region = e('SES_REGION')!, host = `email.${region}.amazonaws.com`, path = '/v2/email/outbound-emails';
      const body = JSON.stringify({ FromEmailAddress: `${s.name} <${s.email}>`, Destination: { ToAddresses: [m.to] },
        Content: { Simple: { Subject: { Data: m.subject, Charset: 'UTF-8' }, Body: { Html: { Data: m.html, Charset: 'UTF-8' }, Text: { Data: m.text, Charset: 'UTF-8' } } } } });
      const h = await sigV4({ method: 'POST', host, path, region, service: 'ses', body, accessKey: e('SES_ACCESS_KEY_ID')!, secretKey: e('SES_SECRET_ACCESS_KEY')!, headers: { 'content-type': 'application/json' } });
      await check(await f(`https://${host}${path}`, { method: 'POST', headers: h, body }), 'SES'); } },
];

/** daily quota per provider: env BREVO_DAILY etc. override the free-plan defaults */
export const quotaOf = (p: Provider, env: Env) => (p.daily === Infinity ? Infinity : num(env(p.id.toUpperCase() + '_DAILY'), p.daily));

/** sends with fall-through. sentToday(provider) -> count already sent today (from email_log); log() records every attempt */
export async function sendMail(m: Mail, env: Env, sentToday: (p: string) => Promise<number>, log: (p: string, ok: boolean, err?: string) => Promise<void>, f: typeof fetch = fetch): Promise<string> {
  const errors: string[] = [];
  for (const p of PROVIDERS) {
    if (!p.ready(env)) continue;
    const q = quotaOf(p, env);
    if (q !== Infinity && (await sentToday(p.id)) >= q) continue;
    try { await p.send(m, env, f); await log(p.id, true); return p.id; }
    catch (x) { const msg = String((x as Error).message || x); errors.push(msg); await log(p.id, false, msg); }
  }
  throw new Error('No email provider could send this email. ' + (errors.join(' | ') || 'No provider is set up (add BREVO_API_KEY etc.).'));
}

// ---------- AWS Signature Version 4 (for SES) ----------
const enc = new TextEncoder();
const hexOf = (b: ArrayBuffer) => [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
const sha256 = async (s: string) => hexOf(await crypto.subtle.digest('SHA-256', enc.encode(s)));
async function hmac(key: ArrayBuffer | Uint8Array, s: string) { const k = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']); return crypto.subtle.sign('HMAC', k, enc.encode(s)); }
export async function sigV4(o: { method: string; host: string; path: string; query?: string; region: string; service: string; body: string; accessKey: string; secretKey: string; headers?: Record<string, string>; date?: Date }) {
  const d = o.date || new Date(), amz = d.toISOString().replace(/[:-]|\.\d{3}/g, ''), day = amz.slice(0, 8);
  const payloadHash = await sha256(o.body);
  const hs: Record<string, string> = { ...(o.headers || {}), host: o.host, 'x-amz-date': amz, 'x-amz-content-sha256': payloadHash };
  const names = Object.keys(hs).map(k => k.toLowerCase()).sort();
  const lower: Record<string, string> = {}; for (const k in hs) lower[k.toLowerCase()] = String(hs[k]).trim().replace(/\s+/g, ' ');
  const canon = [o.method, o.path, o.query || '', names.map(n => n + ':' + lower[n] + '\n').join(''), names.join(';'), payloadHash].join('\n');
  const scope = `${day}/${o.region}/${o.service}/aws4_request`;
  const toSign = ['AWS4-HMAC-SHA256', amz, scope, await sha256(canon)].join('\n');
  let k: ArrayBuffer = await hmac(enc.encode('AWS4' + o.secretKey), day);
  k = await hmac(k, o.region); k = await hmac(k, o.service); k = await hmac(k, 'aws4_request');
  const sig = hexOf(await hmac(k, toSign));
  const out: Record<string, string> = {}; for (const k2 in hs) out[k2] = hs[k2];
  out['Authorization'] = `AWS4-HMAC-SHA256 Credential=${o.accessKey}/${scope}, SignedHeaders=${names.join(';')}, Signature=${sig}`;
  return out;
}

// ---------- the emails (Arabic + English) ----------
const wrap = (title: string, bodyAr: string, bodyEn: string, btn?: { url: string; ar: string; en: string }) => {
  const b = btn ? `<p style="margin:26px 0"><a href="${btn.url}" style="background:#f0c374;color:#2a2a2a;padding:12px 26px;border-radius:22px;text-decoration:none;font-weight:700">${btn.ar} · ${btn.en}</a></p>` : '';
  return `<!doctype html><html><body style="margin:0;background:#f4f4f4;font-family:Cairo,Segoe UI,Arial,sans-serif"><div style="max-width:520px;margin:30px auto;background:#fff;border-radius:10px;padding:30px;color:#222">
<div style="font-size:22px;font-weight:700;margin-bottom:16px">Masar · مسار</div><h2 style="margin:0 0 12px">${title}</h2>
<div dir="rtl" style="text-align:right;line-height:1.8">${bodyAr}</div><hr style="border:0;border-top:1px solid #eee;margin:18px 0"><div style="line-height:1.6;color:#444">${bodyEn}</div>${b}
<p style="color:#999;font-size:12px;margin-top:24px">If you did not ask for this email you can ignore it.</p></div></body></html>`;
};
export function authEmail(type: string, link: string, code: string): { subject: string; html: string; text: string } {
  const T: Record<string, [string, string, string, string, string]> = {
    signup: ['Confirm your email · أكد إيميلك', 'اضغط الزرار عشان تأكد إيميلك وتبدأ الفترة التجريبية في مسار.', 'Click the button to confirm your email and start your Masar trial.', 'تأكيد', 'Confirm'],
    recovery: ['Reset your password · تغيير الباسورد', 'اضغط الزرار عشان تعمل باسورد جديد لحسابك في مسار.', 'Click the button to set a new password for your Masar account.', 'باسورد جديد', 'New password'],
    magiclink: ['Your sign-in link · لينك الدخول', 'اضغط الزرار عشان تدخل على مسار.', 'Click the button to sign in to Masar.', 'دخول', 'Sign in'],
    invite: ['You are invited to Masar · دعوة لمسار', 'اتعزمت على مسار. اضغط الزرار عشان تعمل حسابك.', 'You have been invited to Masar. Click the button to set up your account.', 'قبول', 'Accept'],
    email_change: ['Confirm your new email · أكد الإيميل الجديد', 'اضغط الزرار عشان تأكد الإيميل الجديد لحسابك.', 'Click the button to confirm your new email address.', 'تأكيد', 'Confirm'],
    reauthentication: ['Your code · الكود بتاعك', 'الكود بتاعك:', 'Your code:', '', ''],
  };
  const t = T[type] || T.magiclink;
  const codeHtml = code ? `<p style="font-size:22px;letter-spacing:4px;font-weight:700">${code}</p>` : '';
  const html = wrap(t[0], t[1] + codeHtml, t[2] + (type === 'reauthentication' ? codeHtml : ''), type === 'reauthentication' ? undefined : { url: link, ar: t[3], en: t[4] });
  return { subject: t[0], html, text: `${t[2]}\n${type === 'reauthentication' ? code : link}\n\n${t[1]}` };
}
export function reminderEmail(endIso: string, days: number, renewUrl: string) {
  const d = new Date(endIso).toISOString().slice(0, 10);
  return { subject: `Your Masar subscription ends in ${days} day${days === 1 ? '' : 's'} · اشتراكك قرب يخلص`,
    html: wrap('Renew your subscription · جدد اشتراكك', `اشتراكك في مسار هيخلص يوم <b>${d}</b>. جدده عشان تكمل شغلك من غير ما يقف.`, `Your Masar subscription ends on <b>${d}</b>. Renew it to keep working without interruption.`, { url: renewUrl, ar: 'جدد دلوقتي', en: 'Renew now' }),
    text: `Your Masar subscription ends on ${d}. Renew: ${renewUrl}` };
}
export function receiptEmail(plan: string, amountCents: number, currency: string, endIso: string, appUrl: string) {
  const a = (amountCents / 100).toFixed(2) + ' ' + currency, d = new Date(endIso).toISOString().slice(0, 10), p = ({ monthly: '1 month · شهر', quarterly: '3 months · 3 شهور', semiannual: '6 months · 6 شهور' } as Record<string, string>)[plan] || plan;
  return { subject: 'Payment received · تم الدفع', html: wrap('Thank you · شكراً', `وصلنا ${a} لاشتراك ${p}. اشتراكك شغال لحد <b>${d}</b>.`, `We received ${a} for the ${p} plan. Your subscription is active until <b>${d}</b>.`, { url: appUrl, ar: 'افتح مسار', en: 'Open Masar' }),
    text: `We received ${a} for the ${plan} plan. Active until ${d}. ${appUrl}` };
}
