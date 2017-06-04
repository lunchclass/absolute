// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const assert = require('assert');
const path = require('path');
const spawnSync = require('child_process').spawnSync;
const fs = require('fs');

describe('Clean Test', () => {
  it('Is out directory cleaned?', () => {
    spawnSync(path.resolve('./absolute'), ['start']);
    spawnSync(path.resolve('./absolute'), ['stop']);
    spawnSync(path.resolve('./absolute'), ['clean']);
    assert(fs.existsSync('./out/') == false);
  });
});
