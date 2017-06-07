// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import {app} from 'express';
const router = app.Router();

router.use('/token', require('./token'));

module.exports = router;
