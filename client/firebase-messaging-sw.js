importScripts('https://www.gstatic.com/firebasejs/3.6.10/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.6.10/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': ''
});

const messaging = firebase.messaging();
self.addEventListener('push', function(event) {
  var data = {};
  if (event.data) {
    data = event.data.json();
  }
  if (data.error || !data.notification) {
    console.error('push event data error.', data.error);  
    throw new Error();
  }

  event.waitUntil(
    self.registration.showNotification(
      data.notification.title, data.notification)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.matchAll({
    type: 'window'
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url === '/' && 'focus' in client) {
        return client.focus();
      }
    }
    if (clients.openWindow) {
      return clients.openWindow('/');
    }
  }));
});
