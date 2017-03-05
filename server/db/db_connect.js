// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const mongoose = require('mongoose');

function connectServer() {
  mongoose.connection.on('error', console.error);
  mongoose.connection.once('open', () => {
    console.log('Connected to mongod server');
  });
  mongoose.connection.on('close', () => {
    console.log('Mongoose disconnected');
  });

  mongoose.connect('localhost:27017/absolute', (error) => {
    console.log('mongodb connected');
    if (error) {
      console.error('mongodb connection error', error);
    }
  });
}

exports.connectServer = connectServer;
