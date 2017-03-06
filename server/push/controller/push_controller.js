// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const push = require('./push_notification.js');
const PushToken = require('../model/push_token');

exports.saveToken = function (body) {
  console.log(`save client token : ${body.token}`);
  return new Promise((resolve, reject) => {
    PushToken.findOneAndUpdate({ userId: body.userId }, { token: body.token }
      , { upsert: true }, (error, token) => {
        if (error) {
          resolve(error);
        } else {
          resolve(token);
        }
      });
  });
};

exports.getToken = function (userId) {
  console.log(`get client token : ${userId}`);
  return new Promise((resolve, reject) => {
    PushToken.findOne({ userId }, (error, token) => {
      console.log(`token : ${token}`);
      if (error) {
        resolve(error);
      } else {
        resolve(JSON.stringify(token));
      }
    });
  });
};

exports.removeToken = function (userId) {
  console.log(`remove client userId : ${userId}`);
  return new Promise((resolve, reject) => {
    PushToken.findOneAndRemove({ userId }, (error, token) => {
      if (error) {
        resolve(error);
      } else {
        resolve(token);
      }
    });
  });
};

exports.updateToken = function (body) {
  console.log(`update token : ${body.token}`);
  return new Promise((resolve, reject) => {
    PushToken.findOneAndUpdate({ userId: body.userId }, { token: body.token }
      , (error, token) => {
        if (error) {
          resolve(error);
        } else {
          resolve(token);
        }
      });
  });
};

exports.sendPushNotification = function (body) {
  console.log(`send push notification to ${body.userId}`);
  return new Promise((resolve, reject) => {
    PushToken.findOne({ userId: body.userId }, (error, data) => {
      console.log(`stored data : ${data}`);
      if (error) {
        resolve(error);
      } else {
        push.sendPushNotification(data.token, body);
        resolve(data.token);
      }
    });
  });
};
