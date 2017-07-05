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
import requireAll from 'require-all';

/**
 * Application class
 */
export default class Application {
  /**
   * @constructor
   */
  constructor() {
    if (this._instance !== undefined) {
      throw new Error('Singleton');
    }

    this._app = express();
    this._instance = this;
    this._port = 9080;
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
    if (this._instance === undefined) {
      this._instance = new Application();
    }
    return this._instance;
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
