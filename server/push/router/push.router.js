// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import Application from '../../base/application.js';
import {sendPush} from '../controller/send_push';


@Application.route('/api/push/')
/**
 * Push router class
 */
export default class PushRouter {
  /**
   * Send push with payload to endpoint with it's auth / ecdh key
   * @param {json} request request object
                   - request.body.endpoint endpoint endpoint from subscription
                   - request.body.keys keys authentication key
                     and p256dh key from subscription
                   -request.body.payload payload payload data send to endpoint
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
