  /* eslint-disable */
importScripts('authorization/authorization.js');
var sendRequest = function (targetUrl, method, data) {
  return new Promise((resolve, reject) => {
    fetch(targetUrl, { method, body: data }).then(function (response) {
      if (response.status !== 200) {
        console.log(`Failed to fetch from ${targetUrl} Status Code:
          ${response.status}`);
        reject(response.status);
      }
      response.json().then(function (data) {
        console.log(data);
        resolve(data);
      });
    });
  })
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
    reject(err);
  });
};

self.addEventListener('push', function (event) {
  var title;
  var body;

  if (event.data) {
    console.log('get push notification data');
    const data = event.data.json();
    title = data.notification.title;
    body = data.notification.body;
  } else {
    console.log('use static push notification data');
    // getUuid().then(function (uuid) {
    sendRequest('http://localhost:9080/api/push/notification/message/80522541-801c-439d-8e91-47d8ce5cd8d4',
      'GET').then(function (notification) {
        title = notification.title;
        body = {
          body: notification.body,
          icon: notification.icon,
          url: notification.url,
        };
      }).then(function () {
        self.registration.showNotification(title, body);
      });
    // });
  }
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  clients.openWindow('https://nadongguri.com/wedding/');
});
