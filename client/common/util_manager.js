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

/**
 * common util class
 */
export default class Util {
  /**
   * get server URL
   */
  static getServerURL() {
    const HOST = self.location.hostname;
    const PORT = self.location.port;
    const SERVER_URL = `//${HOST}:${PORT}`;
    return SERVER_URL;
  }

  /**
   * fetch request operation
   */
  static fetchRequest(targetUrl, method, data) {
    return new Promise(function(resolve, reject) {
      fetch(targetUrl, {method, body: data}).then(function(response) {
        if (response.status !== 200) {
          console.log('Failed to fetch from ${targetUrl} Status Code: '
              + response.status);
          return reject(response.status);
        }
        response.json().then(function(respData) {
          console.log(respData);
          return resolve(respData);
        });
      })
      .catch(function (err) {
        console.log('Fetch Error : ' + err);
        reject(err);
      });
    });
  }
}
