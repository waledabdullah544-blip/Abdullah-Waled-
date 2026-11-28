/* Masar DEMO server: runs inside the page (no internet, no real payments) so the owner can try sign-up, trial, plans, account,
   templates and the admin panel. Data is kept in this browser (localStorage "masar.demo.db"). Used only by masar-demo.html / admin-demo.html. */
(function () {
  const BASE = 'https://demo.masar.local', KEY = 'masar.demo.db', DAY = 864e5;
  const now = () => new Date().toISOString();
  const uid = () => (crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16)));
  const T1 = '<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080"><rect width="1080" height="1080" fill="#20323f"/><circle cx="820" cy="260" r="200" fill="#f0c374"/><rect x="90" y="760" width="520" height="16" fill="#f0c374"/></svg>';
  const T2 = '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720"><rect width="1280" height="720" fill="#111"/><rect width="560" height="720" fill="#f0c374"/><circle cx="930" cy="360" r="170" fill="#fff" fill-opacity=".12"/></svg>';
  const T3 = '<svg xmlns="http://www.w3.org/2000/svg" width="595" height="842"><rect width="595" height="842" fill="#fbf8f2"/><rect width="595" height="230" fill="#2b2b2b"/><circle cx="56" cy="318" r="10" fill="#f0c374"/><circle cx="56" cy="388" r="10" fill="#f0c374"/><rect y="780" width="595" height="62" fill="#f0c374"/></svg>';
  const svgUrl = s => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s);
  function fresh() {
    const admin = { id: uid(), email: 'admin@demo.masar', pw: 'demo1234', name: 'Owner', admin: true, trial_end: now(), period_end: null, plan: null, canceled: false, created_at: now() };
    return { users: [admin], settings: { id: 1, trial_days: 7, grace_days: 7, remind_days: 3, currency: 'EGP', price_monthly_cents: 19900, price_quarterly_cents: 39900, price_semiannual_cents: 69900, price_yearly_cents: 0, announcement: { title: 'Welcome to the Masar demo', text: 'Everything here is simulated: no real payments, no emails.' } },
      payments: [], files: [], projects: [], shares: [], email_log: [],
      templates: [
        { id: uid(), title: 'Social Post', category: 'Social', tags: ['post'], width: 1080, height: 1080, unit: 'px', file_path: 'demo/t1.svg', thumb_path: 'demo/t1.svg', published: true, sort: 0, created_at: now() },
        { id: uid(), title: 'YouTube Thumbnail', category: 'Video', tags: ['youtube'], width: 1280, height: 720, unit: 'px', file_path: 'demo/t2.svg', thumb_path: 'demo/t2.svg', published: true, sort: 1, created_at: now() },
        { id: uid(), title: 'Event Flyer', category: 'Print', tags: ['flyer'], width: 595, height: 842, unit: 'pt', file_path: 'demo/t3.svg', thumb_path: 'demo/t3.svg', published: true, sort: 2, created_at: now() }],
      objects: { 'templates/demo/t1.svg': T1, 'templates/demo/t2.svg': T2, 'templates/demo/t3.svg': T3, 'template-thumbs/demo/t1.svg': svgUrl(T1), 'template-thumbs/demo/t2.svg': svgUrl(T2), 'template-thumbs/demo/t3.svg': svgUrl(T3) } };
  }
  let DB; try { DB = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (_) {}
  if (!DB || !DB.users) DB = fresh();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(DB)); } catch (_) {} };
  save();
  const status = u => u.admin ? 'active' : u.period_end && Date.parse(u.period_end) > Date.now() ? 'active' : u.trial_end && Date.parse(u.trial_end) > Date.now() ? 'trialing' : 'expired';
  const prof = u => ({ id: u.id, email: u.email, name: u.name, is_admin: !!u.admin, trial_end: u.trial_end, plan: u.plan, period_end: u.period_end, canceled: !!u.canceled, created_at: u.created_at, last_seen: u.last_seen || null });
  const sess = u => ({ access_token: 'demo-' + u.id, refresh_token: 'demor-' + u.id, expires_in: 3600, token_type: 'bearer', user: { id: u.id, email: u.email } });
  const MONTHS = { monthly: 1, quarterly: 3, semiannual: 6 };
  function filt(q, rows) {
    for (const [k, v] of q) {
      if (k === 'select' || k === 'order' || k === 'limit') continue;
      if (k === 'or') { const m = /ilike\.\*(.*?)\*/.exec(v); if (m) { const n = decodeURIComponent(m[1]).toLowerCase(); rows = rows.filter(r => (r.email || '').toLowerCase().includes(n) || (r.name || '').toLowerCase().includes(n)); } continue; }
      rows = rows.filter(r => { const x = r[k];
        if (v === 'is.null') return x == null; if (v === 'not.is.null') return x != null;
        if (v.startsWith('eq.')) return String(x) === v.slice(3); if (v.startsWith('neq.')) return String(x) !== v.slice(4);
        if (v.startsWith('in.(')) return v.slice(4, -1).split(',').includes(String(x)); return true; });
    }
    const o = q.get('order'); if (o) { const [c, d] = o.split(',')[0].split('.'); rows = rows.slice().sort((a, b) => (a[c] > b[c] ? 1 : a[c] < b[c] ? -1 : 0) * (d === 'desc' ? -1 : 1)); }
    return rows;
  }
  const pick = (q, r) => { const s = q.get('select'); if (!s || s === '*') return r; const o = {}; s.split(',').forEach(c => { o[c] = r[c] === undefined ? null : r[c]; }); return o; };
  const res = (code, body, type) => new Response(code === 204 ? null : (typeof body === 'string' ? body : JSON.stringify(body == null ? {} : body)), { status: code, headers: { 'Content-Type': type || 'application/json' } });
  async function handle(url, init) {
    const u0 = new URL(url), q = u0.searchParams, path = u0.pathname, method = (init.method || 'GET').toUpperCase();
    let body = {}; const raw = init.body; if (raw && typeof raw === 'string') { try { body = JSON.parse(raw); } catch (_) {} }
    const H = init.headers || {}, auth = (H.Authorization || H.authorization || '').replace(/^Bearer /, '');
    const me = DB.users.find(x => auth === 'demo-' + x.id) || null, isA = !!(me && me.admin);
    // ---- auth ----
    if (path === '/auth/v1/signup') { if (DB.users.find(x => x.email === body.email)) return res(422, { msg: 'User already registered' });
      const n = { id: uid(), email: body.email, pw: body.password, name: null, admin: false, trial_end: new Date(Date.now() + DB.settings.trial_days * DAY).toISOString(), period_end: null, plan: null, canceled: false, created_at: now() };
      DB.users.push(n); DB.email_log.unshift({ created_at: now(), to_email: n.email, kind: 'signup', provider: 'brevo', ok: true }); save(); return res(200, sess(n)); }
    if (path === '/auth/v1/token') { if (q.get('grant_type') === 'password') { const x = DB.users.find(y => y.email === body.email && y.pw === body.password); return x ? res(200, sess(x)) : res(400, { error_description: 'Invalid login credentials' }); }
      const x = DB.users.find(y => 'demor-' + y.id === body.refresh_token); return x ? res(200, sess(x)) : res(400, { error_description: 'Invalid Refresh Token' }); }
    if (path === '/auth/v1/user') return me ? res(200, { id: me.id, email: me.email }) : res(401, { msg: 'Invalid JWT' });
    if (path === '/auth/v1/recover') { DB.email_log.unshift({ created_at: now(), to_email: body.email, kind: 'recovery', provider: 'brevo', ok: true }); save(); return res(200, {}); }
    if (path === '/auth/v1/logout') return res(204);
    // ---- storage ----
    let m = /^\/storage\/v1\/object\/(templates|template-thumbs)\/(.+)$/.exec(path);
    if (m && method === 'GET') { if (!me || status(me) === 'expired') return res(400, { message: 'Object not found' }); const k = m[1] + '/' + decodeURIComponent(m[2]); return k in DB.objects ? res(200, DB.objects[k], 'text/plain') : res(404, { message: 'Object not found' }); }
    if (m && method === 'POST') { if (!isA) return res(403, { message: 'new row violates row-level security policy' }); const k = m[1] + '/' + decodeURIComponent(m[2]), b = raw;
      DB.objects[k] = m[1] === 'template-thumbs' ? await new Promise(ok => { const f = new FileReader(); f.onload = () => ok(f.result); f.readAsDataURL(b instanceof Blob ? b : new Blob([b])); }) : (b instanceof Blob ? await b.text() : String(b)); save(); return res(200, { Key: k }); }
    m = /^\/storage\/v1\/object\/(templates|template-thumbs)$/.exec(path);
    if (m && method === 'DELETE') { if (!isA) return res(403, {}); (body.prefixes || []).forEach(p => delete DB.objects[m[1] + '/' + p]); save(); return res(200, []); }
    // ---- functions ----
    if (path === '/functions/v1/paymob-checkout') { if (!me) return res(401, { error: 'Please sign in first.' }); const k = body.plan; if (!MONTHS[k]) return res(400, { error: 'Choose a plan.' });
      const c = DB.settings['price_' + k + '_cents'], lab = { monthly: '1 month', quarterly: '3 months', semiannual: '6 months' }[k];
      if (!confirm('DEMO payment (nothing is charged)\n\nMasar Pro · ' + lab + ' · ' + (c / 100) + ' ' + DB.settings.currency + '\n\nPress OK to simulate a successful Paymob payment.')) return res(400, { error: 'Payment canceled (demo).' });
      const base = new Date(Math.max(Date.now(), Date.parse(me.period_end || 0) || 0)); base.setMonth(base.getMonth() + MONTHS[k]);
      me.plan = k; me.period_end = base.toISOString(); me.canceled = false;
      DB.payments.unshift({ id: uid(), user_id: me.id, plan: k, amount_cents: c, currency: DB.settings.currency, success: true, provider_txn: 'DEMO-' + Date.now().toString(36).toUpperCase(), created_at: now() });
      DB.email_log.unshift({ created_at: now(), to_email: me.email, kind: 'receipt', provider: 'brevo', ok: true }); save();
      return res(200, { url: location.href.split('#')[0].split('?')[0] + '?paid=1' }); }
    // ---- rpc ----
    m = /^\/rest\/v1\/rpc\/(\w+)$/.exec(path);
    if (m) { if (!me) return res(401, { message: 'JWT expired' }); const f = m[1];
      if (f === 'masar_me') { me.last_seen = now(); save(); const s = DB.settings; return res(200, { email: me.email, name: me.name, admin: !!me.admin, status: status(me), plan: me.plan, trial_end: me.trial_end, period_end: me.period_end, canceled: !!me.canceled, now: now(), grace_days: s.grace_days, currency: s.currency, price_monthly_cents: s.price_monthly_cents, price_quarterly_cents: s.price_quarterly_cents, price_semiannual_cents: s.price_semiannual_cents, announcement: s.announcement }); }
      if (f === 'masar_set_name') { me.name = body.n; save(); return res(204); }
      if (f === 'masar_set_canceled') { me.canceled = !!body.c; save(); return res(204); }
      if (f === 'masar_admin_stats') { if (!isA) return res(400, { message: 'admin only' }); const P = DB.users, ok = DB.payments.filter(p => p.success);
        const em = {}; DB.email_log.filter(e => e.ok && Date.parse(e.created_at) > Date.now() - DAY).forEach(e => { em[e.provider] = (em[e.provider] || 0) + 1; });
        return res(200, { users: P.length, active: P.filter(x => !x.admin && status(x) === 'active').length, trialing: P.filter(x => status(x) === 'trialing').length, expired: P.filter(x => status(x) === 'expired').length,
          monthly: P.filter(x => x.plan === 'monthly' && status(x) === 'active').length, quarterly: P.filter(x => x.plan === 'quarterly' && status(x) === 'active').length, semiannual: P.filter(x => x.plan === 'semiannual' && status(x) === 'active').length,
          new_7d: P.filter(x => Date.parse(x.created_at) > Date.now() - 7 * DAY).length, revenue_30d_cents: ok.reduce((a, p) => a + p.amount_cents, 0), revenue_all_cents: ok.reduce((a, p) => a + p.amount_cents, 0),
          emails_today: em, email_fail_today: 0, templates: DB.templates.length, db_bytes: JSON.stringify(DB).length }); }
      if (f === 'masar_admin_grant') { if (!isA) return res(400, { message: 'admin only' }); const x = DB.users.find(y => y.id === body.uid); if (!x) return res(404, {});
        if (body.days <= 0) x.period_end = now(); else { x.plan = body.p || x.plan || 'monthly'; x.period_end = new Date(Math.max(Date.now(), Date.parse(x.period_end || 0) || 0) + body.days * DAY).toISOString(); x.canceled = false; } save(); return res(204); }
      return res(404, { message: 'unknown function' }); }
    // ---- tables ----
    m = /^\/rest\/v1\/(\w+)$/.exec(path); if (!m) return res(404, { message: 'not found' }); const t = m[1];
    if (t === 'settings') { if (method === 'GET') return res(200, [DB.settings]); if (!isA) return res(403, {}); Object.assign(DB.settings, body); save(); return res(204); }
    if (t === 'templates') { if (method === 'GET') return res(200, filt(q, DB.templates.filter(x => x.published || isA)).map(r => pick(q, r))); if (!isA) return res(403, { message: 'row-level security' });
      if (method === 'POST') { const r = { id: uid(), sort: 0, tags: [], created_at: now(), ...body }; DB.templates.push(r); save(); return res(201, [r]); }
      if (method === 'PATCH') { filt(q, DB.templates).forEach(r => Object.assign(r, body)); save(); return res(204); }
      if (method === 'DELETE') { const d = new Set(filt(q, DB.templates)); DB.templates = DB.templates.filter(r => !d.has(r)); save(); return res(204); } }
    if (!me) return res(401, { message: 'JWT expired' });
    if (t === 'profiles') { if (method === 'GET') return res(200, filt(q, DB.users.map(prof)).filter(r => isA || r.id === me.id).map(r => pick(q, r)));
      if (method === 'PATCH' && isA) { filt(q, DB.users.map(prof)).forEach(r => { const x = DB.users.find(y => y.id === r.id); if ('is_admin' in body) x.admin = !!body.is_admin; }); save(); return res(204); } return res(403, {}); }
    if (t === 'payments') return res(200, filt(q, DB.payments.filter(p => isA || p.user_id === me.id)).map(r => pick(q, r)));
    if (t === 'email_log') return res(200, isA ? DB.email_log.slice(0, 200) : []);
    if (t === 'files' || t === 'projects' || t === 'shares') {
      const vis = r => t === 'files' ? (r.owner === me.id || (!r.deleted_at && DB.shares.some(s => s.file_id === r.id && s.email === me.email.toLowerCase()))) : t === 'projects' ? r.owner === me.id : (DB.files.some(f => f.id === r.file_id && f.owner === me.id) || r.email === me.email.toLowerCase());
      const own = r => t === 'shares' ? DB.files.some(f => f.id === r.file_id && f.owner === me.id) : r.owner === me.id;
      const rows = DB[t].filter(vis);
      if (method === 'GET') return res(200, filt(q, rows).map(r => pick(q, r)));
      if (method === 'POST') { let r = t === 'files' ? { id: uid(), owner: me.id, owner_email: me.email, created_at: now(), updated_at: now(), deleted_at: null, project_id: null, thumb: null, ...body } : t === 'projects' ? { id: uid(), owner: me.id, created_at: now(), ...body } : { created_at: now(), ...body };
        if (t === 'files' && status(me) === 'expired') return res(403, { message: 'Your subscription has ended.' });
        if (t === 'shares') { if (!own(r)) return res(403, { message: 'row-level security' }); if (DB.shares.some(s => s.file_id === r.file_id && s.email === r.email)) return res(409, { code: '23505', message: 'duplicate key' }); }
        DB[t].push(r); save(); return /return=representation/.test(H.Prefer || H.prefer || '') ? res(201, [pick(q, r)]) : res(201, ''); }
      if (method === 'PATCH') { filt(q, rows).filter(own).forEach(r => { Object.assign(r, body); if (t === 'files') r.updated_at = now(); }); save(); return res(204); }
      if (method === 'DELETE') { const d = new Set(filt(q, rows).filter(own)); DB[t] = DB[t].filter(r => !d.has(r)); if (t === 'files') DB.shares = DB.shares.filter(s => DB.files.some(f => f.id === s.file_id)); save(); return res(204); } }
    return res(404, { message: 'not found' });
  }
  const _f = window.fetch.bind(window);
  window.fetch = function (input, init) {
    const url = typeof input === 'string' ? input : input.url;
    if (url && url.startsWith(BASE)) return new Promise(r => setTimeout(r, 120)).then(() => handle(url, init || {}));
    return _f(input, init);
  };
  /* thumbnails are <img> tags: point them at the saved data */
  const fixImgs = () => document.querySelectorAll('img[src^="' + BASE + '/storage/v1/object/public/"]').forEach(im => { const k = decodeURIComponent(im.getAttribute('src').slice((BASE + '/storage/v1/object/public/').length)); if (DB.objects[k]) im.src = DB.objects[k]; });
  new MutationObserver(fixImgs).observe(document.documentElement, { childList: true, subtree: true });
  window.MASAR_CLOUD_CONFIG = { url: BASE, key: 'demo-anon-key-0000000' };
  try { localStorage.removeItem('masar.cloud.cfg'); } catch (_) {}
  /* the DEMO label + demo controls */
  /* Google sign-in, simulated: choose a demo account, then come back with #access_token=... exactly like the real Google flow */
  function google() {
    const o = document.createElement('div');
    o.style.cssText = 'position:fixed;inset:0;z-index:99998;background:rgba(0,0,0,.55);display:grid;place-items:center;font:14px Segoe UI,Cairo,sans-serif';
    const known = DB.users.filter(x => x.google).map(x => x.email);
    o.innerHTML = '<div style="background:#fff;color:#222;border-radius:10px;padding:26px 28px;width:360px;box-shadow:0 20px 60px rgba(0,0,0,.4)">' +
      '<div style="font-weight:700;font-size:18px;margin-bottom:4px">Sign in with Google</div><div style="color:#c92a2a;font-size:12px;margin-bottom:14px">DEMO: no real Google account is used</div>' +
      (known.length ? '<div style="margin-bottom:10px">' + known.map(e => '<button data-e="' + e + '" style="display:block;width:100%;text-align:left;padding:10px;margin:4px 0;border:1px solid #ddd;border-radius:6px;background:#fafafa;cursor:pointer">' + e + '</button>').join('') + '</div>' : '') +
      '<label style="display:block;margin-bottom:6px;color:#555">Email</label><input id="dge" type="email" value="demo.user@gmail.com" style="width:100%;box-sizing:border-box;padding:9px;border:1px solid #ccc;border-radius:6px">' +
      '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px"><button id="dgc" style="padding:8px 16px;border:1px solid #ccc;border-radius:16px;background:#fff;cursor:pointer">Cancel</button><button id="dgo" style="padding:8px 18px;border:0;border-radius:16px;background:#1a73e8;color:#fff;cursor:pointer">Continue</button></div></div>';
    document.body.appendChild(o);
    const go = email => { email = (email || '').trim().toLowerCase(); if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { o.querySelector('#dge').style.borderColor = '#c92a2a'; return; }
      let x = DB.users.find(y => y.email === email);
      if (!x) { x = { id: uid(), email, pw: null, google: true, name: email.split('@')[0], admin: false, trial_end: new Date(Date.now() + DB.settings.trial_days * DAY).toISOString(), period_end: null, plan: null, canceled: false, created_at: now() }; DB.users.push(x); }
      x.google = true; save();
      location.href = location.pathname + '#access_token=demo-' + x.id + '&refresh_token=demor-' + x.id + '&expires_in=3600&token_type=bearer';
      location.reload(); };
    o.querySelector('#dgo').onclick = () => go(o.querySelector('#dge').value);
    o.querySelector('#dge').onkeydown = e => { if (e.key === 'Enter') go(e.target.value); };
    o.querySelector('#dgc').onclick = () => o.remove();
    o.querySelectorAll('[data-e]').forEach(b => b.onclick = () => go(b.dataset.e));
    o.querySelector('#dge').focus();
  }
  window.MASAR_DEMO = { google, db: () => DB, reset() { localStorage.removeItem(KEY); localStorage.removeItem('masar.cloud.session'); localStorage.removeItem('masar.sub.v1'); location.href = location.pathname; },
    endTrial() { const s = JSON.parse(localStorage.getItem('masar.cloud.session') || 'null'), x = s && DB.users.find(y => y.id === s.id); if (!x) return alert('Sign in first.'); x.trial_end = new Date(Date.now() - 60e3).toISOString(); if (!x.admin) x.period_end = null; save(); localStorage.removeItem('masar.sub.v1'); location.reload(); },
    endingSoon() { const s = JSON.parse(localStorage.getItem('masar.cloud.session') || 'null'), x = s && DB.users.find(y => y.id === s.id); if (!x) return alert('Sign in first.'); x.plan = x.plan || 'monthly'; x.period_end = new Date(Date.now() + 2 * DAY).toISOString(); save(); localStorage.removeItem('masar.sub.v1'); location.reload(); } };
  addEventListener('DOMContentLoaded', () => {
    const d = document.createElement('div'); d.id = 'demobar';
    d.style.cssText = 'position:fixed;left:50%;bottom:10px;transform:translateX(-50%);z-index:99999;background:#c92a2a;color:#fff;font:600 12px Segoe UI,Cairo,sans-serif;padding:6px 10px;border-radius:16px;display:flex;gap:8px;align-items:center;box-shadow:0 4px 18px rgba(0,0,0,.4)';
    const b = (t, f) => { const x = document.createElement('button'); x.textContent = t; x.style.cssText = 'border:0;border-radius:12px;padding:3px 10px;background:#fff;color:#c92a2a;font:600 11px inherit;cursor:pointer'; x.onclick = f; return x; };
    d.append('DEMO · nothing is real', b('End my trial', () => MASAR_DEMO.endTrial()), b('Ends in 2 days', () => MASAR_DEMO.endingSoon()), b('Reset demo', () => { if (confirm('Delete all demo data?')) MASAR_DEMO.reset(); }));
    if (/admin/.test(location.pathname)) { d.lastChild.previousSibling.remove(); d.lastChild.previousSibling.remove(); d.insertBefore(document.createTextNode(' · admin: admin@demo.masar / demo1234'), d.children[0]); }
    document.body.appendChild(d);
  });
})();
