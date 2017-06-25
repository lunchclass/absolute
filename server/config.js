// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import sourceMapSupport from 'source-map-support';

// It provides source map support for stack traces in node
sourceMapSupport.install({environment: 'node'});

export default {
  httpPort: 9080,
  httpsPort: 9443,
  dbPort: 27017,
  ip: '127.0.0.1',
  certification: {
    key: '../../certification/key.pem',
    cert: '../../certification/cert.pem',
  },
};
