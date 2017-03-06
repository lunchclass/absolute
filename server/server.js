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

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: true,
}));
app.use(express.static(path.join(__dirname, '../client')));

app.use('/api/order', require('./order/router/order_router'));
app.use('/api/product', require('./order/router/product_router'));
app.use('/api/push/', require('./push/router/push_router'));
app.use('/api/authorization/', require('./authorization/router/uuid_router'));

dbConnect.connectServer();
httpsServer.run(app, config.serverInfo);
redirectServer.runForHttps(config.serverInfo);
