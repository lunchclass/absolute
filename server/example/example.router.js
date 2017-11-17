"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var application_1 = require("server/base/application");
/**
 * ExampleRouter
 */
var ExampleRouter = /** @class */ (function () {
    function ExampleRouter() {
    }
    ExampleRouter.prototype.get = function (request, response) {
        response.send('hello world');
    };
    ExampleRouter.prototype.post = function (request, response) {
        if (request.body) {
            if (request.body.exampleParam === 'example') {
                response.sendStatus(200);
            }
            else {
                response.sendStatus(400);
            }
        }
        else {
            response.sendStatus(501);
        }
    };
    ExampleRouter = __decorate([
        application_1.Application.ROUTE('/example')
    ], ExampleRouter);
    return ExampleRouter;
}());
exports.ExampleRouter = ExampleRouter;
//# sourceMappingURL=example.router.js.map