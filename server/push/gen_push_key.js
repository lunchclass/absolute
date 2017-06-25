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
import webpush from 'web-push';

let pushKeys;
/**
 *  Load push key if key exist else generate and load
 */
export function loadPushKey() {
  const data = fs.readFileSync('../../server/push/push_key.json', 'utf8');
  pushKeys = JSON.parse(data);

  if(pushKeys.pushVapidKeys.privateKey === undefined
    || pushKeys.pushVapidKeys.privateKey === '') {
    console.log('generate push key');
    const vapidKeys = webpush.generateVAPIDKeys();
    pushKeys.pushVapidKeys.privateKey = vapidKeys.privateKey;
    pushKeys.pushVapidKeys.publicKey = vapidKeys.publicKey;
    fs.writeFileSync('../../server/push/push_key.json',
        JSON.stringify(pushKeys, null, 2), 'utf8');
  }
}

/**
 * Get push key
 * @return {json} Contain push server key, generated vapid key
 */
export function getPushKey() {
  return pushKeys;
}

/**
 * Get push vapid public key.
 * @return {string} Push vapid public key
 */
export function getPushVapidPublicKey() {
  return pushKeys.pushVapidKeys.publicKey;
}
