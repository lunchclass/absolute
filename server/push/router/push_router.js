// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import {Router as router} from 'express';
import {sendPush} from '../controller/send_push';

export const pushRouter = router();

 /**
  * Send push with payload to endpoint with it's auth / ecdh key
  * @api {post} /api/push/
  * @param {string} endpoint endpoint from subscription
  * @param {json} keys authentication key and p256dh key from subscription
  * @param {string} payload payload data send to endpoint
  * @return {promise} result includes statusCode, headers, body
  */
pushRouter.post('/', (request, response) => {
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
});
