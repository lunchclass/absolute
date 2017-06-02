// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import assert from 'assert'
import fs from 'fs';

describe('Clean Test', () => {
  it('Is out directory cleaned?', () => {
	assert(fs.existsSync('./out/') == false);
  });
});
