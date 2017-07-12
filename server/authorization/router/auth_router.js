// Copyright (c) 2017 The Absolute Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import express from 'express';
import * as auth from '../controller/auth_controller';

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
