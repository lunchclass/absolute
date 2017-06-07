// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// FIXME(Wuseok): babel is not build for test module.
// Current babel was built in server part so It'll fix later.
// please check github issue number #242

const assert = require('assert');
const path = require('path');
const fs = require('fs');

describe('Update Test', () => {

  it('Is npm update check file exist?', () => {
	assert(fs.existsSync(".pkg_timestamp"));
  });

  it('Is npm update working?', () => {
	var pkg_stats = fs.statSync("package.json");
	var timestamp_stats = fs.statSync(".pkg_timestamp");

	assert(pkg_stats["mtime"] <= timestamp_stats["mtime"]);
  });
});