// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const express = require('express');
const orderController = require('../controller/order_controller');

const router = express.Router();

router.post('/', (req) => {
  orderController.saveOrder(JSON.stringify(req.body));
});

router.post('/ordered_list', (req, res) => {
  orderController.getOrderList(req.body.userId)
    .then((orderList) => {
      res.send(orderList);
    });
});

module.exports = router;
