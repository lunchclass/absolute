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

    title = '나동진♡김소영 결혼합니다!';
    const notificationOptions = {
      body: '2017년 4월 8일 토요일 오후 5시',
      icon: './images/main.jpg',
      badge: './images/badge-72x72.png',
      tag: 'wedding',
      url: 'https://nadongguri.com/wedding/',
    };
    body = notificationOptions;
  }

  event.waitUntil(self.registration.showNotification(title, body));
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  /* eslint-disable */
  clients.openWindow('https://nadongguri.com/wedding/');
});
