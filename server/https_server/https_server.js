// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const fs = require('fs');
const https = require('https');

function run(app, serverInfo) {
  var certificationInfo = {
    key: fs.readFileSync(serverInfo.certification.key),
    cert: fs.readFileSync(serverInfo.certification.cert)
  };

  var httpsServer = https.createServer(certificationInfo, app);
  httpsServer.listen(serverInfo.httpsPort);
}

exports.run = run;
