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

/** IndexedDB */
const indexedDatabase = {
  /**
   * open database
   * @param {string} name the name of database
   * @param {int} version the version of database
   * @param {Database} upgradeCallback called when version is greater than last version
   * @return {Promise} Database object
   */
  openDatabase(name, version, upgradeCallback) {
    const _database = indexedDB.open(name, version);
    return new Database(_database);
  },

  /**
   * delete database
   * @param {string} name the name of database
   * @return {Promise} void
   */
  deleteDataBase(name) {
  },
}

export default indexedDatabase;

/** IDBDatabase */
export class Database {
  constructor(_database) {
    this.database = _database;
    this.name = _database.name;
    this.version = _database.version;
    this.objectStoreNames = _database.objectStoreNames;
  }
  /** close connection of Database */
  close() {
  }

  /**
   * transaction (IDBTransaction)
   * @param {string} storeNames the name of store object
   * @param {IDBTransactionMode} mode ('readonly', 'readwrite', 'versionchange')
   * @return {Transaction} Transaction object
   */
  transaction(storeName, mode = 'readonly') {
    const _transaction = this.database.transaction(storeName, mode);
    return new Transaction(_transaction, storeName, mode);
  }

  /**
   * create object store
   * @param {string} name the name of object store
   * @param {IDBObjectStoreParameters} param IDBObjectStoreParameters (keypath, autoincrement)
   * @return {Objectstore} ObjetStore object
   */
  createObjectStore(name, params = {}) {
    return new ObjectStore(_objectStore, name);
  }

  /**
   * delete object store
   * @param {string} name the name of object store
   */
  deleteObjectStore(name) {
  }
}

/** IDBTransaction */
export class Transaction {
  constructor(_transaction, objectStoreNames, mode = 'readonly') {
    this.transaction = transact;
    this.objectStoreNames = objectStoreNames;
    this.mode = mode;
  }

  /**
   * rollback related with this Transaction
   */
  abort() {
  }

  /**
   * return objectStore object
   * @param {string} name the name of requested object store
   * @return {Objectstore} Objetstore object related with this Transaction
   */
  objectStore() {
    const _objectStore = this.transaction.objectStore(this.objectStoreNames);
    return new ObjectStore(_objectStore, this.objectStoreNames);
  }
}

/** IDBObjectStore */
export class ObjectStore {
  constructor(_objectStore, name) {
    this.objectStore = _objectStore;
    this.name = name;
    this.indexNames = '';
  }

  /**
   * add value to object store
   * @param {any} value the value to be stored in the record
   * @param {any} key the key used to identify the record
   * @return {Promise} IDBRequest
   */
  add(value, key = undefined) {
  }

  /**
   * update value to object store with key
   * @param {any} value the value to be stored in the record
   * @param {any} key the key used to identify the record
   * @return {Promise} IDBRequest
   */
  put(value, key = undefined) {
  }

  /**
   * get value from object store with key
   * @param {any} key the key used to get the record
   * @return {Promise} IDBRequest
   */
  get(key) {
  }

  /**
   * delete value with key
   * @param {any} key identifying the record to be deleted
   * @return {Promise} IDBRequest
   */
  delete(key) {
  }

  /**
   * clear object store
   * @return {Promise} IDBRequest
   */
  clear() {
  }
}

