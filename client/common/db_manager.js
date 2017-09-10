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
 * DataBase class (indexed DB)
 */
const DB_NAME = 'Absolute';
export default class DataBase {
  /**
   * open Data Base
   */
  openDataBase (store, key) {
    return new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) {
        console.log('This browser doesn\'t support IndexedDB');
        reject(AUTH_ERROR.OPEN_DB_FAIL);
      }
      var requestDB = indexedDB.open(DB_NAME);
      requestDB.onupgradeneeded = (event) => {
        var db = event.target.result;
        var objectStore = db.createObjectStore(store, { keyPath: key });
        objectStore.createIndex("index_" + key, key, { unique: true });
      };
      requestDB.onsuccess = (event) => {
        var db = event.target.result;
        resolve({ targetDb: db });
      };
      requestDB.onerror = (error) => {
        reject(AUTH_ERROR.OPEN_DB_FAIL);
      };
    });
  }

  /**
   * add value to data base
   */
  addValueToDataBase (store, key, value) {
    return new Promise((resolve, reject) => {
      this.openDataBase(store, key).then(result => {
        var db = result.targetDb;
        var transaction = db.transaction([store], 'readwrite');
        var objectStore = transaction.objectStore(store);
        // FIXME(daehyun): need to implement to handle database for multi values.
        var jsonData = { };
        jsonData[key] = value;
        var request = objectStore.add(jsonData);
        request.onsuccess = (event) => {
          resolve(event.target.result);
        };
        request.onerror = (error) => {
          reject(error);
        };
        request.oncomplete = (event) => {
        };
      });
    });
  }

  /**
   * get value from data base
   */
  getValueFromDataBase (store, key, value) {
    return new Promise((resolve, reject) => {
      this.openDataBase(store, key).then(result => {
        var db = result.targetDb;
        var transaction = db.transaction([store], 'readwrite');
        var objectStore = transaction.objectStore(store);
        var request = objectStore.get(value);
        request.onsuccess = (event) => {
          resolve(event.target.result);
        };
        request.onerror = (error) => {
          reject(error);
        };
      });
    });
  }

  /**
   * update value to data base
   */
  updateValueToDataBase (store, key, value) {
    return new Promise((resolve, reject) => {
      this.openDataBase(store, key).then(result => {
        var db = result.targetDb;
        var transaction = db.transaction([store], 'readwrite');
        var objectStore = transaction.objectStore(store);
        // FIXME(daehyun): need to implement to handle database for multi values.
        var jsonData = { };
        jsonData[key] = value;
        var request = objectStore.put(jsonData);
        request.onsuccess = (event) => {
          resolve(event.target.result);
        };
        request.onerror = (error) => {
          reject(error);
        };
      });
    });
  }
}

