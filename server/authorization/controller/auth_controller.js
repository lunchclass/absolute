// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.gi
const generator = require('uuid/v4');
const Auth = require('../model/auth');

exports.generateUuid = function generateUuid() {
  return new Promise((resolve, reject) => {
    const authInfo = {
      uuid: generator(),
    };
    const auth = new Auth(authInfo);
    auth.save((error) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.stringify(authInfo));
      }
    });
  });
};

exports.getUuid = function getUuid(clientUuid) {
  return new Promise((resolve, reject) => {
    const select = { uuid: `${clientUuid}` };
    Auth.findOne(select, (error, authInfo) => {
      if (error) {
        reject(error);
      } else {
        if (authInfo === null || authInfo === undefined || authInfo === '') {
          console.log(authInfo);
          reject(-1);
        }
        resolve(JSON.stringify(authInfo));
      }
    });
  });
};
