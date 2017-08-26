// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import {Product} from '../model/product';

/**
 * Add product data what admin added.
 * @param {json} productData data what admin sent.
 * @return {promise} result product data what admin sent.
 */
export function addProduct(productData) {
  return Product.findOneAndUpdate({name: productData.name}
    , {amount: productData.amount, options: productData.options}
    , {upsert: true}, (error, product) => {
      if (error) {
        reject(error);
      } else {
        resolve(product);
      }
    });
}

/**
 * Get product data list to saved.
 * @return {promise} result data list of product
 */
export function getProductList() {
  return Product.find({}, (error, productList) => {
    if (productList) {
      resolve(JSON.stringify(productList));
    } else {
      reject(error);
    }
  });
}
