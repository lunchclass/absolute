// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const request = require('request');
const config = require('../../config.js');

const serverKey = config.serverInfo.pushServerKey;

exports.sendPushNotification = function (clientToken, content) {
  console.log(`Send push notification ${serverKey}`);
  return new Promise((resolve, reject) => {
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
      if(error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};
