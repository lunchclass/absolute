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


// get clients count registered to push
router.get('/client/count', (request, response) => {
  pushController.getClientCount()
    .then((message) => {
      response.send(message);
    })
    .catch((error) => {
      response.send(error);
    });
});

// send notification to :id
router.post('/notification', (request, response) => {
  if (request.body.userId) {
    if (request.body.userId === 'all') {
      pushController.broadCastPushNotification(request.body).then((res) => {
        response.sendStatus(200);
      });
    } else {
      pushController.sendPushNotification(request.body.userId, request.body)
      .then((token) => {
        response.sendStatus(200);
      });
    }
  } else {
    response.sendStatus(400);
  }
});

// Create default notification message for all
router.post('/notification/message', (request, response) => {
  if (request.body) {
    pushController.setPushNotificationMessage(null, request.body)
      .then((message) => {
        response.sendStatus(200);
      });
  } else {
    response.sendStatus(400);
  }
});

// Create notification message for specific id
router.post('/notification/message/:id', (request, response) => {
  if (request.body) {
    pushController.setPushNotificationMessage(request.params.id, request.body)
      .then((message) => {
        response.sendStatus(200);
      });
  } else {
    response.sendStatus(400);
  }
});

// get default notification
router.get('/notification/message', (request, response) => {
  pushController.getDefaultPushNotificationMessage()
    .then((message) => {
      response.send(message);
    });
});

// get notification message for specific id
router.get('/notification/message/:id', (request, response) => {
  if (request.params.id) {
    pushController.getPushNotificationMessage(request.params.id)
      .then((message) => {
        response.send(message);
      });
  } else {
    response.sendStatus(400);
  }
});


module.exports = router;
