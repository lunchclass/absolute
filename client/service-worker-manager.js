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
 *  register service worker
 */
function registerServiceWorker() {
  navigator.serviceWorker.register('sw.js').then(
    serviceWorkerRegistration => {
      console.log('Service Worker Registration Success.');
      // Push Manager
      if ('PushManager' in window) {
        navigator.serviceWorker.ready.then(() => {
          const convertedVapidKey =
          urlBase64UrlToUint8Array(pushKey.pushVapidKeys.publicKey);
          serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey,
          }).then(
            pushSubscription => {
              push.registerPushSubscription(pushSubscription);
            }, error => {
              console.log(error);
            }
          );
        });
      }
    }
  ).catch( error => {
      console.error('Service Worker Registration Fail. ', error);
  });
}

/**
 * check service worker registered or not
 */
function isServiceWorkerRegistered() {
  return new Promise((resolve, reject) => {
    navigator.serviceWorker.getRegistration().then(registration => {
      if (registration === undefined) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    Promise.resolve()
    .then(push.getPushPermissionStatus)
    .then(permission => {
      if (permission === 'granted' || permission === 'prompt') {
        Promise.resolve()
        .then(isServiceWorkerRegistered)
        .then(registerd => {
          if (registerd == false) {
            registerServiceWorker();
          }
        });
      } else {
        // TODO(jimmy): need to notify users that should enable push permission for absolute
        console.log('permission is denied');
      }
    });
  });
}

