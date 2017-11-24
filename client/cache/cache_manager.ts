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

export default class CacheManager {

  constructor() {
    //register to the page to begin the installation process
    this.register('cache_service_worker.js');
  }

  public async register(worker: string): Promise<void> {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.register(worker).then((registration: ServiceWorkerRegistration) => {
        // registration worked
        console.log('Registration succeed Scope is ' + registration.scope);
      })
      .catch((error: Error) => {
        // Not implemented yet
        console.log('Registration failed with ' + error);
      });
    }
  }
}
