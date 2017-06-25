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

import express from 'express';
import * as order from '../controller/order_controller';

const router = express.router();

router.post('/', (request, response) => {
  if (request.body.userId) {
    order.saveOrder(JSON.parse(JSON.stringify(request.body)));
    response.sendStatus(200);
  } else {
    response.sendStatus(400);
  }
});

router.get('/', (request, response) => {
  order.getOrderList(request.query.userId)
    .then((orderList) => {
      response.send(orderList);
    });
});

module.exports = router;
