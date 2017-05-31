// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import {Router as router} from 'express';
import token from './token';

router().use('/token', token);

module.exports = router;
