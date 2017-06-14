// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import bodyParser from 'body-parser';
import config from './config';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

import * as httpsServer from './https_server/https_server';
import * as redirectServer from './https_server/redirect_server';

const app = express();

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: true,
}));

mongoose.connect(`${config.ip}:${config.dbPort}/absolute`);
httpsServer.run(app, config);
redirectServer.runForHttps(config);
