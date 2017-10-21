/*
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

/// <reference path="../../node_modules/typescript/lib/lib.webworker.d.ts"/>

declare var s: ServiceWorkerGlobalScope;

self.addEventListener('install', (event: ExtendableEvent) => {
    console.log(event.waitUntil(s.skipWaiting()));
});

self.addEventListener('fetch', (event: FetchEvent) => {
    console.log(event);
});