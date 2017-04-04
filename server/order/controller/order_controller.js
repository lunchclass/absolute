// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const Order = require('../model/order');
const pushController = require('../../push/controller/push_controller');

exports.saveOrder = function (orderData) {
  const order = new Order(orderData);
  order.save();
};

exports.getOrderList = function (userId) {
  return new Promise((resolve, reject) => {
    if (userId) {
      Order.find({ userId }, (error, orderList) => {
        if (orderList) {
          resolve(JSON.stringify(orderList));
        } else {
          reject(-1);
        }
      });
    } else {
      Order.find({}, (error, orderList) => {
        if (!error) {
          resolve(JSON.stringify(orderList));
        } else {
          reject(-1);
        }
      });
    }
  });
};

exports.sendCouponMessage = function (userId) {
  return new Promise((resolve, reject) => {
    if (userId) {
      pushController.getToken(userId).then((token) => {
        console.log(`Found token ${token}. lets send order finished`);
        // Set push message for userId
        // FIXME : below message should be changed after coupon set
        pushController.setPushNotificationMessage(userId,
          { title: '축하해 주셔서 감사합니다!',
            body: '사진을 정상적으로 등록 했습니다',
            icon: '',
            url: 'https://nadongguri.com/coupon' });
        // send push to token
        pushController.sendPushNotification(userId, null);
      });
    } else {
      reject('Invalid empty userId');
    }
  });
};
