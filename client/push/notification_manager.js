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
 * notification class
 */

export default class Notification {
  /**
   * @constructor
   */
  constructor() {
    /* array of notifications */
    this._notifications = {};
  }

  /**
   * create notification
   */
  createNotification(event) {
    let notiPromise;
    if (event.data) {
      notiPromise = Promise.resolve(event.data.json());
    } else {
      // get data information from server
    }

    notiPromise = notiPromise.then(data => {
      return self.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon,
        tag: data.tag
      });
    });
    event.waitUntil(notiPromise);
  }

  /**
   * close notification
   */
  closeNotification(event) {
    event.notification.close();
  }

  /**
   * process notification click event
   */
  processNotificationClickEvent(event) {
    let url = '';
	event.waitUntil(clients.openWindow(url));
  }
}

