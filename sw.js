/*
	We only need to modify 2 places:
		1. cacheName
		2. filesToCache
*/

// register service worker
if ('serviceWorker' in navigator) { // if service worker API is available
  window.addEventListener('load', function() {
      navigator.serviceWorker.register('/virtualpet/sw.js', {scope: '/virtualpet/'}).then(function(registration) {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
          console.log('ServiceWorker registration failed: ', err);
      });
  });
}

var cacheName = 'virtualPet-v1'; /* Name your cache  */
var filesToCache = [				 /* Files you wan to store in cache */
  '/virtualpet/',
  '/virtualpet/index.html',
  '/virtualpet/manifest.json',
  '/virtualpet/sw.js',
  '/virtualpet/assets/images/icons/icon-72x72.png',
  '/virtualpet/assets/images/icons/icon-96x96.png',
  '/virtualpet/assets/images/icons/icon-128x128.png',
  '/virtualpet/assets/images/icons/icon-144x144.png',
  '/virtualpet/assets/images/icons/icon-152x152.png',
  '/virtualpet/assets/images/icons/icon-192x192.png',
  '/virtualpet/assets/images/icons/icon-384x384.png',
  '/virtualpet/assets/images/icons/icon-512x512.png',
  '/virtualpet/assets/images/apple.png',
  '/virtualpet/assets/images/arrow.png',
  '/virtualpet/assets/images/backyard.png',
  '/virtualpet/assets/images/bar.png',
  '/virtualpet/assets/images/candy.png',
  '/virtualpet/assets/images/logo.png',
  '/virtualpet/assets/images/pet.png',
  '/virtualpet/assets/images/rotate.png',
  '/virtualpet/assets/images/rubber_duck.png',
  '/virtualpet/js/states/BootState.js',
  '/virtualpet/js/states/GameState.js',
  '/virtualpet/js/states/HomeState.js',
  '/virtualpet/js/states/PreloadState.js',
  '/virtualpet/js/main.js',
  '/virtualpet/js/phaser.js',
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

