(function (global, factory) {
  global.swManager = new factory(global, global.document)();
}(typeof window !== 'undefined' ? window : this, function (w, d) {
  var swManager = function () {
    var self = this;
    var pushSubscription = '';
    var swRegistration = '';

    function registerServiceWorker() {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.register('sw.js')
        .then(function (registration) {
          swRegistration = registration;
          navigator.serviceWorker.ready.then(function (registration) {
            serviceWorkerRegistration.pushManager.subscribe({
              userVisibleOnly: true,
            })
            .then(function (subscription) {
              pushSubscription = subscription;
              sendPushTokenToServer();
            })
            .catch(function (err) {
              console.log('subscribe error ', err);
            });
          });
        })
        .catch(function (error) {
          console.error('service worker register error ', error);
        });
      } else {
        console.warn('push is not supported');
      }
    }

    function unregisterServiceWorker() {
    }

    function getSubscription() {
    }

    function sendPushTokenToServer() {
      var http = new XMLHttpRequest();
      var url = 'https://nadonguri.com/api/push/client';
      http.open('POST', url, true);
      http.setRequestHeader('Content-Type', 'application/json');
      http.onreadystatechange = function () {
        if (http.readyState == XMLHttpRequest.DONE && http.status == 200) {
          console.log(http.responseText);
        }
      };
      http.send(JSON.stringify({
        token: pushSubscription,
      }));
    }

    function requestPushPermission() {
    }

    function revokePermission() {
    }

    /**
     * Register firebase push
     */
    self.register = function () {
      registerServiceWorker();
    };

    /**
     * Unregister firebase push
     */
    self.unregister = function () {
    };

    /**
     * RequestPermission
     */
    self.requestPermission = function () {
    };
  };
  return swManager;
}));

