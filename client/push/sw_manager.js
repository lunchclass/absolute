(function (global, factory) {
  var Factory = factory;
  global.swManager = new Factory(global, global.document)();
}(typeof window !== 'undefined' ? window : this, function (w, d) {
  var swManager = function () {
    var self = this;
    var pushSubscription = '';
    var swRegistration = '';

    function addPushTokenToServer() {
      /* eslint-disable */
      getUuid().then(function (uuid) {
        var http = new XMLHttpRequest();
        //var url = 'https://nadongguri.com/api/push/client';
        var url = 'http://localhost:9080/api/push/client';
        http.open('POST', url, true);
        http.setRequestHeader('Content-Type', 'application/json');
        http.onreadystatechange = function () {
          if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
            console.log(http.responseText);
          }
        };
        console.log(`addPushToken ${uuid}  ${pushSubscription.endpoint} `);
        http.send(JSON.stringify({
          token: pushSubscription.endpoint,
          userId: uuid.uuid,
        }));
      });
      /* eslint-enable */
    }

    function removePushTokenFromServer() {
      var http = new XMLHttpRequest();
      // var url = 'https://nadongguri.com/api/push/client';
      var url = 'http://localhost:9080/api/push/client';
      http.open('DELETE', url, true);
      http.setRequestHeader('Content-Type', 'application/json');
      http.onreadystatechange = function () {
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
          console.log(http.responseText);
        }
      };
      http.send(JSON.stringify({
        token: pushSubscription.endpoint,
      }));
    }

    function registerServiceWorker() {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.register('../sw.js')
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
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.ready.then(function (registration) {
          registration.pushManager.getSubscription().then(function (subscription) {
            subscription.unsubscribe().then(function (successful) {
              console.log('unsubscribe success');
            }).catch(function (e) {
              console.log('unsubscribe error');
            });
          });
        });
      } else {
        console.warn('push is not supported');
      }
    }

    function updatePushSubscription() {
      return new Promise(function (resolve, reject) {
        navigator.serviceWorker.ready.then(function (registration) {
          registration.pushManager.getSubscription().then(function (subscription) {
            pushSubscription = subscription;
            resolve(pushSubscription.endpoint);
          })
          .catch(function (error) {
            reject(error);
          });
        });
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
     * get current push token
     */
    self.getPushToken = function () {
      return new Promise(function (resolve, reject) {
        updatePushSubscription().then(function (result) {
          resolve(result);
        });
      });
    };

    /**
     * RequestPermission
     */
    self.requestPermission = function () {
    };
  };
  return swManager;
}));
