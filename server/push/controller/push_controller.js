// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const push = require('./push_notification.js');
const Endpoint = require('../model/endpoint');

exports.addClient = function (clientToken) {
  // save client token
  console.log(`add client token :' + ${clientToken}`);
};

exports.removeClient = function (clientToken) {
  // remove client token
  console.log(`remove client token : ${clientToken}`);
};

exports.updateToken = function (oldClientToken, newClientToken) {
  // removeClient(oldClientToken);
  // addclient(newClientToken);
  console.log(`update token old : ${oldClientToken} new : ${newClientToken}`);
};

exports.sendPushNotification = function (clientToken) {
  // push.sendFCMNotification(clientToken);
  // setTimeout(push.sendFCMNotification, 2000, clientToken);
  console.log('send push!');
};

exports.saveEndpoint = function (jsonData) {
  const endpoint = new Endpoint(JSON.parse(jsonData));
  endpoint.save();
};

exports.getEndpoint = function (userId) {
  return new Promise((resolve, reject) => {
    Endpoint.findOne({ userId }).select('endpoint').exec((err, endPoint) => {
      if (endPoint) {
        resolve(JSON.stringify(endPoint));
      } else {
        reject(-1);
      }
    });
  });
};
