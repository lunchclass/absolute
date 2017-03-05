// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const express = require('express');
const productController = require('../controller/product_controller');

const router = express.Router();

router.post('/', (request, response) => {
  if (request.body.name && request.body.amount) {
    productController.addProduct(JSON.parse(JSON.stringify(request.body)))
      .then((product) => {
        response.send(product);
      });
  } else {
    response.sendStatus(400);
  }
});

router.get('/', (request, response) => {
  productController.getProductList()
    .then((productList) => {
      response.send(productList);
    });
});

module.exports = router;
