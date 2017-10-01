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

import * as gulp from 'gulp';
import * as nodemon from 'gulp-nodemon';
import * as tsc from 'gulp-typescript';

gulp.task('default', ['run_server']);

gulp.task('test', ['build_server']);

gulp.task('run_server', ['build_server'], () => {
  nodemon({
    script: 'out/server.js',
    ignore: 'out/'
  });
});

gulp.task('build_server', () => {
  gulp.src('./server/**/*.ts')
    .pipe(tsc({
      target: 'es5',
      noImplicitReturns: true,
      noImplicitAny: true,
      preserveConstEnums: true,
      sourceMap: true,
      lib: ['es2015'],
      experimentalDecorators: true,
    }))
    .js
    .pipe(gulp.dest('out/'));
});
