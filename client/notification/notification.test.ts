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

import { } from 'jest';
import absolute from '../absolute';

test('absolute.notification.create()', async () => {
  let NotificationEvent  = new Event("click");
  expect(await absolute.notification.create(NotificationEvent)).toBe(false);
});
test('absolute.notification.close()', async () => {
  let NotificationEvent  = new Event("click");
  expect(await absolute.notification.close(NotificationEvent)).toBe(false);
});
test('absolute.notification.processClickEvent()', async () => {
  let NotificationEvent  = new Event("click");
  expect(await absolute.notification.processClickEvent(NotificationEvent)).toBe(false);
});