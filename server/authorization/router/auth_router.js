// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import express from 'express';
import auth from '../controller/auth_controller';

const router = express.router();

router.post('/uuid', (request, response) => {
  auth.generateUuid().then((authInfo) => {
    response.send(authInfo);
  }, (error) => {
    response.sendStatus(400);
  });
});

router.get('/uuid', (request, response) => {
  if (request.query.uuid) {
    auth.getUuid(request.query.uuid).then((authInfo) => {
      response.json(authInfo);
    }, (error) => {
      response.sendStatus(400);
    });
  } else {
    response.sendStatus(400);
  }
});

module.exports = router;
