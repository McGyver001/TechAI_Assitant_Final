const CACHE_NAME = 'techai-assistant-cache-v1';
const OFFLINE_URL = '/index.html';
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll([OFFLINE_URL])));
  self.skipWaiting();
});
self.addEventListener('activate', (event) => { event.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', (event) => { event.respondWith(caches.match(event.request).then((r) => r || fetch(event.request))); });
