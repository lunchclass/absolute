// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const express = require('express');
const productController = require('../controller/product_controller');

const router = express.Router();

router.post('/add', (request, response) => {
  productController.addProduct(JSON.stringify(request.body));
  response.sendStatus(200);
});

router.post('/list', (request, response) => {
  productController.getProductList()
    .then((productList) => {
      response.send(productList);
    });
});

module.exports = router;
