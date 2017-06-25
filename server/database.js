// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import sourceMapSupport from 'source-map-support';

// It provides source map support for stack traces in node
sourceMapSupport.install({environment: 'node'});

/**
 * Print log.
 * @param {number} data to be printed out
 */
function printLog(data) {
  const str = data.toString();
  const lines = str.split(/(\r?\n)/g);
  console.log(lines.join(''));
}

import {spawn} from 'child_process';

const prc = spawn('mongod', ['--config', '../database/mongod.cfg']);

prc.stdout.on('data', (data) => {
  printLog(data);
});
prc.stderr.on('data', (data) => {
  printLog(data);
});

prc.on('exit', (code) => {
  printLog(code);
});
