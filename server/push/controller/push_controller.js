// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const push = require('./push_notification.js');
const PushToken = require('../model/push_token');

exports.saveToken = function (body) {
  console.log(`save client token : ${body.token}`);
  return new Promise((resolve, reject) => {
    PushToken.findOneAndUpdate({ userId: body.userId }, { token: body.token }
      , { upsert: true }, (err, doc) => {
        if (err) {
          resolve(err);
        } else {
          resolve(doc);
        }
      });
  });
};

exports.getToken = function (userId) {
  console.log(`get client token : ${userId}`);
  return new Promise((resolve, reject) => {
    PushToken.findOne({ userId }, (err, token) => {
      console.log(`token : ${token}`);
      if (err) {
        resolve(err);
      } else {
        resolve(JSON.stringify(token));
      }
    });
  });
};

exports.removeToken = function (userId) {
  console.log(`remove client userId : ${userId}`);
  return new Promise((resolve, reject) => {
    PushToken.findOneAndRemove({ userId }, (err, offer) => {
      if (err) {
        resolve(err);
      } else {
        resolve(offer);
      }
    });
  });
};

exports.updateToken = function (body) {
  console.log(`update token : ${body.token}`);
  return new Promise((resolve, reject) => {
    PushToken.findOneAndUpdate({ userId: body.userId }, { token: body.token }
      , (err, doc) => {
        if (err) {
          resolve(err);
        } else {
          resolve(doc);
        }
      });
  });
};

exports.sendPushNotification = function (clientToken) {
  // push.sendFCMNotification(clientToken);
  // setTimeout(push.sendFCMNotification, 2000, clientToken);
  console.log('send push!');
};
