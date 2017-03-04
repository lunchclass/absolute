// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const express = require('express');
const pushController = require('../controller/push_controller');

const router = express.Router();

router.post('/client', (req, res) => {
  // Add new client
  console.log(`client token : ${req.body.token}`);
  const clientToken = req.body.token;

  if (clientToken) {
    console.log('Store client token :', clientToken);
    pushController.addClient(clientToken);
    res.sendStatus(200);
  } else {
    res.sendStatus(400); // bad request
  }
});

router.delete('/client', (req, res) => {
  // Remove client
  const clientToken = req.body.token;
  console.log(`client token : ${req.body.token}`);

  if (clientToken) {
    console.log(`Remove client token :  ${clientToken}`);
    // Remove token from DB
    pushController.removeClient(clientToken);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

router.post('/add', (req, res) => {
  if (req.body.userId && req.body.endpoint) {
    pushController.saveEndpoint(JSON.stringify(req.body));
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
