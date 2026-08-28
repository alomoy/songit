// Minimal service worker: a network passthrough. Its only job right now is
// satisfying the "installable PWA" requirement (a registered service worker
// with a fetch handler) — it does not cache anything yet. The CSV-driven
// pages here change often (songs.csv, generated player pages), and getting
// cache invalidation wrong would risk showing stale song data instead of
// actually speeding anything up. Add caching deliberately later if needed.

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
