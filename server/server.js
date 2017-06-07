// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import config from './config';
import httpsServer from './https_server/https_server';
import redirectServer from './https_server/redirect_server';

const app = express();

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: true,
}));

app.use('/api/push/', require('./push/apis/router'));

httpsServer.run(app, config.serverInfo);
redirectServer.runForHttps(config.serverInfo);
