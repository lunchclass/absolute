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

import * as childProcess from 'child_process';
import * as del from 'del';
import * as gulp from 'gulp';
import * as nodemon from 'gulp-nodemon';
import * as runSequence from 'run-sequence';
import tslint from 'gulp-tslint';
import * as tsc from 'gulp-typescript';

const webpack = require('webpack-stream');

gulp.task('default', (callback) => {
  runSequence('webpack', 'build_server', 'run_server', 'start-mongo', callback);
});

gulp.task('lint', () => {
  gulp.src('./server/**/*.ts')
  .pipe(tslint({
    formatter: 'codeFrame'
  }))
  .pipe(tslint.report({
    summarizeFailureOutput: true
  }));
});

gulp.task('lint:fix', () => {
  gulp.src('./server/**/*.ts')
  .pipe(tslint({
    fix: true,
    formatter: 'codeFrame'
  }))
  .pipe(tslint.report({
    summarizeFailureOutput: true
  }));
});

// FIXME(sapzape): Temporarily separated until the lint error in the client area
// is resolved. Please see https://github.com/lunchclass/absolute/issues/533
gulp.task('lint_client', () => {
  gulp.src('./client/**/*.ts')
  .pipe(tslint({
    formatter: 'codeFrame'
  }))
  .pipe(tslint.report({
    summarizeFailureOutput: true
  }));
});

// FIXME(sapzape): Temporarily separated until the lint error in the client area
// is resolved. Please see https://github.com/lunchclass/absolute/issues/533
gulp.task('lint_client:fix', () => {
  gulp.src('./client/**/*.ts')
  .pipe(tslint({
    fix: true,
    formatter: 'codeFrame'
  }))
  .pipe(tslint.report({
    summarizeFailureOutput: true
  }));
});

gulp.task('test', ['webpack'], runCommand('jest'));

gulp.task('run_server', () => {
  process.env.NODE_PATH = "out/";
  nodemon({
    script: 'out/server/server.js',
    ignore: ['out/']
  });
});

gulp.task('clean', () => {
    return del('out', {force: true});
});

gulp.task('webpack', () => {
  return gulp.src('./client/src/*.ts')
    .pipe(webpack(require('./webpack.config.ts')))
    .pipe(gulp.dest('out/client'))
});

const tsProject = tsc.createProject('tsconfig.json');
gulp.task('build_server', () => {
  return tsProject.src()
    .pipe(tsProject())
    .js
    .pipe(gulp.dest('out/server/'));
});

const mongodb_path = './third_party/mongodb';
gulp.task('start-mongo', runCommand(`${mongodb_path}/bin/mongod --dbpath ${mongodb_path}`));
gulp.task('stop-mongo', runCommand(`${mongodb_path}/bin/mongo --eval "use admin; db.shutdownServer();`));

function runCommand(command: string) {
  return (cb: any) => {
    childProcess.spawn(command, [], {
      shell: true,
      stdio : ['inherit', 'inherit', 'inherit']
    });
    cb();
  }
}
