/*
 * Copyright (c) 2017 The Absolute Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as express from 'express';

export class Application {
  private static app: express.Application = express();

  public static async START() {
    await import('../example/example.router');
    this.app.listen(8090);
  }

  public static async START_FOR_TESTING(): Promise<express.Application> {
    await import('../example/example.router');

    return this.app;
  }

  public static ROUTE(url: string) {
    const app: express.Application = this.app;

    return <T>(routerClass: { new(...args: {}[]): T}): void => {
      const routerHandler: any = new routerClass();
      const router: express.Router = express.Router();

      if (routerHandler.post) {
        router.post(url, routerHandler.post);
      }

      if (routerHandler.put) {
        router.put(url, routerHandler.put);
      }

      if (routerHandler.get) {
        router.get(url, routerHandler.get);
      }

      if (routerHandler.delete) {
        router.delete(url, routerHandler.delete);
      }

      app.use('/', router);
    };
  }
}
