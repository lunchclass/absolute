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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var express = require("express");
var path = require("path");
/**
 * Application
 */
var Application = /** @class */ (function () {
    function Application() {
    }
    Application.START = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.app.use(express.static(path.join(__dirname, '../client')));
                        this.app.use(bodyParser.json());
                        this.app.use(bodyParser.urlencoded({ extended: true }));
                        return [4 /*yield*/, Promise.resolve().then(function () { return require('../example/example.router'); })];
                    case 1:
                        _a.sent();
                        this.app.listen(8090);
                        return [2 /*return*/];
                }
            });
        });
    };
    Application.START_FOR_TESTING = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.app.use(express.static(path.join(__dirname, '../../out/client')));
                        this.app.use(bodyParser.json());
                        this.app.use(bodyParser.urlencoded({ extended: true }));
                        return [4 /*yield*/, Promise.resolve().then(function () { return require('../example/example.router'); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.app];
                }
            });
        });
    };
    Application.ROUTE = function (url) {
        var app = this.app;
        return function (routerClass) {
            // tslint:disable-next-line
            var routerHandler = new routerClass();
            var router = express.Router();
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
    };
    Application.app = express();
    return Application;
}());
exports.Application = Application;
//# sourceMappingURL=application.js.map