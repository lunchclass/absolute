// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import mongoose from 'mongoose';

// FIXME(coconutperm): It's temporary order schema. It will be changed.
const schema = new mongoose.Schema({
  userId: {type: String, lowercase: true, trim: true},
  items: [{
    name: {type: String, lowercase: true, trim: true},
    count: Number,
    amount: Number,
  }],
  totalAmount: Number,
  image: {data: Buffer, contentType: String},
  orderDate: {type: Date, default: Date.now},
  options: String,
});

export const Order = mongoose.model('order', schema);
