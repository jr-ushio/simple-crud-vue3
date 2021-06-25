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

  // workbox.routing.registerRoute(
  //   new RegExp('.*'), // Change to match your endpoint URL.
  //   async ({event, url}) => {
  //     event.respondWith(
  //       // look in the cache for the resource
  //       caches.match(event.request).then(async response => {
  //         if (response) {
  //           // is in cache, respond with the cached resource
  //           return response;
  //         }
  //         // if not found fetch it from the network
  //         const networkResponse = await fetch(event.request);
  //         // response needs to be cloned if going to be used more than once
  //         const clonedResponse = networkResponse.clone();
  //
  //         // save response to runtime cache for later use
  //         const runtimeCache = await caches.open('runtime-cache');
  //         runtimeCache.put(event.request, networkResponse);
  //
  //         // respond with the cloned network response
  //         return Promise.resolve(clonedResponse);
  //       })
  //     );
  //   },
  //   'GET' // Opt-in to matching POST requests. Only GET is matched by default.
  // );

  workbox.routing.registerRoute(
    'http://llega-ya.com/apitest/login', // Change to match your endpoint URL.
    async ({event, url}) => {
      const request = event.request;
      const value = await myDB.get('offline', 1);
      if (!value || !value.status) {
        // return new Response(JSON.stringify({"mensaje":"DEL SERVICE WORKER.","codigo":404,"data":null}), {
        //   headers: { 'Content-Type': 'text/json' }
        // });
        return fetch(request.clone())
      } else {
        var req = new Request('http://llega-ya.com/apitest/login2', {
          method: request.method,
          headers: request.headers,
          // mode: 'same-origin', // need to set this properly
          credentials: request.credentials,
          // redirect: 'manual'   // let browser handle redirects
        });
        return fetch(req)
      }
    },
    'POST' // Opt-in to matching POST requests. Only GET is matched by default.
  );

  workbox.routing.registerRoute(
    /.*\/apitest\/usuarios/, // Change to match your endpoint URL.
    async ({event, url}) => {
      const request = event.request;
      const value = await myDB.get('offline', 1);
      console.log('service worker');
      if (!value || !value.status) {
        return fetch(request.clone())
      } else {
        return new Response(JSON.stringify({
          mensaje: '',
          data: {
            data: await myDB.getAllFromIndex('usuarios', 'id'),
            lastPage: 1,
            page: 1,
            perPage: 1000,
            total: 994
          },
          codigo: 200
        }), {
          headers: { 'Content-Type': 'text/json' }
        });
      }
    },
    'GET'
  );

})();
