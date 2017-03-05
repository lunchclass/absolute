// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const express = require('express');
const orderController = require('../controller/order_controller');

const router = express.Router();

router.post('/', (request, response) => {
  if (request.body.userId) {
    orderController.saveOrder(JSON.stringify(request.body));
    response.sendStatus(200);
  } else {
    response.sendStatus(400);
  }
});

router.get('/list', (request, response) => {
  orderController.getOrderList(request.query.userId)
    .then((orderList) => {
      response.send(orderList);
    });
});

module.exports = router;
