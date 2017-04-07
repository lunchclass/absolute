// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const express = require('express');
const multer = require('multer');
const path = require('path');
const orderController = require('../controller/order_controller');
const couponController = require('../controller/coupon_controller');

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
    } else if (request.file) {
      response.send({ file: request.file.filename,
        path: DATE });
        // FIXME : for wedding event only, if UUID is not allowed push noti,
        // he(she) will not get reward and not get response about reward
      couponController.sendCouponMessage(UUID);
    } else {
      console.log('fail to save file');
      response.sendStatus(400);
    }
  });
});

router.get('/', (request, response) => {
  orderController.getOrderList(request.query.userId)
    .then((orderList) => {
      response.send(orderList);
    });
});

router.get('/coupon', (request, response) => {
  couponController.getCouponUrl(request.query.userId)
    .then((imageUrl) => {
      response.send(imageUrl);
    })
    .catch((error) => {
      response.send(error);
    });
});

module.exports = router;
