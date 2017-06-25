// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import express from 'express';
import * as product from '../controller/product_controller';

const router = express.router();

router.post('/', (request, response) => {
  if (request.body.name && request.body.amount) {
    product.addProduct(JSON.parse(JSON.stringify(request.body)))
      .then((product) => {
        response.send(product);
      });
  } else {
    response.sendStatus(400);
  }
});

router.get('/', (request, response) => {
  product.getProductList()
    .then((productList) => {
      response.send(productList);
    });
});

module.exports = router;
