// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import {Auth} from '../model/auth';
import generator from 'uuid/v4';

/**
 * Generate uuid for user authentication.
 * @return {promise} result includes uuid
 */
export function generateUuid() {
  return new Promise((resolve, reject) => {
    const authInfo = {
      uuid: generator(),
    };
    const authData = new Auth(authInfo);
    authData.save((error) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.stringify(authInfo));
      }
    });
  });
}

/**
 * Find whether exist uuid allocated to user.
 * @param {string} clientUuid user's uuid to find
 * @return {promise} result includes uuid
 */
export function getUuid(clientUuid) {
  return new Promise((resolve, reject) => {
    const select = {uuid: `${clientUuid}`};
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
}
