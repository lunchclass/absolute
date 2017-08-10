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

/**
 * push class
 */
import Util from './../common/util_manager.js';

export default class Push {
  /**
   * @constructor
   */
  constructor() {
    /* Token to use for push notification */
    this._subscription = 0;
  }

  /**
   * send push information to server
   */
  registerSubscription(subscription) {
    this._subscription = subscription;
    const SERVER_URL = Util.getServerURL();
    const queryUrl = `${SERVER_URL}/api/push/token/`;
    let pushHeaders = new Headers({
      'Content-Type': 'application/json'
    });
    let pushData = JSON.stringify({
      // FIXME(daehyun): this userId should be replaced by real user id
      userId: '1234',
      endpoint: subscription.endpoint,
      keys: {
        p256dh: subscription.getKey('p256dh'),
        auth: subscription.getKey('auth')
      }
    });
    let pushRequest = new Request(queryUrl, {
      method: 'POST',
      headers: pushHeaders,
      body: pushData
    });
    Util.fetchRequest(pushRequest)
    .then(function(result) {
    })
    .catch(function(error) {
      console.log(`failed to register subscription ${error}`);
    });
    console.log(`subscription registered :
      ${JSON.stringify(this._subscription)}`);
  }

  /**
   * get push subscription with uuid from server
   */
  getSubscription() {
    return this._subscription;
  }
}
