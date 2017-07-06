// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// FIXME(Wuseok): babel is not build for test module.
// Current babel was built in server part so It'll fix later.
// please check github issue number #242
 
const worker_manager = require('../../out/server/worker_manager.js');

describe('test_worker_manager', function(done) {
  it('Is all worker-process online?', function() {  
    this.timeout(1000);
    let wm  = worker_manager.run();
    wm.on('All workers online', function(workers) {
      done();
    });
  });
});
