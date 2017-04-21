/* eslint-disable */
importScripts('authorization/authorization.js');

var fetchRequest = function (targetUrl, method, data) {
  return new Promise(function (resolve, reject) {
    fetch(targetUrl, { method, body: data }).then(function (response) {
      if (response.status !== 200) {
        console.log('Failed to fetch from ${targetUrl} Status Code: '
            + response.status);
        return reject(response.status);
      }
      response.json().then(function (respData) {
        console.log(respData);
        return resolve(respData);
      });
    })
    .catch(function (err) {
      console.log('Fetch Error : ' + err);
      reject(err);
    });
  });
};

function isWeddingBegun() {
  const dday = new Date(2017, 3, 22, 11, 30, 0); // month starts from 0
  const now = new Date();
  if (now.getTime() >= dday.getTime()) {
    return true;
  } else {
    return false;
  }
}

self.addEventListener('push', function (event) {
  var title = "축하해주셔서 감사합니다.";
  const notificationOptions = {
    body: "클릭하여 신랑이 준비한 선물을 받아가세요.",
    icon: "/wedding/images/etc/coupon.png",
    data: {
      url: '/coupon'
    }
  };

  if (!isWeddingBegun()) {
    title = "4월22일 토요일 12시";
    notificationOptions.body = "장우석♡박혜림 결혼을 축하해주세요!!!";
    notificationOptions.icon = "/wedding/images/etc/noti_main.jpg";
  }

  event.waitUntil(
      self.registration.showNotification(title, notificationOptions));
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  var url = "/coupon";
  if (!isWeddingBegun()) {
    url = "/wedding";
  }
  event.waitUntil(clients.openWindow(url));
});
