// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import babel from 'gulp-babel';
import child_process from 'child_process';
import clean from 'gulp-clean';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import mocha from 'gulp-mocha';
import nodemon from 'gulp-nodemon';
import runSequence from 'run-sequence';
import sourcemaps from 'gulp-sourcemaps';
import usage from 'gulp-help-doc'

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

// TODO(zino): If users type unknown comands, we should invoke this default task.
gulp.task('default', ['help']);

gulp.task('help', () => {
  return usage(gulp);
});

/**
 * build absolute
 * @task {build}
 */
gulp.task('build', () => {
  return gulp.src(['./server/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('out'))
});

/**
 * run lint
 * @task {lint}
 */
gulp.task('lint', finish => {
  return gulp.src(['./server/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
});

/**
 * start absolute
 * @task {start}
 */
gulp.task('start', () => {
  runSequence('start_db', 'lint', 'build', 'start_server');
});

/**
 * start server
 * @task {start_server}
 */
gulp.task('start_server', () => {
  nodemon({
    script: 'server.js',
    cwd: 'out',
  });
});

/**
 * start db
 * @task {start_db}
 */
gulp.task('start_db', finish => {
  child_process.exec('mongod --fork --dbpath database --logpath database/log', error => {
    if (error)
      console.log('Already running mongo DB daemon..');
    else
      console.log('Running mongo DB daemon..');
    finish();
  });
});

/**
 * stop server
 * @task {stop}
 */
// FIXME(zino): This command is not working well in some cases. (e.g. CTRL + C)
gulp.task('stop', finish => {
  child_process.exec('mongo admin --eval "db.shutdownServer();"', error => {
    setTimeout(() => {
      finish();
    }, 1000);
  });
});

gulp.task('bootstrap_test', () => {
  gulp.src(['bootstrap/test/test-*.js'], {read: false})
    .pipe(mocha())
    .once('error', () => {
	process.exit(1);
    })
    .once('end', () => {
	process.exit();	
    })
});

gulp.task('clean', () => {
  gulp.src(['out/'], {read: false})
    .pipe(clean({ force: true }));
});

