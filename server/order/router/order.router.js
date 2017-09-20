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

import Application from '../../base/application.js';
import * as order from '../controller/order_controller';

/**
 * It is class of rest api for order.
 * And it's temporary api. We will refactor this api
 */
@Application.route('/order')
export default class OrderRouter {
  get(request, response) {
    // FIXME We need keep session.
    order.getOrderList(request.query.userId)
      .then((orderList) => {
        response.send(orderList);
      });
  }

  post(request, response) {
    if (request.body.userId) {
      order.saveOrder(JSON.parse(JSON.stringify(request.body)));
      // FIXME Please define error code to common area.
      response.sendStatus(200);
    } else {
      // FIXME Please define error code to common area.
      response.sendStatus(400);
    }
  }
}
