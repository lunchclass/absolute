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

import cluster from 'cluster';
import event from 'events';
import os from 'os';
import sourceMapSupport from 'source-map-support';
import util from 'util';

// It provides source map support for stack traces in node
sourceMapSupport.install({environment: 'node'});

// Policy of dispatching task to another worker available
// cluster.SCHED_NONE to leave it to the operating system
// cluster.SCHED_RR for round-robin
cluster.schedulingPolicy = cluster.SCHED_RR;
let makeWorker = function(cluster) {
  let worker = cluster.fork();
  return new Promise((resolve, reject) => {
    worker.on('online', () => {
      resolve(worker.id);
    });
  });
};
let workers = [];

/**
 * WorkerEvent() in worker_manager.js
 * it inherits EventEmitter
 */
function WorkerEvent() {
  event.EventEmitter.call(this);
}

/**
 * run() in worker_manager.js
 * it makes child-process for using multi-core
 * @return {WorkerEvent}
 */
export function run() {
  let workerEvent = new WorkerEvent();
  if (cluster.isMaster) {
    // master worker
    os.cpus().forEach((cpu) => {
      workers.push(makeWorker(cluster));
    });
    Promise.all(workers).then((id) => {
      console.log(`All workers are online ${id}`);
      workerEvent.emit('All workers online', 'workers');
    });
    // recieve message from worker
    cluster.on('exit', (worker, code, siganl) => {
      if (code == 200) {
        // cluster.fork();
      }
    });
  } else if (cluster.isWorker) {
    // child worker
    console.log(`worker id: ${cluster.worker.id}`);
  }
  return workerEvent;
}
util.inherits(WorkerEvent, event.EventEmitter);


