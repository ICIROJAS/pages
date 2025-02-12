const CACHE_NAME = 'todo-list-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/script.js',
  '/manifest.json',
  '/https://github.com/ICIROJAS/pages/blob/838687e14d66b0d261fd7bec6bbcf1a2c59ff451/lista.png',
  '/https://github.com/ICIROJAS/pages/blob/838687e14d66b0d261fd7bec6bbcf1a2c59ff451/Papirus-Team-Papirus-Apps-Logisim-icon.512.png'
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
