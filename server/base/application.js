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

import access from './access_modifier.js';
import bodyParser from 'body-parser';
import config from '../config';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import requireAll from 'require-all';
import sourceMapSupport from 'source-map-support';

sourceMapSupport.install({environment: 'node'});

let _instance;

/**
 * Application class
 */
export default class Application {
  @access.private _app;
  @access.private _port = 9080;

  /**
   * @constructor
   */
  constructor() {
    if (_instance !== undefined) {
      throw new Error('Singleton');
    }

    this._app = express();
  }

  /**
   * @param {String} path
   */
  start(path) {
    requireAll({
      dirname: process.cwd(),
      filter: /\.router\.js$/,
      recursive: true,
    });

    this._app.listen(this._port);
  }

  /**
   * @return {Application} Instance of Application.
   */
  setup() {
    this._app.use(express.static(path.join(__dirname, '../../client')));
    this._app.use(bodyParser.json({limit: '10mb'}));
    this._app.use(bodyParser.urlencoded({
      limit: '10mb',
      extended: true,
    }));
    mongoose.connect(`${config.ip}:${config.dbPort}/absolute`);
    return _instance;
  }

  /**
   * @param {String} url
   * @param {RouterObject} routerHandler
   */
  _addRouter(url, routerHandler) {
    let router = new express.Router();

    if (routerHandler.post)
      router.post(url, routerHandler.post);

    if (routerHandler.put)
      router.put(url, routerHandler.put);

    if (routerHandler.get)
      router.get(url, routerHandler.get);

    if (routerHandler.delete)
      router.delete(url, routerHandler.delete);

    this._app.use('/', router);
  }

  /**
   * @return {Application} Instance of Application.
   */
  static get instance() {
    if (_instance === undefined) {
      _instance = new Application();
    }
    return _instance;
  }

  /**
   * @param {String} url
   * @return {Function} @route decorator
   */
  static route(url) {
    return function(RouterClass) {
      Application.instance._addRouter(url, new RouterClass());
    };
  }
}
