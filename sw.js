self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open("app-cache").then(function (cache) {
            return cache.addAll([
                "index.html",
                "script.js",
                "style.css",
                "manifest.json",
                "icons/icon.png",           
                "icons/icon-large.png"      
            ]);
        })
    );
});


self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
