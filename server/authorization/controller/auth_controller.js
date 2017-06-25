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
