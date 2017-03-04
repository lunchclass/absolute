// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const push = require('./push_notification.js');
const PushToken = require('../model/push_token');

exports.saveToken = function (jsonData) {
  console.log(`save client token : ${jsonData}`);
  const pushToken = new PushToken(JSON.parse(jsonData));
  pushToken.save();
};

exports.getToken = function (userId) {
  console.log(`get client token : ${userId}`);
  return new Promise((resolve, reject) => {
    PushToken.findOne({ userId }, (err, token) => {
      console.log(`token : ${token}`);
      if (token) {
        resolve(JSON.stringify(token));
      } else {
        reject(-1);
      }
    });
  });
};

exports.removeToken = function (token) {
  console.log(`remove client token : ${token}`);
  return new Promise((resolve, reject) => {
    PushToken.findOneAndRemove({ token }, (err, offer) => {
      if (err) {
        resolve(offer);
      } else {
        reject(1);
      }
    });
  });
};

exports.updateToken = function (oldToken, newToken) {
  console.log(`update token old : ${oldToken} new : ${newToken}`);
  return new Promise((resolve, reject) => {
    PushToken.findOneAndUpdate({ token: oldToken }, { token: newToken }
        , (err, doc) => {
          if (doc) {
            resolve(doc);
          } else {
            reject(1);
          }
        });
  });
};

exports.sendPushNotification = function (clientToken) {
  // push.sendFCMNotification(clientToken);
  // setTimeout(push.sendFCMNotification, 2000, clientToken);
  console.log('send push!');
};
