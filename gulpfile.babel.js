// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import babel from 'gulp-babel';
import childProcess from 'child_process';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import nodemon from 'gulp-nodemon';
import runSequence from 'run-sequence';
import sourcemaps from 'gulp-sourcemaps';

process.on('exit', () => {
  runSequence('stop');
});

process.on('SIGINT', () => {
  runSequence('stop');
});

process.on('uncaughtException', () => {
  runSequence('stop');
});

process.on('disconnect', () => {
  runSequence('stop');
});

// TODO(zino): If users type unknown comands, should invoke this default task.
gulp.task('default', ['help']);

gulp.task('help', () => {
  // TODO(zino): We should implement this command.
});

gulp.task('build', () => {
  return gulp.src(['./server/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('out'));
});

gulp.task('lint', (finish) => {
  return gulp.src(['./server/**/*.js', './gulpfile.babel.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint:fix', (finish) => {
  return gulp.src(['./server/**/*.js', './gulpfile.babel.js'])
    .pipe(eslint({fix: true}))
    .pipe(eslint.format())
    .pipe(gulpIf((file) => {
        return file.eslint != null && file.eslint.fixed;
      }, gulp.dest('./')));
});

gulp.task('start', () => {
  runSequence('start_db', 'lint', 'build', 'start_server');
});

gulp.task('start_server', () => {
  nodemon({
    script: 'server.js',
    cwd: 'out',
  });
});

gulp.task('start_db', (finish) => {
  childProcess.exec('mongod --fork --dbpath database --logpath database/log',
      (error) => {
    if (error)
      console.log('Already running mongo DB daemon..');
    else
      console.log('Running mongo DB daemon..');
    finish();
  });
});

// FIXME(zino): This command is not working well in some cases. (e.g. CTRL + C)
gulp.task('stop', (finish) => {
  childProcess.exec('mongo admin --eval "db.shutdownServer();"', (error) => {
    setTimeout(() => {
      finish();
    }, 1000);
  });
});
