// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const express = require('express');
const pushController = require('../controller/push_controller');

const router = express.Router();

router.post('/client', (req, res) => {
  console.log(`client token : ${req.body.token}`);

  if (req.body.userId && req.body.token) {
    pushController.saveToken(JSON.stringify(req.body));
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

router.delete('/client', (req, res) => {
  console.log(`client token : ${req.body.token}`);

  if (req.body.token) {
    pushController.removeToken(req.body.token)
      .then((token) => {
        res.send(token);
      });
  } else {
    res.sendStatus(400);
  }
});

router.get('/client', (req, res) => {
  console.log(`client token : ${req.query.userId}`);
  if (req.query.userId) {
    pushController.getToken(req.query.userId)
      .then((token) => {
        res.send(token);
      });
  } else {
    res.sendStatus(400);
  }
});

router.post('/client/update', (req, res) => {
  console.log(`client token : ${req.body.newToken}`);
  if (req.body.token && req.body.newToken) {
    pushController.updateToken(req.body.token, req.body.newToken)
      .then((token) => {
        res.send(token);
      });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
