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
        if (navigator.serviceWorker) {
            navigator.serviceWorker.register('cache_service_worker.js')
                .then((registration: ServiceWorkerRegistration) => {
                    // Not implemented yet
                    // Registration was successful
                }).catch((error: Error) => {
                // Not implemented yet
                // Registration failed
            });
        }
    }

    async register(): Promise<boolean> {
        //Not implemented yet
        return false;
    }
}
