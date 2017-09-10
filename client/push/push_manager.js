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

import DataBase from '../common/db_manager.js'

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
   *  get push permission status
   */
  getPushPermissionStatus () {
    // query push permissions
    return new Promise((resolve, reject) => {
      navigator.permissions.query({name:'push', userVisibleOnly:true})
      .then(permissionStatus => {
        console.log('push permission state is ', permissionStatus.state);
        resolve(permissionStatus.state);
      });
    });
  }

  /**
   * send push information to server
   */
  registerPushSubscription(subscription) {
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

    var database = new DataBase();
    Promise.resolve()
    .then(database.addValueToDataBase('Push', 'UserId', jsonSubscription.endpoint));

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
}

