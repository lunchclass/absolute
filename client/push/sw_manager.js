(function (global, factory) {
  var Factory = factory;
  global.swManager = new Factory(global, global.document)();
}(typeof window !== 'undefined' ? window : this, function (w, d) {
  var swManager = function () {
    var self = this;
    var pushSubscription = '';
    var swRegistration = '';

    function addPushTokenToServer() {
      var http = new XMLHttpRequest();
      var url = 'https://nadonguri.com/api/push/client';
      http.open('POST', url, true);
      http.setRequestHeader('Content-Type', 'application/json');
      http.onreadystatechange = function () {
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
          console.log(http.responseText);
        }
      };
      http.send(JSON.stringify({
        token: pushSubscription.endpoint
      }));
    }

    function removePushTokenFromServer() {
      var http = new XMLHttpRequest();
      var url = "https://nadonguri.com/api/push/client";
      http.open("DELETE", url, true);
      http.setRequestHeader("Content-Type", "application/json");
      http.onreadystatechange = function() {
        if (http.readyState == XMLHttpRequest.DONE && http.status == 200) {
          console.log(http.responseText);
        }
      }
      http.send(JSON.stringify({
        token: pushSubscription.endpoint
      }));
    }

    function registerServiceWorker() {
      navigator.serviceWorker.register('sw.js');
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.register('sw.js')
        .then(function (registration) {
          swRegistration = registration;
          navigator.serviceWorker.ready.then(function () {
            swRegistration.pushManager.subscribe({
              userVisibleOnly: true,
            })
            .then(function (subscription) {
              pushSubscription = subscription;
              addPushTokenToServer();
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
      navigator.serviceWorker.ready.then(function(registration) {
        registration.pushManager.getSubscription().then(function(subscription) {
          subscription.unsubscribe().then(function(successful) {
            console.log('unsubscribe success');
          }).catch(function(e) {
            console.log('unsubscribe error');
          })
        })        
      });
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
      removePushTokenFromServer();
	  unregisterServiceWorker();
    };

    /**
     * RequestPermission
     */
    self.requestPermission = function () {
    };
  };
  return swManager;
}));

