// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import fs from 'fs';
import https from 'https';

/**
 * Run https server
 * @param {object} app
 * @param {object} serverInfo
 */
function run(app, serverInfo) {
  const certificationInfo = {
    key: fs.readFileSync(serverInfo.certification.key),
    cert: fs.readFileSync(serverInfo.certification.cert),
  };

  const httpsServer = https.createServer(certificationInfo, app);
  httpsServer.listen(serverInfo.httpsPort);
}

exports.run = run;
