// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var config = module.exports;

config.serverInfo = {
  httpPort: 9080,
  httpsPort: 9443,
  ip: '127.0.0.1',
  certification: {
    key: '../certification/key.pem',
    cert: '../certification/cert.pem'
  }
};
