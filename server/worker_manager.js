// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import cluster from 'cluster';
import os from 'os';

cluster.schedulingPolicy = cluster.SCHED_RR;

if (cluster.isMaster) {
  // master worker
  os.cpu.forEach((cpu) => {
    cluster.fork();
  });
  // recieve message from worker
  cluster.on('exit', (worker, code, siganl) => {
      if (code == 200) {
          // cluster.fork();
      }
  });
} else if (cluster.isWoker) {
  // child worker
  // i.e) server.js
  // import server from server;
  console.log(`worker id: ${cluster.worker.id}`);
}
