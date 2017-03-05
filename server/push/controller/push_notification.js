// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const serverKey = 'AAAA9Ox3NIQ:APA91bHy8IWmLJ-KTWdHO2KvsozbWDhPygNw5av9ukQWj8SomTAbOEOLD73BetiQlFQpF6nbhgBn9fNVex-_9rYZ5vhrLxiJtt8BgivtI9S0mEeW-BpmVVvGJ_PU6-tfvT-Ka9rvzf3Xmjxpk9CIauyljMYs2sebOg';
const request = require('request');

exports.sendPushNotification = function (clientToken, content) {
  console.log('Send push notification');
  const token = clientToken.substring(clientToken.lastIndexOf('/') + 1);

  const jsonHeader = {
    Authorization: `key=${serverKey}`,
    'Content-Type': 'application/json',
  };

  const jsonBody = {
    notification: {
      title: content.title,
      body: content.body,
      icon: content.icon,
      click_action: content.click_action,
    },
    to: token,
  };

  request({
    url: 'https://fcm.googleapis.com/fcm/send',
    method: 'POST',
    json: true,
    headers: jsonHeader,
    body: jsonBody,
  }, (error, response) => { /* eslint-disable */
    console.log(`failed to send notification ${error}`);
  });
};
