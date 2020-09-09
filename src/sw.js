self.__precacheManifest = [].concat(self.__precacheManifest || []);
// workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
    new RegExp(''),
    workbox.strategies.networkFirst({
        cacheName: 'API',
    }),
);

// install new service worker when ok, then reload page.
self.addEventListener("message", msg => {
    if (msg.data.action == 'skipWaiting') {
        self.skipWaiting()
    }
});

self.addEventListener("offline", msg => {
    console.log(msg);
});

self.addEventListener('push', function (event) {
    if (event.data) {
        // Notification.requestPermission();
        event.waitUntil(self.registration.showNotification("abc", {
            body: event.data.text()
        }));
    } else {
        console.log('This push event has no data.');
    }
});


self.addEventListener('fetch', function (event) {
    console.log(event);
    event.respondWith(
        fetch(event.request).catch(function () {
            return caches.match(event.request);
        })
    );
});



function postMessage(payload) {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        // check if it's properly installed
        navigator.serviceWorker.controller.postMessage(payload);
        return false;
    } else {
        // no service workers supported push the queue manualy
        return true;
    }
}