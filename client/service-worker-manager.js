if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('service-worker.js').then(
      function(serviceWorkerRegistration) {
        console.log('Service Worker Registration Success.');
        // Push Manager
        if ('PushManager' in window) {
          navigator.serviceWorker.ready.then(function () {
            serviceWorkerRegistration.pushManager.subscribe({
              userVisibleOnly: true,
            }).then(
              function(pushSubscription) {
                var data = {
                  endpoint: pushSubscription.endpoint,
                  p256dh: btoa(String.fromCharCode.apply
                    (null, new Uint8Array(pushSubscription.getKey('p256dh'))))
                    .replace(/\+/g, '-').replace(/\//g, '_'),
                  auth: btoa(String.fromCharCode.apply
                    (null, new Uint8Array(pushSubscription.getKey('auth'))))
                    .replace(/\+/g, '-').replace(/\//g, '_')
                }
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

