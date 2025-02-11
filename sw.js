const CACHE_NAME = "to-do-list-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./icons/icon-192x192.png",
  "./icons/icon-512x512.png"
];

// Instalar el Service Worker y cachear archivos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activar el Service Worker y limpiar cache antigua
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Interceptar solicitudes y servir desde cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
