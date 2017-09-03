import Push from './push/push_manager.js';
import pushKey from './push/push_key.js'

var push = new Push();

function urlBase64UrlToUint8Array(base64UrlData) {
  const padding = '='.repeat((4 - base64UrlData.length % 4) % 4);
  const base64 = (base64UrlData + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const buffer = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    buffer[i] = rawData.charCodeAt(i);
  }
  return buffer;
}

/**
 *  get service worker registration
 */
function getServiceworkerRegistration() {
  return new Promise(function(resolve, reject) {
    navigator.serviceWorker.getRegistrations().then(function(registration) {
      resolve(registration);
    });
  });
}

/**
 *  register service worker
 */
function registerServiceWorker() {
  navigator.serviceWorker.register('sw.js').then(
    function(serviceWorkerRegistration) {
      console.log('Service Worker Registration Success.');
      // Push Manager
      if ('PushManager' in window) {
        navigator.serviceWorker.ready.then(function () {
          const convertedVapidKey =
          urlBase64UrlToUint8Array(pushKey.pushVapidKeys.publicKey);
          serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey,
          }).then(
            function(pushSubscription) {
              push.registerPushSubscription(pushSubscription);
            }, function(error) {
              console.log(error);
            }
          );
        });
      }
    }
  ).catch(function(error) {
      console.error('Service Worker Registration Fail. ', error);
  });
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    Promise.resolve()
    .then(push.getPushPermissionStatus)
    .then(permission => {
      if (permission === 'granted') {
        // need to show popup notification for revoke
        registerServiceWorker();
      } else {
        // need to notify users that should enable push permission for absolute
        console.log('permission is denied');
      }
    });
  });
}

