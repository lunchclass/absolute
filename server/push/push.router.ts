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
import { Application } from 'server/base/application';

/**
 * PushRouter
 */
@Application.ROUTE('/push/register')
export class Register {
  public post(request: express.Request, response: express.Response): void {
    if (request.body) {
      if (request.body.param === 'register') {
        response.sendStatus(200);
      } else {
        response.sendStatus(400);
      }
    } else {
      response.sendStatus(501);
    }
  }
}

@Application.ROUTE('/push/unregister')
export class Unregister {
  public post(request: express.Request, response: express.Response): void {
    if (request.body) {
      if (request.body.param === 'unregister') {
        response.sendStatus(200);
      } else {
        response.sendStatus(400);
      }
    } else {
      response.sendStatus(501);
    }
  }
}

@Application.ROUTE('/push/send')
export class Send {
  public post(request: express.Request, response: express.Response): void {
    if (request.body) {
      if (request.body.param === 'send') {
        response.sendStatus(200);
      } else {
        response.sendStatus(400);
      }
    } else {
      response.sendStatus(501);
    }
  }
}
