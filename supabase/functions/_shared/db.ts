// Tiny REST client for the function side. The service key bypasses the row rules, so it is only used on the server.
export type Env = (k: string) => string | undefined;
export function db(env: Env, f: typeof fetch = fetch) {
  const url = (env('SUPABASE_URL') || '').replace(/\/+$/, ''), key = env('SUPABASE_SERVICE_ROLE_KEY') || '';
  const h = (extra: Record<string, string> = {}) => ({ apikey: key, Authorization: 'Bearer ' + key, 'Content-Type': 'application/json', ...extra });
  const go = async (method: string, path: string, body?: unknown, prefer?: string) => {
    const r = await f(url + '/rest/v1/' + path, { method, headers: h(prefer ? { Prefer: prefer } : {}), body: body === undefined ? undefined : JSON.stringify(body) });
    if (!r.ok) throw new Error('db ' + method + ' ' + path.split('?')[0] + ' ' + r.status + ': ' + (await r.text()).slice(0, 300));
    const t = await r.text(); return t ? JSON.parse(t) : null;
  };
  return {
    url,
    get: (p: string) => go('GET', p),
    insert: (t: string, row: unknown) => go('POST', t, row, 'return=representation'),
    patch: (p: string, row: unknown) => go('PATCH', p, row, 'return=representation'),
    /** the signed-in user behind a request's Authorization header */
    user: async (auth: string | null) => {
      if (!auth) return null;
      const r = await f(url + '/auth/v1/user', { headers: { apikey: env('SUPABASE_ANON_KEY') || key, Authorization: auth } });
      return r.ok ? r.json() : null;
    },
  };
}
export const json = (body: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...CORS, ...extra } });
export const CORS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type', 'Access-Control-Allow-Methods': 'POST, OPTIONS' };
export const startOfDayIso = (d = new Date()) => new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())).toISOString();
