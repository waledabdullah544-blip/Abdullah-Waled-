// Tests the Supabase Edge Functions in Node (they are plain TypeScript; Node 22 runs it directly).
//   node tests/server.mjs            (the SigV4 check needs the "aws4" package: set AWS4=/path/to/node_modules/aws4)
import { handle as checkout } from '../supabase/functions/paymob-checkout/handler.ts';
import { handle as webhook } from '../supabase/functions/paymob-webhook/handler.ts';
import { handle as sendEmail } from '../supabase/functions/send-email/handler.ts';
import { handle as reminders } from '../supabase/functions/reminders/handler.ts';
import { hmacString, hmacSha512Hex, extend, parseReference, HMAC_KEYS } from '../supabase/functions/_shared/paymob.ts';
import { sendMail, sigV4 } from '../supabase/functions/_shared/email.ts';
import { signStd } from '../supabase/functions/_shared/webhook.ts';
import { createRequire } from 'module';
let bad = 0; const ok = (n, c, x) => { console.log((c ? 'PASS ' : 'FAIL ') + n + (!c && x !== undefined ? ' ' + JSON.stringify(x) : '')); if (!c) bad++; };

// ---------- a fake Supabase (REST + auth/v1/user) + Paymob + email providers ----------
const UID = '11111111-1111-1111-1111-111111111111';
const T = { settings: [{ id: 1, trial_days: 7, remind_days: 3, currency: 'EGP', price_monthly_cents: 9900, price_yearly_cents: 79900 }],
  profiles: [{ id: UID, email: 'ali@example.com', name: 'Ali Hassan', period_end: null, trial_end: null, plan: null, canceled: false }], payments: [], email_log: [] };
const calls = [], down = new Set();
const filt = (rows, q) => { for (const [k, v] of q) { if (k === 'select') continue; rows = rows.filter(r => { const x = r[k];
  if (v === 'is.null') return x == null; if (v.startsWith('eq.')) return String(x) === v.slice(3); if (v.startsWith('gte.')) return x >= v.slice(4);
  if (v.startsWith('gt.')) return x > v.slice(3); if (v.startsWith('lte.')) return x <= v.slice(4); return true; }); } return rows; };
const fake = async (url, init = {}) => {
  const u = new URL(url), body = init.body ? JSON.parse(init.body) : null; calls.push({ url, init, body });
  const res = (s, j) => new Response(j == null ? '' : JSON.stringify(j), { status: s, headers: { 'Content-Type': 'application/json' } });
  if (u.host === 'db.test') {
    if (u.pathname === '/auth/v1/user') return init.headers.Authorization === 'Bearer user-jwt' ? res(200, { id: UID, email: 'ali@example.com' }) : res(401, {});
    const t = u.pathname.replace('/rest/v1/', ''), q = [...u.searchParams];
    if (init.method === 'GET' || !init.method) return res(200, filt(T[t], q));
    if (init.method === 'POST') { const row = { id: String(T[t].length + 1), created_at: new Date().toISOString(), ...body }; T[t].push(row); return res(201, [row]); }
    if (init.method === 'PATCH') { const L = filt(T[t], q); L.forEach(r => Object.assign(r, body)); return res(200, L); }
  }
  if (u.host === 'accept.paymob.com' && u.pathname === '/v1/intention/') return init.headers.Authorization === 'Token sk_test' ? res(201, { id: 'pi_1', client_secret: 'cs_abc', intention_order_id: 555 }) : res(401, { detail: 'bad key' });
  const prov = { 'api.brevo.com': 'brevo', 'api.mailjet.com': 'mailjet', 'api.resend.com': 'resend' }[u.host] || (/amazonaws\.com$/.test(u.host) ? 'ses' : null);
  if (prov) return down.has(prov) ? res(500, { message: prov + ' down' }) : res(200, { messageId: 'm' });
  return res(404, {});
};
const ENV = { SUPABASE_URL: 'https://db.test', SUPABASE_SERVICE_ROLE_KEY: 'service', SUPABASE_ANON_KEY: 'anon', APP_URL: 'https://masar.app',
  PAYMOB_SECRET_KEY: 'sk_test', PAYMOB_PUBLIC_KEY: 'pk_test', PAYMOB_INTEGRATION_IDS: '123, 456', PAYMOB_HMAC: 'HMACSECRET',
  BREVO_API_KEY: 'b', MAILJET_API_KEY: 'mk', MAILJET_SECRET_KEY: 'ms', RESEND_API_KEY: 'r', SES_ACCESS_KEY_ID: 'AKID', SES_SECRET_ACCESS_KEY: 'SECRET', SES_REGION: 'eu-central-1',
  MAIL_FROM: 'no-reply@masar.app', SEND_EMAIL_HOOK_SECRET: 'v1,whsec_' + Buffer.from('supersecretkey-0123456789').toString('base64'), CRON_SECRET: 'cron123' };
const env = k => ENV[k];
const post = (path, body, headers = {}) => new Request('https://fn.test' + path, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });

// ---------- checkout ----------
let r = await checkout(post('/', { plan: 'monthly' }), env, fake);
ok('checkout refuses a signed-out request', r.status === 401);
r = await checkout(post('/', { plan: 'monthly' }, { Authorization: 'Bearer user-jwt' }), env, fake); let j = await r.json();
ok('checkout returns the Paymob Unified Checkout link', r.status === 200 && j.url === 'https://accept.paymob.com/unifiedcheckout/?publicKey=pk_test&clientSecret=cs_abc', j);
const ic = calls.find(c => c.url.endsWith('/v1/intention/'));
ok('intention: price from settings, integration ids, reference, callback + return urls', ic.body.amount === 9900 && ic.body.currency === 'EGP' && JSON.stringify(ic.body.payment_methods) === '[123,456]'
  && parseReference(ic.body.special_reference)?.uid === UID && ic.body.notification_url === 'https://db.test/functions/v1/paymob-webhook' && ic.body.redirection_url === 'https://masar.app/?paid=1' && ic.body.billing_data.first_name === 'Ali', ic.body);
ok('a pending payment row is kept', T.payments.length === 1 && T.payments[0].success === false && T.payments[0].amount_cents === 9900);
ok('checkout refuses an unknown plan', (await checkout(post('/', { plan: 'lifetime' }, { Authorization: 'Bearer user-jwt' }), env, fake)).status === 400);

// ---------- webhook ----------
const ref = ic.body.special_reference;
const txn = (over = {}) => ({ id: 9001, amount_cents: 9900, created_at: '2026-11-28T10:00:00.000000', currency: 'EGP', error_occured: false, has_parent_transaction: false, integration_id: 123,
  is_3d_secure: true, is_auth: false, is_capture: false, is_refunded: false, is_standalone_payment: true, is_voided: false, owner: 77, pending: false,
  order: { id: 555, merchant_order_id: ref }, source_data: { pan: '2346', sub_type: 'MasterCard', type: 'card' }, success: true, ...over });
const hook = async o => webhook(post('/?hmac=' + await hmacSha512Hex('HMACSECRET', hmacString(o)), { type: 'TRANSACTION', obj: o }), env, fake);
ok('HMAC string uses the 20 keys in order', HMAC_KEYS.length === 20 && hmacString(txn()) === '99002026-11-28T10:00:00.000000EGPfalsefalse9001123truefalsefalsefalsetruefalse55577false2346MasterCardcardtrue', hmacString(txn()));
r = await webhook(post('/?hmac=deadbeef', { type: 'TRANSACTION', obj: txn() }), env, fake);
ok('webhook rejects a wrong HMAC (no subscription)', r.status === 401 && T.profiles[0].period_end === null);
r = await hook(txn({ amount_cents: 100 })); ok('a tampered amount does not grant', (await r.json()).granted === false && T.profiles[0].period_end === null);
r = await hook(txn({ success: false })); ok('a failed payment does not grant', (await r.json()).granted === false);
r = await hook(txn()); j = await r.json();
ok('a successful payment grants one month', j.granted === true && T.profiles[0].plan === 'monthly' && Math.round((Date.parse(T.profiles[0].period_end) - Date.now()) / 864e5) >= 28, j);
ok('the payment is marked paid with the Paymob transaction id', T.payments[0].success === true && T.payments[0].provider_txn === '9001');
ok('a receipt email was sent and logged', T.email_log.some(e => e.kind === 'receipt' && e.ok));
const end1 = T.profiles[0].period_end; r = await hook(txn()); ok('the same callback twice does not add another month', (await r.json()).duplicate === true && T.profiles[0].period_end === end1);
ok('renewing early adds to the current end date', extend('2027-01-31T00:00:00.000Z', 'monthly', new Date('2027-01-10')) === '2027-02-28T00:00:00.000Z' && extend('2027-01-10T00:00:00.000Z', 'yearly', new Date('2027-01-01')) === '2028-01-10T00:00:00.000Z');

// ---------- email router ----------
const log = []; const st = { brevo: 0, mailjet: 0, resend: 0 };
const mail = { to: 'x@y.com', subject: 's', html: '<b>h</b>', text: 't' };
const send = () => sendMail(mail, env, async p => st[p] || 0, async (p, okk, err) => { log.push([p, okk]); if (okk) st[p] = (st[p] || 0) + 1; }, fake);
ok('router uses Brevo first', await send() === 'brevo');
st.brevo = 300; ok('Brevo daily quota used up -> Mailjet', await send() === 'mailjet');
down.add('mailjet'); ok('Mailjet down -> Resend (and the failure is logged)', await send() === 'resend' && log.some(l => l[0] === 'mailjet' && !l[1]));
st.resend = 100; ok('all free quotas used -> Amazon SES (never stops)', await send() === 'ses');
const ENV2 = { ...ENV, BREVO_DAILY: '1000' }; st.brevo = 300; ok('daily quota can be raised (BREVO_DAILY)', await sendMail(mail, k => ENV2[k], async p => st[p] || 0, async () => {}, fake) === 'brevo');
down.add('ses'); st.brevo = 1000; let err = ''; try { await send(); } catch (x) { err = x.message; } ok('if every provider fails, the error says why', /No email provider/.test(err));
down.clear();

// ---------- auth email hook ----------
const payload = JSON.stringify({ user: { email: 'new@user.com' }, email_data: { token: '123456', token_hash: 'hash1', redirect_to: 'https://masar.app/', email_action_type: 'signup', site_url: 'https://masar.app' } });
const ts = String(Math.floor(Date.now() / 1000)), sig = await signStd(ENV.SEND_EMAIL_HOOK_SECRET, 'msg_1', ts, payload);
const n0 = calls.length; st.brevo = 0;
r = await sendEmail(new Request('https://fn.test/', { method: 'POST', headers: { 'webhook-id': 'msg_1', 'webhook-timestamp': ts, 'webhook-signature': 'v1,' + sig }, body: payload }), env, fake);
const sentMail = calls.slice(n0).find(c => c.url.includes('api.brevo.com'));
ok('auth hook sends the confirmation email with the verify link', r.status === 200 && sentMail && sentMail.body.to[0].email === 'new@user.com' && sentMail.body.htmlContent.includes('https://db.test/auth/v1/verify?token=hash1&type=signup&redirect_to=https%3A%2F%2Fmasar.app%2F'));
r = await sendEmail(new Request('https://fn.test/', { method: 'POST', headers: { 'webhook-id': 'msg_1', 'webhook-timestamp': ts, 'webhook-signature': 'v1,AAAA' }, body: payload }), env, fake);
ok('auth hook rejects a bad signature', r.status === 401);
r = await sendEmail(new Request('https://fn.test/', { method: 'POST', headers: { 'webhook-id': 'msg_1', 'webhook-timestamp': String(Number(ts) - 900), 'webhook-signature': 'v1,' + await signStd(ENV.SEND_EMAIL_HOOK_SECRET, 'msg_1', String(Number(ts) - 900), payload) }, body: payload }), env, fake);
ok('auth hook rejects an old (replayed) request', r.status === 401);

// ---------- reminders ----------
T.profiles.push({ id: '2', email: 'soon@user.com', period_end: new Date(Date.now() + 2.5 * 864e5).toISOString(), canceled: false }, { id: '3', email: 'later@user.com', period_end: new Date(Date.now() + 20 * 864e5).toISOString(), canceled: false },
  { id: '4', email: 'trial@user.com', period_end: null, trial_end: new Date(Date.now() + 2.2 * 864e5).toISOString(), canceled: false }, { id: '5', email: 'cancel@user.com', period_end: new Date(Date.now() + 2.5 * 864e5).toISOString(), canceled: true });
ok('reminders need the cron secret', (await reminders(new Request('https://fn.test/', { method: 'POST' }), env, fake)).status === 403);
r = await reminders(new Request('https://fn.test/', { method: 'POST', headers: { 'x-cron-secret': 'cron123' } }), env, fake); j = await r.json();
const rem = T.email_log.filter(e => e.kind === 'reminder').map(e => e.to_email).sort();
ok('reminders go to subscriptions / trials ending in 3 days only (not canceled, not later)', j.sent === 2 && rem.join() === 'soon@user.com,trial@user.com', { j, rem });

// ---------- SigV4 against the aws4 library ----------
if (process.env.AWS4) {
  const aws4 = createRequire(import.meta.url)(process.env.AWS4);
  const date = new Date('2026-11-28T12:34:56Z'), body = '{"a":1}';
  const mine = await sigV4({ method: 'POST', host: 'email.eu-central-1.amazonaws.com', path: '/v2/email/outbound-emails', region: 'eu-central-1', service: 'ses', body, accessKey: 'AKIDEXAMPLE', secretKey: 'wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY', headers: { 'content-type': 'application/json', 'content-length': String(Buffer.byteLength(body)) }, date });
  const ref2 = aws4.sign({ host: 'email.eu-central-1.amazonaws.com', path: '/v2/email/outbound-emails', method: 'POST', service: 'ses', region: 'eu-central-1', body,
    headers: { 'content-type': 'application/json', 'X-Amz-Date': '20261128T123456Z', 'X-Amz-Content-Sha256': mine['x-amz-content-sha256'] } }, { accessKeyId: 'AKIDEXAMPLE', secretAccessKey: 'wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY' });
  ok('Amazon SES signature matches the aws4 library', mine.Authorization === ref2.headers.Authorization, [mine.Authorization, ref2.headers.Authorization]);
} else console.log('SKIP SigV4 check (set AWS4=/path/to/node_modules/aws4)');
console.log(bad ? 'FAILED ' + bad : 'ALL OK');
