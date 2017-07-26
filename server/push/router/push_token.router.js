// Copyright (c) 2017 The Absolute Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import Application from '../../base/application.js';
import * as PushController from '../controller/push_controller';

@Application.route('/api/push/token')
export default class PushTokenRouter {
  /**
   * Add push tokens to database
   * @param {json} request request object
                   - request.body.endpoint endpoint endpoint from subscription
                   - request.body.keys keys authentication key
                     and p256dh key from subscription
   * @param {json} response response object
   */
  post(request, response) {
    if (request.body.userId && request.body.endpoint && request.body.keys) {
      PushController.addPushTokens(request.body.userId,
        request.body.endpoint, request.body.keys).then((result) => {
          response.send(result);
        }).catch((error) => {
          response.send(error);
        });
    } else {
      response.sendStatus(400);
    }
  }

  /**
   * Get push tokens from database using userId
   * @param {json} request request object
                   - request.body.endpoint endpoint endpoint from subscription
                   - request.body.keys keys authentication key
                     and p256dh key from subscription
   * @param {json} response response object
   */
  get(request, response) {
    if (request.query.userId) {
      PushController.getPushTokens(request.query.userId).then((result) => {
        response.send(result);
      }).catch((error) => {
        response.send(error);
      });
    } else {
      response.sendStatus(400);
    }
  }
}
