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
