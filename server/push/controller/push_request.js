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

import access from '../../base/access_modifier.js';
import {sendPush} from './send_push.js';

/**
 * PushSender class
 */
export default class PushRequest {
  @access.private endpoint;
  @access.private pushKeys;
  @access.private payload;

  /**
   * build method to build PushRequest
   * @param {string} endpoint endpoint from subscription
   * @param {string} pushKeys auth key and p256dh key from subscription
   * @param {string} payload payload data send to endpoint
   */
  constructor(endpoint, pushKeys, payload) {
    console.log('pushRequest contructor!');
    this.endpoint = endpoint;
    this.pushKeys = pushKeys;
    this.payload = payload;
  }

  /**
   * send push
   * @return {promise} promise
   */
  send() {
    console.log(`PushRequest send endpoint : ${this.endpoint},
      payload : ${JSON.stringify(this.payload)}`);
    return sendPush(this.endpoint, this.pushKeys,
     JSON.stringify(this.payload));
  }
}
