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
    const queryUrl = `/api/push/token/`;
    const jsonSubscription = subscription.toJSON();

    let pushHeaders = new Headers({
      'Content-Type': 'application/json'
    });

    let pushData = JSON.stringify({
      // FIXME(daehyun): this userId should be replaced, now we use endpoint
      userId: jsonSubscription.endpoint,
      endpoint: jsonSubscription.endpoint,
      keys: jsonSubscription.keys,
    });

    let pushRequest = new Request(queryUrl, {
      method: 'POST',
      headers: pushHeaders,
      body: pushData
    });

    fetch(pushRequest)
    .then(response => {
      if (response.status !== 200) {
        console.log('Failed to fetch request. Status Code: '
            + response.status);
      }
    })
    .catch(error => {
      console.log('Request failed: ' + error);
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
