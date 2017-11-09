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

import * as express from 'express';
import {Application} from 'server/base/application';

/**
 * ExampleRouter
 */
@Application.ROUTE('/example')
export class ExampleRouter {
  public get(request: express.Request, response: express.Response): void {
    response.send('hello world');
  }
  public post(request: express.Request, response: express.Response): void {
    if (request.body) {
      if (request.body.exampleParam === 'example') {
        response.sendStatus(200);
      } else {
        response.sendStatus(400);
      }
    } else {
      response.sendStatus(501);
    }
  }
}
