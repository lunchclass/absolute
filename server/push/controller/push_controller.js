// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const push = require('./push_notification.js');
const PushToken = require('../model/push.js');
const DefaultMessage = require('../model/default_message.js');

exports.saveToken = function (body) {
  console.log(`save client userId : ${body.userId} token : ${body.token}`);
  return new Promise((resolve, reject) => {
    PushToken.findOneAndUpdate({ userId: body.userId }, { token: body.token }
      , { upsert: true }, (error, token) => {
        if (error) {
          reject(error);
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
        reject(error);
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
        reject(error);
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
          reject(error);
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
        reject(error);
      } else {
        push.sendPushNotification(data.token, body);
        resolve(data.token);
      }
    });
  });
};


exports.setPushNotificationMessage = function (id, message) {
  console.log(`set push notification message : ${JSON.stringify(message)}`);
  return new Promise((resolve, reject) => {
    let schema;
    let query;
    if (id) {
      schema = PushToken;
      query = { userId: id };
      console.log(`set for ${id}`);
    } else {
      schema = DefaultMessage;
      query = { name: 'WeddingMessage' };
      console.log('set for default');
    }
    schema.findOneAndUpdate(query,
      { title: message.title,
        body: message.body,
        icon: message.icon,
        url: message.url }, { upsert: true }, (error, data) => {
          if (error) {
            reject(error);
          } else {
            console.log(`${data}`);
            resolve(data);
          }
        });
  });
};


function getDefaultPushNotificationMessage() {
  console.log('get default push notification message');
  return new Promise((resolve, reject) => {
    DefaultMessage.findOne({ name: 'WeddingMessage' }, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.stringify({
          title: data.title,
          body: data.body,
          icon: data.icon,
          url: data.url }));
      }
    });
  });
}

exports.getDefaultPushNotificationMessage = getDefaultPushNotificationMessage;

// if title, body is not defined for id, return default message
exports.getPushNotificationMessage = function (id) {
  console.log(`get push notification message for ${id}`);
  return new Promise((resolve, reject) => {
    PushToken.findOne({ userId: id }, (error, data) => {
      if (error) {
        reject(error);
      } else {
        console.log(`data : ${JSON.stringify(data)}`);
        if (data.title && data.body) {
          resolve(JSON.stringify({
            title: data.title,
            body: data.body,
            icon: data.icon,
            url: data.url }));
        } else {
          console.log('notification data is not set, use default');
          getDefaultPushNotificationMessage().then((pushData) => {
            resolve(pushData);
          });
        }
      }
    });
  });
};

exports.getClientCount = function () {
  return new Promise((resolve, reject) => {
    PushToken.count({}, (error, count) => {
      if (error) {
        console.log(`errro while getting push client counts ${error}`);
        reject(error);
      } else {
        resolve(JSON.stringify({ clientCount: count }));
      }
    });
  });
};
