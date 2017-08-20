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

import pushKeys from '../push_key';
import sourceMapSupport from 'source-map-support';
import webpush from 'web-push';
import * as pushController from './push_controller';


// It provides source map support for stack traces in node
sourceMapSupport.install({environment: 'node'});

/**
 * Send push with payload to endpoint with it's authentication key.
 * @param {string} endpoint endpoint from subscription
 * @param {string} keys authentication key and p256dh key from subscription
 * @param {string} payload payload data send to endpoint
 * @return {promise} result includes statusCode, headers, body
 */
export function sendPush(endpoint, keys, payload) {
  const SERVER_SUBJECT = 'https://github.com/romandev/absolute';
  return new Promise((resolve, reject) => {
    webpush.setGCMAPIKey(pushKeys.pushServerKey);
    webpush.setVapidDetails(
      SERVER_SUBJECT,
      pushKeys.pushVapidKeys.publicKey,
      pushKeys.pushVapidKeys.privateKey,
    );

    // This is the same output of calling JSON.stringify on a PushSubscription
    const pushSubscription = {
      endpoint: endpoint,
      keys: {
        auth: keys.auth,
        p256dh: keys.p256dh,
      },
    };

    webpush.sendNotification(pushSubscription, payload)
    .then((webPushResult) => {
      return resolve(webPushResult);
    }).catch((webPushError) => {
      console.log(`push failed to ${endpoint}\n ${webPushError}`);
      return reject(webPushError);
    });
  });
}

/**
 * Send push with payload to userId using stored push data
 * @param {string} userId userId to send push
 * @param {string} payload payload data send to endpoint
 * @return {promise} result includes statusCode, headers, body
 */
export function sendPushByUserId(userId, payload) {
  return new Promise((resolve, reject) => {
    pushController.getPushTokens(userId)
    .then((tokens) => {
      const pushKeys = {
        p256dh: tokens.p256dh,
        auth: tokens.auth,
      };

      sendPush(tokens.endpoint, pushKeys, payload)
      .then((result) => {
        return resolve(result);
      }).catch((error) => {
        return reject(error);
      });
    }).catch((error) => {
      return reject(error);
    });
  });
}
