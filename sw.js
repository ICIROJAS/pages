const CACHE_NAME = 'todo-list-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/script.js',
  '/manifest.json',
  '/C:/Users/Colibecas/Desktop/to-list/lista.png',
  '/C:/Users/Colibecas/Desktop/to-list/Papirus-Team-Papirus-Apps-Logisim-icon.512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
