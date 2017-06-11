// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  uuid: {type: String, lowercase: true, trim: true},
  timeStamp: {type: Date, default: Date.now},
});

module.exports = mongoose.model('auth', schema);
