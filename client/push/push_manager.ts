/**
 * Copyright (c) 2017 The Absolute Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

declare var navigator: any;

export default class PushManager {

  constructor() {}

  async isRegistered(): Promise<boolean> {
    if (!navigator.serviceWorker) {
      return false;
    }

    navigator.serviceWorker.ready
    .then((registration: ServiceWorkerRegistration) => {
      registration.pushManager.getSubscription()
      .then((subscription: PushSubscription) => {
        if (subscription) {
          return true;
        }
        
        return false;
      })
      .catch((error: Error) => {
        // Not implemented yet
      })
    })
    .catch((error: Error) => {
      // Not implemented yet
    })

    return false;
  }

  async register(key: string): Promise<string> {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.register('/push_service_worker.js')
      .then((registration: ServiceWorkerRegistration) => {

        if (!registration.pushManager) {
          // The browser doesn't support push notification.
        }

        registration.pushManager.getSubscription()
        .then((subscription: PushSubscription) => {
          if (subscription) {
            // Not implemented yet
          }

          registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: key
          })
          .then((subscription: PushSubscription) => {
            // Not implemented yet
            // Subscribed successfully
            return subscription.endpoint;
          })
          .catch((error: Error) => {
            // Not implemented yet
          })
        })

      })
      .catch((error: Error) => {
        // FIXME(zino): What should we do?
      });
    }

    return null;
  }

  async unregister(): Promise<boolean> {
    if (!navigator.serviceWorker) {
      return false;
    }

    navigator.serviceWorker.ready
    .then((registration: ServiceWorkerRegistration) => {
      registration.pushManager.getSubscription()
      .then((subscription: PushSubscription) => {
        if (subscription) {
          subscription.unsubscribe();
          return true;
        } 
        return false;
      })
      .catch((error: Error) => {
        // Not implemented yet
      })
    })
    .catch((error: Error) => {
      // Not implemented yet
    })

    return false;
  }
}
