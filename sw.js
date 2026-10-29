const CACHE = "mis-tareas-v8";
const SHELL = ["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png", "instrument-sans-latin-400-normal.woff2", "instrument-sans-latin-500-normal.woff2", "instrument-sans-latin-600-normal.woff2", "instrument-sans-latin-700-normal.woff2", "instrument-serif-latin-400-italic.woff2", "instrument-serif-latin-400-normal.woff2", "source-serif-4-latin-400-normal.woff2", "source-serif-4-latin-500-normal.woff2", "source-serif-4-latin-600-normal.woff2", "source-serif-4-latin-700-normal.woff2"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
      .catch(() => caches.match(e.request, {ignoreSearch: true}).then(r => r || caches.match("index.html")))
  );
});
