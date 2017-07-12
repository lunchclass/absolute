// Copyright (c) 2017 The Absolute Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
