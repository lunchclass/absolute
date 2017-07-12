// Copyright (c) 2017 The Absolute Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import express from 'express';
import http from 'http';
import sourceMapSupport from 'source-map-support';

// It provides source map support for stack traces in node
sourceMapSupport.install({environment: 'node'});

/**
 * Redirect http to https
 * @param {object} serverInfo
 */
export function runForHttps(serverInfo) {
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
