// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// FIXME(Wuseok): babel is not build for test module.
// Current babel was built in server part so It'll fix later.
// please check github issue number #242
const assert = require('assert');
const path = require('path');
const spawnSync = require('child_process').spawnSync;

describe('Module check', () => {
  it('Is mongo db installed?', () => {
    spawnSync(path.resolve('./third_party/mongodb/bin/mongod'), ['--version']);
  });

  it('Is node installed?', () => {
    spawnSync(path.resolve('./absolute'), ['node', '-v']);
  });

  it('Is npm installed?', () => {
    spawnSync(path.resolve('./absolute'), ['npm', '-v']);
  });
});
