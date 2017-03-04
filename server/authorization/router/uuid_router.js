// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const express = require('express');
const uuidGenerator = require('../controller/uuid_generator');

const router = express.Router();

router.post('/uuid', (req, res) => {
  res.send(uuidGenerator.generateUuid());
});

module.exports = router;
