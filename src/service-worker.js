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

  const ruta = {
    servidor: 'https://backsimple.llega-ya.com',
    offline: 'https://miniback.llega-ya.com'
  }

  workbox.routing.registerRoute(
    new RegExp(`^${ruta.servidor}.*/`),
    async ({event, url}) => {
      return this.cambiarURL(myDB, event.request, url, ruta.servidor, ruta.offline)
    },
    'GET'
  );
  workbox.routing.registerRoute(
     new RegExp(`^${ruta.servidor}.*/`),
    async ({event, url}) => {
      return this.cambiarURL(myDB, event.request, url, ruta.servidor, ruta.offline)
    },
    'POST'
  );
  workbox.routing.registerRoute(
     new RegExp(`^${ruta.servidor}.*/`),
    async ({event, url}) => {
      return this.cambiarURL(myDB, event.request, url, ruta.servidor, ruta.offline)
    },
    'PUT'
  );
  workbox.routing.registerRoute(
     new RegExp(`^${ruta.servidor}.*/`),
    async ({event, url}) => {
      return this.cambiarURL(myDB, event.request, url, ruta.servidor, ruta.offline)
    },
    'DELETE'
  );

})();

async function cambiarURL(myDB, request, url, urlOld, urlNew) {
  const value = await myDB.get('offline', 1);
  if (!value || !value.status) {
    return fetch(request.clone())
  } else {
    const newUrl = url.href.replace(urlOld, urlNew)
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
