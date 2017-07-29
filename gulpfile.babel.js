// Copyright (c) 2017 The Absolute Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import babel from 'gulp-babel';
import child_process from 'child_process';
import eslint from 'gulp-eslint';
import generatePushKey from './server/push/gen_push_key'
import gulp from 'gulp';
import mocha from 'gulp-mocha';
import nodemon from 'gulp-nodemon';
import path from 'path';
import runSequence from 'run-sequence';
import sourcemaps from 'gulp-sourcemaps';
import undefTaskToDefault from 'gulp-undef-task-to-default';
import webpack from 'webpack';

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

gulp.task('default', ['help']);

gulp.task('help', () => {
  // TODO(zino): We should implement this command.
});

gulp.task('build_server', () => {
  return gulp.src(['./server/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .on('error', error => {console.log(error);})
    .pipe(sourcemaps.write('.', {sourceRoot: path.resolve(__dirname, 'server')}))
    .pipe(gulp.dest(path.resolve(__dirname, 'out', 'server')))
});

gulp.task('lint', finish => {
  runSequence('lint_server', 'lint_router', finish);
});

gulp.task('lint_server', finish => {
  return gulp.src(['./server/**/*.js', '!./server/**/*.router.js',
    '!./server/push/push_key.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint_router', finish => {
  return gulp.src(['./server/**/*.router.js'])
    .pipe(eslint({
        'rules': {
          'require-jsdoc': ['error', {
              'require': {
                'MethodDefinition': false,
                'ClassDeclaration': false
              }
            }]
        }
      }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('push_key', () => {
  generatePushKey();
});

gulp.task('start', () => {
  runSequence('start_db', 'lint', 'push_key', 'build_server', 'build_client', 'start_server');
});

gulp.task('start_server', () => {
  nodemon({
    script: 'server.js',
    cwd: 'out/server',
  });
});

gulp.task('start_db', finish => {
  child_process.exec('mongod --fork --dbpath database --logpath database/log', error => {
    if (error)
      console.log('Already running mongo DB daemon..');
    else
      console.log('Running mongo DB daemon..');
    finish();
  });
});

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

gulp.task('build_client', () => {
  gulp.src(path.resolve(__dirname, 'client', 'index.html'))
    .pipe(gulp.dest(path.resolve(__dirname, 'out', 'client')));
  webpack({
    watch: true,
    context: path.resolve(__dirname, 'client'),
    entry: {
      bundle : './app.js',
      sw : './service-worker.js'
    },
    output: {
      path: path.resolve(__dirname, 'out', 'client'),
      filename: '[name].js'
    },
    module: {
      rules: [{
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015-without-strict']
            ]
          }
        }]
      },{
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },{
        test: /\.(png|jpg)$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 10000 }
        }]
      }]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
          include: /\.min\.js$/,
          minimize: true
      })
    ]
  }, (err, stats) => {
      // FIXME(cs-lee) save log in file
  });
});

undefTaskToDefault(gulp);
