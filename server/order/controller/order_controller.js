// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const Order = require('../model/order');

exports.saveOrder = function (jsonData) {
  const order = new Order(JSON.parse(jsonData));
  order.save();
};

exports.getOrderList = function (userId) {
  return new Promise((resolve, reject) => {
    Order.find({ userId }, (err, orderList) => {
      if (orderList) {
        resolve(JSON.stringify(orderList));
      } else {
        reject(-1);
      }
    });
  });
};
