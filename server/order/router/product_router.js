// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const express = require('express');
const productController = require('../controller/product_controller');

const router = express.Router();

router.post('/add', (req, res) => {
  productController.addProduct(JSON.stringify(req.body));
  res.sendStatus(200);
});

router.post('/list', (req, res) => {
  productController.getProductList()
    .then((productList) => {
      res.send(productList);
    });
});

module.exports = router;
