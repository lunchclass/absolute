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
Object.defineProperty(exports, "__esModule", { value: true });
var del = require("del");
var gulp = require("gulp");
var nodemon = require("gulp-nodemon");
var runSequence = require("run-sequence");
var gulp_tslint_1 = require("gulp-tslint");
var shell = require("gulp-shell");
var tsc = require("gulp-typescript");
gulp.task('default', function (callback) {
    runSequence('build_server', 'run_server', callback);
});
gulp.task('lint', function () {
    gulp.src('./server/**/*.ts')
        .pipe(gulp_tslint_1.default({
        formatter: 'codeFrame'
    }))
        .pipe(gulp_tslint_1.default.report({
        summarizeFailureOutput: true
    }));
});
gulp.task('lint:fix', function () {
    gulp.src('./server/**/*.ts')
        .pipe(gulp_tslint_1.default({
        fix: true,
        formatter: 'codeFrame'
    }))
        .pipe(gulp_tslint_1.default.report({
        summarizeFailureOutput: true
    }));
});
gulp.task('test', shell.task('jest'));
gulp.task('run_server', function () {
    nodemon({
        script: 'out/server.js',
        ignore: ['out/']
    });
});
gulp.task('clean', function () {
    return del('out', { force: true });
});
var tsProject = tsc.createProject('tsconfig.json');
gulp.task('build_server', function () {
    return tsProject.src()
        .pipe(tsProject())
        .js
        .pipe(gulp.dest('out/'));
});
