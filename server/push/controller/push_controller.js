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

import PushEntry from '../model/token';

/**
 * Add push tokens to database from push subscription
 * @param {string} userId id of client
 * @param {string} endpoint endpoint url
 * @param {json} keys authentication key and p256dh public key
 * @return {promise} useId if success else reason of failure
 */
export function addPushTokens(userId, endpoint, keys) {
  console.log(`save push tokens for ${userId}`);
  return new Promise((resolve, reject) => {
    PushEntry.findOneAndUpdate({'userId': userId},
      {$set: {
        'userId': userId,
        'endpoint': endpoint,
        'p256dh': keys.p256dh,
        'auth': keys.auth,
      },
      },
      {upsert: true},
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(userId);
        }
      });
  });
}

/**
 * Get push tokens from database using userId
 * @param {string} userId id of client
 * @return {promise} push tokens if success else reason of failure
 */
export function getPushTokens(userId) {
  console.log(`get push tokens for ${userId}`);
  return new Promise((resolve, reject) => {
    PushEntry.findOne({userId: userId}, (error, tokens) => {
      if (error) {
        reject(error);
      } else {
        resolve(tokens);
      }
    });
  });
}
