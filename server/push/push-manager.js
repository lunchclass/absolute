// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

exports.addClient = function(clientToken) {
  // save client token
  console.log('add client token :' + clientToken);
};

exports.removeClient = function(clientToken) {
  // remove client token
  console.log('remove client token :' + clientToken);
};

exports.updateToken = function(oldClientToken, newClientToken) {
  // removeClient(oldClientToken);
  // addclient(newClientToken);
};

exports.sendPushNotification = function(clientToken) {
  const push = require('./send-push-notification.js');
  //push.sendFCMNotification(clientToken);
  setTimeout(push.sendFCMNotification, 2000, clientToken);
  console.log('send push!');
};
