// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const express = require('express');
const pushController = require('../controller/push_controller');

const router = express.Router();

router.post('/client', (req, res) => {
  if (req.body.userId && req.body.token) {
    pushController.saveToken(req.body)
      .then((token) => {
        res.send(token);
      });
  } else {
    res.sendStatus(400);
  }
});

router.delete('/client', (req, res) => {
  if (req.body.userId) {
    pushController.removeToken(req.body.userId)
      .then((token) => {
        res.send(token);
      });
  } else {
    res.sendStatus(400);
  }
});

router.get('/client', (req, res) => {
  if (req.query.userId) {
    pushController.getToken(req.query.userId)
      .then((token) => {
        res.send(token);
      });
  } else {
    res.sendStatus(400);
  }
});

router.put('/client', (req, res) => {
  if (req.body.userId && req.body.token) {
    pushController.updateToken(req.body)
      .then((token) => {
        res.send(token);
      });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
