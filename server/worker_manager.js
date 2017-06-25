// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import cluster from 'cluster';
import os from 'os';

// Policy of dispatching task to another worker available
// cluster.SCHED_NONE to leave it to the operating system
// cluster.SCHED_RR for round-robin
cluster.schedulingPolicy = cluster.SCHED_RR;

if (cluster.isMaster) {
  // master worker
  os.cpus().forEach((cpu) => {
    cluster.fork();
  });
  // recieve message from worker
  cluster.on('exit', (worker, code, siganl) => {
    if (code == 200) {
      // cluster.fork();
    }
  });
} else if (cluster.isWorker) {
  // child worker
  // i.e) server.js
  // import server from server;
  console.log(`worker id: ${cluster.worker.id}`);
}
