if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('service-worker.js').then(function(registration) {
      console.log('Service Worker Registration Success.');
    }).catch(function(e) {
      console.error('Service Worker Registration Fail. ', e);
    });
  });
}

