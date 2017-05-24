// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const router = require('express').Router();

/**
 * @api {post} /api/push/nofitication/:id
 * @apiDescription Send push notification to :id.
 * @apiName SendPushNotification
 *
 * @apiParam {String} Unique id specify client
 */
router.post('/:id', (req, res) => {

});

/**
 * @api {post} /api/push/nofitication/message/:id
 * @apiDescription Create push notification message for :id
 * @apiName CreatePushNotificationMessage
 *
 * @apiParam {String} Unique id specify client
 */
router.post('/message/:id', (req, res) => {

});

/**
 * @api {get} /api/push/nofitication/message/:id
 * @apiDescription Get push notification message for :id.
 * @apiName GetPushNotificationMessage
 *
 * @apiParam {String} Unique id specify client
 */
router.get('/message/:id', (req, res) => {

});

module.exports = router;
