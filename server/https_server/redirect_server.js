// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const express = require('express');
const http = require('http');

function runForHttps(serverInfo) {
  var redirectApp = express();
  var redirectServer = http.createServer(redirectApp);

  redirectApp.use((request, response, next) => {
    if (!request.secure) {
      var httpsHost = 'https://' + request.headers.host;
      var redirectUrl = httpsHost.replace(/:\d+$/, '') + ':'
          + serverInfo.httpsPort + request.url;
      return response.redirect(redirectUrl);
    }
    next();
  });
  redirectServer.listen(serverInfo.httpPort);
}

exports.runForHttps = runForHttps;
