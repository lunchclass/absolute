// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

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
