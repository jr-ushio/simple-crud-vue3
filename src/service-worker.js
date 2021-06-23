importScripts('/workbox-sw.js'); // workbox-v6.1.5
importScripts('/indexeddb-min.js');

workbox.loadModule('workbox-strategies');
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
self.skipWaiting()

const handler = workbox.precaching.createHandlerBoundToURL('/index.html');
const navigationRoute = new workbox.routing.NavigationRoute(handler);
workbox.routing.registerRoute(navigationRoute);


(async () => {
  const myDB = await idb.openDB('SmartClicDB', 1);

  // let data = await myDB.get('response', 1)
  // console.log('data ', data);

  workbox.routing.registerRoute(
    new RegExp('.*'), // Change to match your endpoint URL.
    async ({event, url}) => {
      event.respondWith(
        // look in the cache for the resource
        caches.match(event.request).then(async response => {
          if (response) {
            // is in cache, respond with the cached resource
            return response;
          }
          // if not found fetch it from the network
          const networkResponse = await fetch(event.request);
          // response needs to be cloned if going to be used more than once
          const clonedResponse = networkResponse.clone();

          // save response to runtime cache for later use
          const runtimeCache = await caches.open('runtime-cache');
          runtimeCache.put(event.request, networkResponse);

          // respond with the cloned network response
          return Promise.resolve(clonedResponse);
        })
      );
    },
    'GET' // Opt-in to matching POST requests. Only GET is matched by default.
  );

  workbox.routing.registerRoute(
    'http://llega-ya.com/apitest/login', // Change to match your endpoint URL.
    async ({event, url}) => {
      const request = event.request;
      if (true) {
        return new Response(JSON.stringify({"mensaje":"DEL SERVICE WORKER.","codigo":404,"data":null}), {
          headers: { 'Content-Type': 'text/json' }
        });
      } else {
        return fetch(request.clone())
      }
    },
    'POST' // Opt-in to matching POST requests. Only GET is matched by default.
  );

})();