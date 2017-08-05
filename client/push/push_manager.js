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
    const queryUrl = `${SERVER_URL}/api/push/client/${subscription}`;
    Util.fetchRequest(queryUrl, 'POST', null).then(function (result) {
    }).catch(function (error) {
      console.log(`failed to register subscription ${error}`);
    });
  }

  /**
   * get push subscription with uuid from server
   */
  getSubscription() {
    return this._subscription;
  }
}

