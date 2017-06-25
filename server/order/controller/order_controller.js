// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import {Order} from '../model/order';

/**
 * Save order data what user ordered.
 * @param {json} orderData data what user sent.
 */
export function saveOrder(orderData) {
  const order = new Order(orderData);
  order.save();
}

/**
 * Get order data what user ordered of user Id.
 * @param {string} userId data of user id.
 * @return {promise} result data of user ordered
 */
export function getOrderList(userId) {
  return new Promise((resolve, reject) => {
    if (userId) {
      Order.find({userId}, 'items -_id options', (error, orderList) => {
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
}
