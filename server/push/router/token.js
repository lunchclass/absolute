// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import {Router as router} from 'express';

export const tokenRouter = router();

/**
 * @api {post} /api/push/token
 * @apiDescription Register push token
 * @apiName RegisterPushToken
 *
 * @apiParam (RequestBody) {String} Unique token from browser generated
 */
tokenRouter.post('/', (req, res) => {

});

/**
 * @api {get} /api/push/token/count
 * @apiDescription Get count of registered push token
 * @apiName GetPushTokenCount
 */
tokenRouter.get('/count', (req, res) => {

});
