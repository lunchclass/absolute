// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const express = require('express');
const pushController = require('../controller/push_controller');

const router = express.Router();

router.post('/client', (request, response) => {
  if (request.body.userId && request.body.token) {
    pushController.saveToken(request.body)
      .then((token) => {
        response.send(token);
      });
  } else {
    response.sendStatus(400);
  }
});

router.delete('/client', (request, response) => {
  if (request.body.userId) {
    pushController.removeToken(request.body.userId)
      .then((token) => {
        response.send(token);
      });
  } else {
    response.sendStatus(400);
  }
});

router.get('/client', (request, response) => {
  if (request.query.userId) {
    pushController.getToken(request.query.userId)
      .then((token) => {
        response.send(token);
      });
  } else {
    response.sendStatus(400);
  }
});

router.put('/client', (request, response) => {
  if (request.body.userId && request.body.token) {
    pushController.updateToken(request.body)
      .then((token) => {
        response.send(token);
      });
  } else {
    response.sendStatus(400);
  }
});

module.exports = router;
