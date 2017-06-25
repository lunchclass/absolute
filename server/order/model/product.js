// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import mongoose from 'mongoose';

// FIXME(coconutperm): It's temporary product schema. It will be changed.
const schema = new mongoose.Schema({
  name: {type: String, lowercase: true, trim: true},
  amount: Number,
  options: String,
});

export const Product = mongoose.model('product', schema);
