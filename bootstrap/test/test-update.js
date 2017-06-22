// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// FIXME(Wuseok): babel is not build for test module.
// Current babel was built in server part so It'll fix later.
// please check github issue number #242

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const spawnSync = require('child_process').spawnSync;

// TODO(zino): Should refactor this test codes.
/**
*  < test-update scenario >
*  1. assert .pkg_timestamp exists (If .pkg_timestamp is not exists, run absolute command)
*  2. assert .pkg_timestamp's modified time is newer than package.json.
*  3. Keep .pkg_timestamp's modified time to use it in step 5.
*  4. run absolute command
*  5. assert .pkg_timestamp's modified time == kept modified time 
*   (It means that the .pkg_timestamp's modified time is not updated)
*
*/
describe('Update Test', () => {

  if(!fs.existsSync(".pkg_timestamp")){
	spawnSync(path.resolve('./absolute'));
  }

  it('Is npm update check file exist?', () => {
	assert(fs.existsSync(".pkg_timestamp"));
  });

  var timestamp_before = fs.statSync(".pkg_timestamp");
  spawnSync(path.resolve('./absolute'));
  var timestamp_after = fs.statSync(".pkg_timestamp");

  it('Is npm update working fine?', () => {
	assert(datesEqual(timestamp_after["mtime"], timestamp_before["mtime"]));
  });
});

function datesEqual(a, b) {
    return a.getTime() == b.getTime();
}
