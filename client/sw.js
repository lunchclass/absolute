/* eslint-disable */

self.addEventListener('push', function (event) {
  var data = {};
  if (event.data) {
    data = event.data.json();
  }

  event.waitUntil(
    self.registration.showNotification(
      data.notification.title, data.notification)
  );
});

self.addEventListener('notificationclick', function (event) {
});

