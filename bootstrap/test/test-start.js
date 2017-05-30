// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var assert = require('assert');
const execSync = require('child_process').execSync;
// FIXME(Wuseok): babel is not build for test module.
// Current babel was built in server part so It'll fix later.
// please check github issue number #242

describe('Module check', () => {
	it('chai Is mongo db installed?', () => {
		execSync('./third_party/mongodb/bin/mongod -version');
	});

	it('Is node installed?', () => {
		execSync('./third_party/node/bin/node -v');
	});

	it('Is npm installed?', () => {
		execSync('./third_party/node/bin/npm -v');
	});
});