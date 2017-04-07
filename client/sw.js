/* eslint-disable */
importScripts('authorization/authorization.js');

var serverUrl = 'https://nadongguri.com';

var fetchRequest = function (targetUrl, method, data) {
  return new Promise(function (resolve, reject) {
    fetch(targetUrl, { method, body: data }).then(function (response) {
      if (response.status !== 200) {
        console.log(`Failed to fetch from ${targetUrl} Status Code:
          ${response.status}`);
        return reject(response.status);
      }
      response.json().then(function (respData) {
        console.log(respData);
        return resolve(respData);
      });
    })
    .catch(function (err) {
      console.log(`Fetch Error : ${err}`);
      reject(err);
    });
  });
};

self.addEventListener('push', function (event) {
  var title;
  var body;
  if (event.data) {
    console.log('use push payload data');
    const data = event.data.json();
    event.waitUntil(self.registration.showNotification(
      data.notification.title, data.notification.body));
  } else {
    console.log('use server push notification data');
    event.waitUntil(getUuid().then(function (auth) {
      fetchRequest(`${serverUrl}/api/push/notification/message/${auth.uuid}`,
        'GET').then(function (notification) {
          title = notification.title;
          body = {
            body: notification.body,
            icon: notification.icon,
            data: {
              url: notification.url,
            },
          };
          event.waitUntil(self.registration.showNotification(title, body));
        }).catch(function(error) {
          console.log(`failed to get server push notification data ${error}`);
      });
    }));
  }
});

self.addEventListener('notificationclick', function (event) {
  const dday = new Date(2017, 3, 8, 16, 30, 0); // month starts from 0
  const now = new Date();
  if( now.getTime() >= dday.getTime() ){
    event.waitUntil(clients.openWindow(`${serverUrl}/coupon`));
  } else {
    event.waitUntil(clients.openWindow(`${serverUrl}/wedding/`));
  }
  event.notification.close();
});
