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

import {} from 'jest';
import {Application} from 'server/base/application';
import * as supertest from 'supertest';

test('GET /example', async() => {
  const request: {} = supertest(await Application.START_FOR_TESTING());
  const response: {} = await request.get('/example');
  expect(response.statusCode).toBe(200);
  expect(response.text).toBe('hello world');
});

test('POST x-www-form-urlencoded', async() => {
  const request: {} = supertest(await Application.START_FOR_TESTING());
  const response: {} = await request.post('/example').set('Content-Type', 'application/x-www-form-urlencoded').send('exampleParam=example');
  expect(response.statusCode).toBe(200);
});

test('POST json', async() => {
  const request: {} = supertest(await Application.START_FOR_TESTING());
  const response: {} = await request.post('/example').set('Content-Type', 'application/json').send('{"exampleParam": "example"}');
  expect(response.statusCode).toBe(200);
});
