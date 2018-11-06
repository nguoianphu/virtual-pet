/*
	We only need to modify 2 places:
		1. cacheName
		2. filesToCache
*/

// register service worker
if ('serviceWorker' in navigator) { // if service worker API is available
  window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js', {scope: '/'}).then(function(registration) {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
          console.log('ServiceWorker registration failed: ', err);
      });
  });
}

var cacheName = 'virtualPet-v1'; /* Name your cache  */
var filesToCache = [				 /* Files you wan to store in cache */
  '/',
  '/index.html',
  '/manifest.json',
  '/sw.js',
  '/assets/images/icons/icon-72x72.png',
  '/assets/images/icons/icon-96x96.png',
  '/assets/images/icons/icon-128x128.png',
  '/assets/images/icons/icon-144x144.png',
  '/assets/images/icons/icon-152x152.png',
  '/assets/images/icons/icon-192x192.png',
  '/assets/images/icons/icon-384x384.png',
  '/assets/images/icons/icon-512x512.png',
  '/assets/images/apple.png',
  '/assets/images/arrow.png',
  '/assets/images/backyard.png',
  '/assets/images/bar.png',
  '/assets/images/candy.png',
  '/assets/images/logo.png',
  '/assets/images/pet.png',
  '/assets/images/rotate.png',
  '/assets/images/rubber_duck.png',
  '/js/states/BootState.js',
  '/js/states/GameState.js',
  '/js/states/HomeState.js',
  '/js/states/PreloadState.js',
  '/js/main.js',
  '/js/phaser.js',
];


// install service worker 
self.addEventListener('install', function(event) {
  console.log('sw install');
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('sw caching files');
      return cache.addAll(filesToCache);
    }).catch(function(err) {
      console.log(err);
    })
  );
});

// use cached assets: fetching service worker
self.addEventListener('fetch', (event) => {
  console.log('sw fetch');
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }).catch(function (error) {
      console.log(error);
    })
  );
});

