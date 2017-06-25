if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('service-worker.js').then(function(registration) {
      console.log('Service Worker Registerd Successfully');
    }).catch(function(e) {
      console.error('Service worker registration failed. ', e);
    });
  });
}