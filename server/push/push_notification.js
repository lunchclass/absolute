// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const serverKey = 'Your server key here, Never expose to client code';

/*
 TODO : Fixed content of json body will be changed from db
*/
exports.sendFCMNotification = function (clientToken) {
  console.log('Send push notification');
  const request = require('request');
  const jsonHeader = {
    Authorization: `key=${serverKey}`,
    'Content-Type': 'application/json',
  };

  const jsonBody = {
    notification: {
      title: 'Absolute FCM Push Notification',
      body: 'Sent from absolute!',
      icon: 'firebase-icon.png',
      click_action: 'https://localhost:9443/',
    },
    to: clientToken,
  };

  request({
    url: 'https://fcm.googleapis.com/fcm/send',
    method: 'POST',
    json: true,
    headers: jsonHeader,
    body: jsonBody,
  }, (error, response, body) => {
  });
};
