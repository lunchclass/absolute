// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userId: { type: String, lowercase: true, trim: true, unique: true },
  token: { type: String, lowercase: true, trim: true },
  title: { type: String, trim: true },
  body: { type: String, trim: true },
  icon: { type: String, trim: true },
  url: { type: String, trim: true },
});

module.exports = mongoose.model('push', schema);
