import Notification from './push/notification_manager.js';

var notification = new Notification();

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('push', function(event) {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return;
  }

  notification.createNotification(event);
});

self.addEventListener('notificationclick', function (event) {
  notification.closeNotification(event);
  notification.processNotificationClickEvent(event);
});
