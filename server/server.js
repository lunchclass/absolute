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

import bodyParser from 'body-parser';
import config from './config';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import {pushRouter} from './push/router/push_router';
import sourceMapSupport from 'source-map-support';

import * as httpsServer from './https_server/https_server';
import * as pushKeys from './push/gen_push_key';
import * as redirectServer from './https_server/redirect_server';

// It provides source map support for stack traces in node
sourceMapSupport.install({environment: 'node'});

const app = express();

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: true,
}));

app.use('/api/push/', pushRouter);
pushKeys.loadPushKey();

mongoose.connect(`${config.ip}:${config.dbPort}/absolute`);
httpsServer.run(app, config);
redirectServer.runForHttps(config);
