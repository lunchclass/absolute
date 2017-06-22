// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

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
