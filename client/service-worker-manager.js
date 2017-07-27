import Push from './push/push_manager.js';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('javascript/sw.js').then(
      function(serviceWorkerRegistration) {
        console.log('Service Worker Registration Success.');
        // Push Manager
        if ('PushManager' in window) {
          navigator.serviceWorker.ready.then(function () {
            serviceWorkerRegistration.pushManager.subscribe({
              userVisibleOnly: true,
            }).then(
              function(pushSubscription) {
                Push.registerSubscription(pushSubscription);     				
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

