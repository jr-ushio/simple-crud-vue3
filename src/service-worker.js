importScripts('/workbox-v6.1.5/workbox-sw.js');
importScripts('/indexeddb-min.js');

workbox.loadModule('workbox-strategies');
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
self.skipWaiting()

const handler = workbox.precaching.createHandlerBoundToURL('/index.html');
const navigationRoute = new workbox.routing.NavigationRoute(handler);
workbox.routing.registerRoute(navigationRoute);


(async () => {
  const myDB = await idb.openDB('SmartClicDB', 1);

  myDB.get('response', 1).then(resp => {
    console.log('resp ', resp);
  })

  workbox.routing.registerRoute(
    'http://llega-ya.com/apitest/login', // Change to match your endpoint URL.
    async ({event, url}) => {
      const request = event.request;
      if (false) {
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
