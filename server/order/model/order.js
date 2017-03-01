// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{
    name: { type: String, lowercase: true, trim: true },
    count: Number,
    amount: Number,
  }],
  totalAmount: Number,
  image: { data: Buffer, contentType: String },
  orderDate: { type: Date, default: Date.now },
  options: String,
});

module.exports = mongoose.model('order', orderSchema);
