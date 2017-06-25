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

import fs from 'fs';
import https from 'https';

/**
 * Run https server
 * @param {object} app
 * @param {object} serverInfo
 */
export function run(app, serverInfo) {
  const certificationInfo = {
    key: fs.readFileSync(serverInfo.certification.key),
    cert: fs.readFileSync(serverInfo.certification.cert),
  };

  const httpsServer = https.createServer(certificationInfo, app);
  httpsServer.listen(serverInfo.httpsPort);
}
