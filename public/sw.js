self.addEventListener('install', (event) => {
  console.log('Service worker installing...');
  // Cache resources here if needed
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activating...');
});

self.addEventListener('fetch', (event) => {
  // For offline support, implement caching logic here
  event.respondWith(fetch(event.request));
});