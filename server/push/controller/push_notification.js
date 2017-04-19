// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const request = require('request');
const config = require('../../config.js');

const serverKey = config.serverInfo.pushServerKey;

const jsonHeader = {
  Authorization: `key=${serverKey}`,
  'Content-Type': 'application/json',
};

function requestPush(jsonBody) {
  console.log(`Send push notification ${serverKey}`);
  return new Promise((resolve, reject) => {
    request({
      url: 'https://fcm.googleapis.com/fcm/send',
      method: 'POST',
      json: true,
      headers: jsonHeader,
      body: jsonBody,
    }, (error, response) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log(response.body);
        resolve(response.body);
      }
    });
  });
}

exports.sendPushNotification = function (clientToken, content) {
  return new Promise((resolve, reject) => {
    const token = clientToken.substring(clientToken.lastIndexOf('/') + 1);

    const jsonBody = {
      data: {
        title: content.title,
        body: content.body,
        icon: content.icon,
        click_action: content.click_action,
      },
      to: token,
    };
    requestPush(jsonBody).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  });
};

exports.broadCastPushNotification = function (tokenArray, content) {
  return new Promise((resolve, reject) => {
    const tokens = [];
    tokenArray.forEach((id, index) => {
      tokens.push(id.substring(id.lastIndexOf('/') + 1));
    });

    console.log(`tokens : ${tokens}`);

    const jsonBody = {
      notification: {
        title: content.title,
        body: content.body,
        icon: content.icon,
        click_action: content.url,
      },
      registration_ids: tokens,
    };

    requestPush(jsonBody).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  });
};
