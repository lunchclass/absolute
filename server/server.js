// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const config = require('./config');
const httpsServer = require('./https_server/https_server');
const redirectServer = require('./https_server/redirect_server');
const dbConnect = require('./db/db_connect');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, '../client')));

app.use('/api/order', require('./order/router/order_router'));

dbConnect.connectServer();
httpsServer.run(app, config.serverInfo);
redirectServer.runForHttps(config.serverInfo);
