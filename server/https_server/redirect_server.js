// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import express from 'express';
import http from 'http';

/**
 * Redirect http to https
 * @param {object} serverInfo
 */
function runForHttps(serverInfo) {
  const redirectApp = express();
  const redirectServer = http.createServer(redirectApp);

  redirectApp.use((request, response, next) => {
    if (!request.secure) {
      const httpsHost = `https://${request.headers.host}`;
      const redirectUrl = `${httpsHost.replace(/:\d+$/, '')}:${
           serverInfo.httpsPort}${request.url}`;
      return response.redirect(redirectUrl);
    }
    return next();
  });
  redirectServer.listen(serverInfo.httpPort);
}

exports.runForHttps = runForHttps;
