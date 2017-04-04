// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const express = require('express');
const multer = require('multer');
const path = require('path');
const orderController = require('../controller/order_controller');

const router = express.Router();

router.post('/', (request, response) => {
  if (request.body.userId) {
    orderController.saveOrder(JSON.parse(JSON.stringify(request.body)));
    response.sendStatus(200);
  } else {
    response.sendStatus(400);
  }
});

router.post('/img', (request, response) => {
  const IMG_PATH = '../../../client/order/gallery';
  const UUID = request.query.userId;
  const DATE = Date.now();
  const TARGET_DIR = path.join(__dirname, `${IMG_PATH}/${UUID}/${DATE}/`);
  const multer_settings = multer({ dest: TARGET_DIR });
  const mul = multer_settings.single('file');

  mul(request, response, (err) => {
    if (err) {
      console.log(err);
      response.sendStatus(400);
    } else {
      response.send({ file: request.file.filename,
        path: DATE });
      // FIXME : for wedding event only, if UUID is not allowed push noti,
      // he(she) will not get reward and not get response about reward
      // FIXME : coupon must be coupled with UUID before calling orderFinish()
      // this api will send push notification to client
      orderController.sendCouponMessage(UUID);
    }
  });
});

router.get('/', (request, response) => {
  orderController.getOrderList(request.query.userId)
    .then((orderList) => {
      response.send(orderList);
    });
});

module.exports = router;
