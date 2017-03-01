// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const Product = require('../model/product');

exports.addProduct = function (jsonData) {
  const product = new Product(JSON.parse(jsonData));
  product.save();
};

exports.getProductList = function () {
  return new Promise((resolve, reject) => {
    Product.find({}, (err, productList) => {
      if (productList) {
        resolve(JSON.stringify(productList));
      } else {
        reject(-1);
      }
    });
  });
};
