// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const uuid = require('uuid/v4');

exports.generateUuid = function generateUuid() {
  return { uuid: uuid() };
};
