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

import CacheManager from './cache/cache_manager';
import IndexedDB from './indexeddb/indexeddb';
import Notification from './notification/notification_manager';
import PushManager from './push/push_manager';

export default class absolute {
  public static cache: CacheManager = new CacheManager();
  public static push: PushManager = new PushManager();
  public static notification: Notification = new Notification();
  public static indexeddb: IndexedDB = new IndexedDB();
}
