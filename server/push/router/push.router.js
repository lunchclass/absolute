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
import {sendPush} from '../controller/send_push';

@Application.route('/api/push/')
export default class PushRouter {
  /**
   * Send push with payload to endpoint with it's auth / ecdh key
   * @param {json} request request object
                   - request.body.endpoint endpoint endpoint from subscription
                   - request.body.keys keys authentication key
                     and p256dh key from subscription
                   - request.body.payload payload payload data send to endpoint
   * @param {json} response response object
   */
  post(request, response) {
    if (request.body.endpoint && request.body.keys) {
      sendPush(request.body.endpoint, request.body.keys,
        JSON.stringify(request.body.payload))
        .then((result) => {
          response.send(result);
        }).catch((error) => {
          response.send(error);
        });
    } else {
      response.sendStatus(400);
    }
  }
}
