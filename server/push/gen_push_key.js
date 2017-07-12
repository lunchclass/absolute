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
import pushKeys from './push_key';
import webpush from 'web-push';

/**
 *  Load push key if key exist else generate and load
 */
export default function generatePushKey() {
  if(pushKeys.pushVapidKeys.privateKey === undefined
    || pushKeys.pushVapidKeys.privateKey === '') {
    console.log('generate push key');
    const vapidKeys = webpush.generateVAPIDKeys();
    pushKeys.pushVapidKeys.privateKey = vapidKeys.privateKey;
    pushKeys.pushVapidKeys.publicKey = vapidKeys.publicKey;

    writeClientPushPubkey(vapidKeys.publicKey);
    writeServerPusKey(pushKeys);
  }
}

/**
 * Write push vapid public key for client, client only must know public key
 * @param {string} pubKey vapid public key for client side
 */
function writeClientPushPubkey(pubKey) {
  const path = 'client/push/push_key.js';
  fs.writeFileSync(path,
    `export default {\n` +
    `  \'pushVapidKeys\': {\n` +
      `    \'publicKey\': \'${pushKeys.pushVapidKeys.publicKey}\'\n  }\n}`);
}

/**
 * Write push keys for server.
 * @param {json} pushKeys pushServerKey and pushVapidKeys for server
 */
function writeServerPusKey(pushKeys) {
  const path = 'server/push/push_key.js';
  fs.writeFileSync(path,
    `export default {\n` +
    `  \'pushServerKey\': \'${pushKeys.pushServerKey}\',\n` +
    `  \'pushVapidKeys\': {\n` +
      `    \'publicKey\': \'${pushKeys.pushVapidKeys.publicKey}\',\n` +
      `    \'privateKey\': \'${pushKeys.pushVapidKeys.privateKey}\',\n` +
    `  },\n};`);
}
