if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('service-worker.js').then(
      function(serviceWorkerRegistration) {
        console.log('Service Worker Registration Success.');
        // Push Manager
        if ('PushManager' in window) {
          navigator.serviceWorker.ready.then(function () {
            serviceWorkerRegistration.pushManager.subscribe().then(
              function(pushSubscription) {
                console.log(pushSubscription.endpoint);
              }, function(error) {
                console.log(error);
              }
            );
          });
        }
      }).catch(function(error) {
        console.error('Service Worker Registration Fail. ', error);
      });
  });
}

