// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import {app} from 'express';
const router = app.Router();

/**
 * @api {post} /api/push/token
 * @apiDescription Register push token
 * @apiName RegisterPushToken
 *
 * @apiParam (RequestBody) {String} Unique token from browser generated
 */
router.post('/', (req, res) => {

});

/**
 * @api {get} /api/push/token/count
 * @apiDescription Get count of registered push token
 * @apiName GetPushTokenCount
 */
router.get('/count', (req, res) => {

});

module.exports = router;
