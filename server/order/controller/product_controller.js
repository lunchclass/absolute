// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const Product = require('../model/product');

exports.addProduct = function (productData) {
  return new Promise((resolve, reject) => {
    Product.findOneAndUpdate({ name: productData.name }
      , { amount: productData.amount, options: productData.options }
      , { upsert: true }, (error, product) => {
        if (error) {
          resolve(error);
        } else {
          resolve(product);
        }
      });
  });
};

exports.getProductList = function () {
  return new Promise((resolve, reject) => {
    Product.find({}, (error, productList) => {
      if (productList) {
        resolve(JSON.stringify(productList));
      } else {
        reject(-1);
      }
    });
  });
};
