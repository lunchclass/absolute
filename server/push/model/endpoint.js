// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userId: { type: String, lowercase: true, trim: true, required: true },
  endpoint: { type: String, lowercase: true, trim: true, required: true },
});

module.exports = mongoose.model('endpoint', schema);
