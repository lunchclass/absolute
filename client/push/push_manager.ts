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
  private isRegistered_: boolean = false;

  constructor() {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.register('/push_service_worker.ts')
        .then((registration: ServiceWorkerRegistration) => {
          this.isRegistered_ = true;
        })
        .catch((error: Error) => {
          // FIXME(zino): What should we do?
        });
    }
  }

  async isRegistered(): Promise<boolean> {
    // Not implemented yet
    return false;
  }

  async register(key: string): Promise<boolean> {
    // Not implemented yet
    return false;
  }

  async unregister(): Promise<boolean> {
    // Not implemented yet
    return false;
  }
}
