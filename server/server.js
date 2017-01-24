// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const express = require('express');
const path = require('path');

const config = require('./config');
const httpsServer = require('./https_server/https_server');
const redirectServer = require('./https_server/redirect_server');

var app = express();
var bodyParser = require('body-parser');
var router = require('./router/main.js')(app); // router must be after body-parser

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.urlencoded({
  extended: true}));
app.use(bodyParser.json());

httpsServer.run(app, config.serverInfo);
redirectServer.runForHttps(config.serverInfo);
