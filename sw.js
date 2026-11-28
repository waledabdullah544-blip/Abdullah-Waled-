/* Masar service worker: the app opens with no internet. Network first (so updates arrive at once), the saved copy when offline.
   Only Masar's own files are cached; the server (accounts, templates, payments) is never cached. */
const CACHE = 'masar-app-v1';
const SHELL = ['/', '/masar.html', '/masar-config.js', '/manifest.webmanifest', '/icons/masar-192.png', '/icons/masar-512.png', '/icons/masar.svg'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== self.location.origin) return;
  if (u.pathname.startsWith('/models/')) {   // big AI model: keep the first download
    e.respondWith(caches.open(CACHE).then(async c => (await c.match(r)) || fetch(r).then(res => { if (res.ok) c.put(r, res.clone()); return res; })));
    return;
  }
  e.respondWith(fetch(r).then(res => { if (res.ok && (r.mode === 'navigate' || SHELL.includes(u.pathname))) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r.mode === 'navigate' ? '/' : r, cp)); } return res; })
    .catch(async () => (await caches.match(r)) || (r.mode === 'navigate' ? caches.match('/') : Response.error())));
});
