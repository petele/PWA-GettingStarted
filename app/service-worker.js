var cacheName = 'weatherPWA-201601201357';
var filesToCache = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/styles/inline.css',
  '/images/clear.png',
  '/images/cloudy-scattered-showers.png',
  '/images/cloudy.png',
  '/images/fog.png',
  '/images/ic_add_white_24px.svg',
  '/images/ic_refresh_white_24px.svg',
  '/images/partly-cloudy.png',
  '/images/rain.png',
  '/images/scattered-showers.png',
  '/images/sleet.png',
  '/images/snow.png',
  '/images/thunderstorm.png',
  '/images/wind.png'
];

// Place Service Worker Install Event Handler Here
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

// Place Service Worker Activation Event Handler Here
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// Place Service Worker Fetch Event Handler Here
self.addEventListener('fetch', function(e) {
  var weatherAPIURL = 'https://publicdata-weather.firebaseio.com/';
  if (e.request.url.indexOf(weatherAPIURL) === 0) {
    e.respondWith(
      fetch(e.request)
        .then(function(response) {
          return caches.open(cacheName).then(function(cache) {
            cache.put(e.request.url, response.clone());
            console.log('[ServiceWorker] FetchAndCache:', e.request.url);
            return response;
          });
        })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        console.log('[ServiceWorker] Fetch - Cache First:', e.request.url);
        return response || fetch(e.request);
      })
    );
  }
});
