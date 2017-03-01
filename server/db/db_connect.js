// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const mongoose = require('mongoose');

const con = mongoose.connection;

function connectServer() {
  con.on('error', console.error);
  con.once('open', () => {
    console.log('Connected to mongod server');
  });
  con.on('close', () => {
    console.log('Mongoose disconnected');
  });

  mongoose.connect('localhost:27017', (err) => {
    console.log('mongodb connected');
    if (err) {
      console.error('mongodb connection error', err);
    }
  });
}

exports.connectServer = connectServer;
