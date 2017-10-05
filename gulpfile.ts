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

import * as del from 'del';
import * as gulp from 'gulp';
import * as nodemon from 'gulp-nodemon';
import * as runSequence from 'run-sequence';
import tslint from 'gulp-tslint';
import * as shell from 'gulp-shell';
import * as tsc from 'gulp-typescript';

gulp.task('default', (callback) => {
  runSequence('build_server', 'run_server', callback);
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

gulp.task('test', shell.task('jest'));

gulp.task('run_server', () => {
  nodemon({
    script: 'out/server.js',
    ignore: ['out/']
  });
});

gulp.task('clean', (callback) => {
    return del('out/*', {force: true});
});

const tsProject = tsc.createProject('tsconfig.json');
gulp.task('build_server', () => {
  return tsProject.src()
    .pipe(tsProject())
    .js
    .pipe(gulp.dest('out/'));
});
