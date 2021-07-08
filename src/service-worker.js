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

  workbox.routing.registerRoute(
    /.*\/llega-ya.com.*/,
    async ({event, url}) => {
      return this.cambiarURL(myDB, event.request, url)
    },
    'GET'
  );
  workbox.routing.registerRoute(
    /.*\/llega-ya.com.*/,
    async ({event, url}) => {
      return this.cambiarURL(myDB, event.request, url)
    },
    'POST'
  );
  workbox.routing.registerRoute(
    /.*\/llega-ya.com.*/,
    async ({event, url}) => {
      return this.cambiarURL(myDB, event.request, url)
    },
    'PUT'
  );
  workbox.routing.registerRoute(
    /.*\/llega-ya.com.*/,
    async ({event, url}) => {
      return this.cambiarURL(myDB, event.request, url)
    },
    'DELETE'
  );


})();

async function cambiarURL(myDB, request, url) {
  const value = await myDB.get('offline', 1);
  if (!value || !value.status) {
    return fetch(request.clone())
  } else {
    const newUrl = url.href.replace('llega-ya.com', 'miniback.llega-ya.com')
    const bodyP = request.headers.get('Content-Type') ? request.blob() : Promise.resolve(undefined);
    let req = new Request(newUrl, {
      method: request.method,
      headers: request.headers,
      credentials: request.credentials,
      body: await bodyP
    });
    return fetch(req)
  }
}
