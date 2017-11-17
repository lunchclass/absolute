"use strict";
/**
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
Object.defineProperty(exports, "__esModule", { value: true });
var cache_manager_1 = require("./cache/cache_manager");
var push_manager_1 = require("./push/push_manager");
var notification_manager_1 = require("./notification/notification_manager");
var indexeddb_1 = require("./indexeddb/indexeddb");
var absolute = /** @class */ (function () {
    function absolute() {
    }
    absolute.cache = new cache_manager_1.default();
    absolute.push = new push_manager_1.default();
    absolute.notification = new notification_manager_1.default();
    absolute.indexeddb = new indexeddb_1.default();
    return absolute;
}());
exports.default = absolute;
