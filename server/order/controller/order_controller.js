// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const Order = require('../model/order');

exports.saveOrder = function (orderData) {
  const order = new Order(orderData);
  order.save();
};

exports.getOrderList = function (userId) {
  return new Promise((resolve, reject) => {
    if (userId) {
      Order.find({ userId }, 'items -_id options', (error, orderList) => {
        if (orderList) {
          resolve(orderList);
        } else {
          reject(-1);
        }
      });
    } else {
      Order.find({}, 'items -_id options', (error, orderList) => {
        if (!error) {
          resolve(orderList);
        } else {
          reject(-1);
        }
      });
    }
  });
};
