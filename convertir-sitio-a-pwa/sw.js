// Asignar un nombre y versión al caché
const CACHE_NAME = 'v1_cache_programador_fitness';
const urlsToCache = [
  './',
  'https://fonts.googleapis.com/css?family=Raleway:400,700',
  'https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwJYtWqZPAA.woff2',
  'https://use.fontawesome.com/releases/v5.0.7/css/all.css',
  'https://use.fontawesome.com/releases/v5.0.6/webfonts/fa-brands-400.woff2',
  './style.css',
  './script.js',
  './img/pdconjr.jpg',
  './img/icon_225.png',
  './img/favicon.png'
];

// Durante la fase de instalación, generalmente se almacenan en caché los activos estáticos
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
      .catch((err) => console.log('Falló el registro de cache', err))
  );
});

// Una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', (e) => {
  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              // Eliminamos lo que ya no se necesita en el caché
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Cuando el navegador recupera una URL
self.addEventListener('fetch', (e) => {
  // Responder ya sea con el objeto en caché o continuar y buscar la URL real
  e.respondWith(
    caches.match(e.request)
      .then((res) => {
        if (res) {
          // Recuperar del caché
          return res;
        }
        // Recuperar de la petición a la URL y almacenar en caché
        return fetch(e.request)
          .then((response) => {
            // Clonar la respuesta para poder usarla tanto para la caché como para responder
            const clonedResponse = response.clone();
            // Abrir el caché y almacenar la solicitud y la respuesta clonada
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(e.request, clonedResponse);
              });
            // Responder con la respuesta original
            return response;
          });
      })
  );
});
