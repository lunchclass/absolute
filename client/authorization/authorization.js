(function (global, factory) {
/* eslint-disable */
  global.auth = new factory(global, global.document)();
/* eslint-enable */
}(typeof window !== 'undefined' ? window : this, function (w, d) {
  var fetchRequest = function (targetUrl, method, data) {
    return new Promise(function (resolve, reject) {
      fetch(targetUrl, { method, body: data }).then(function (response) {
        if (response.status !== 200) {
          console.log(`Failed to fetch from ${targetUrl} Status Code:
            ${response.status}`);
          reject(response.status);
        }
        response.json().then(function (respData) {
          console.log(respData);
          resolve(respData);
        });
      })
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
        reject(err);
      });
    });
  };

  var auth = function () {
    const self = this;
    const HOST = self.location.hostname;
    const PORT = self.location.port;
    const API_URL = '/api/authorization/uuid';
    const TARGET_URL = `//${HOST}:${PORT}${API_URL}`;
    const AUTH_ERROR = {
      NONE: 0,
      GENERAL: 1,
      OPEN_DB_FAIL: 2,
    };

    const DB_NAME = 'absolute';
    const INIT_DATA = { title: 'absolute', uuid: '' };

    var AuthInfo = function (uuid, error) {
      this.uuid = uuid;
      this.error = error;
    };

    var requestSetUuid = function () {
      return new Promise(function (resolve, reject) {
        console.log(`TARGET URL : ${TARGET_URL}`);
        fetchRequest(TARGET_URL, 'POST', null).then(function (result) {
          const authinfo = new AuthInfo(result.uuid, AUTH_ERROR.NONE);
          resolve(authinfo);
        }).catch(function (error) {
          const authinfo = new AuthInfo('', AUTH_ERROR.NONE);
          reject(authinfo);
        });
      });
    };

    var requestGetUuid = function (localUuid) {
      return new Promise(function (resolve, reject) {
        const queryUrl = `${TARGET_URL}?uuid=${localUuid}`;
        var authInfo = null;
        console.log(`Query URL : ${queryUrl}`);
        fetchRequest(queryUrl, 'GET', null).then(function (result) {
          authInfo = new AuthInfo(result.uuid, AUTH_ERROR.NONE);
          resolve(authInfo);
        }).catch(function (error) {
          authInfo = new AuthInfo('', AUTH_ERROR.GENERAL);
          reject(authInfo);
        });
      });
    };

    var onupgradeneeded = function (event) {
      var db = event.target.result;
      var objectStore = db.createObjectStore('auth', { keyPath: 'title' });

      // Create Index
      objectStore.createIndex('uuid', 'uuid', { unique: true });

      // Init Data
      objectStore.transaction.oncomplete = function (e) {
        var objstore = db.transaction('auth', 'readwrite').objectStore('auth');
        objstore.add(INIT_DATA);
      };
    };

    var openDb = function (dbName, updateValue) {
      return new Promise(function (resolve, reject) {
        var indexedDB = self.indexedDB ||
                        self.mozIndexedDB ||
                        self.webkitIndexedDB ||
                        self.msIndexedDB;
        var request;
        if (!indexedDB) {
          reject(AUTH_ERROR.OPEN_DB_FAIL);
        } else {
          request = indexedDB.open(dbName, 2);
          // onupgradeneeded
          request.onupgradeneeded = onupgradeneeded;
          // onsuccess
          request.onsuccess = function (event) {
            var db = event.target.result;
            resolve({ targetDb: db, source: updateValue });
          };
          // onerror
          request.onerror = function (error) {
            reject(AUTH_ERROR.OPEN_DB_FAIL);
          };
        }
      });
    };

    var getIndex = function (data) {
      return new Promise(function (resolve, reject) {
        var db = data.targetDb;
        var sourceData = data.source;
        var tran = db.transaction(['auth'], 'readwrite');
        var objectStore = tran.objectStore('auth');
        var request = objectStore.get('absolute');

        request.onsuccess = function (event) {
          var targetData = event.target.result;
          resolve({ targetDb: db,
            target: targetData,
            source: sourceData });
        };

        request.onerror = function (error) {
          reject(error);
        };
      });
    };

    var setValue = function (result) {
      return new Promise(function (resolve, reject) {
        var db = result.targetDb;
        var tran = db.transaction(['auth'], 'readwrite');
        var objectStore = tran.objectStore('auth');
        var data = result.target;
        var request;
        data.uuid = result.source;
        request = objectStore.put(data);
        // onsuccess
        request.onsuccess = function (event) {
          resolve(AUTH_ERROR.NONE);
        };
        // onerror
        request.onerror = function (error) {
          reject(AUTH_ERROR.OPEN_DB_FAIL);
        };
      });
    };

    var getValue = function (result) {
      return new Promise(function (resolve, reject) {
        var data = result.target;
        if (!data) {
          reject(AUTH_ERROR.OPEN_DB_FAIL);
        } else {
          resolve(data.uuid);
        }
      });
    };

    var handleDbError = function (error) {
      return Promise.reject(error);
    };


    var saveUuidToDb = function (dbName, value) {
      return new Promise(function (resolve, reject) {
        openDb(dbName, value).then(getIndex, handleDbError)
                             .then(setValue, handleDbError)
                             .then(function (r) { resolve(r); },
                                   function (e) { reject(e); });
      });
    };

    var getUuidToDb = function (dbName) {
      return new Promise(function (resolve, reject) {
        openDb(dbName).then(getIndex, handleDbError)
                      .then(getValue, handleDbError)
                      .then(function (r) { resolve(r); },
                            function (e) { reject(e); });
      });
    };

    var saveUuid = function (authinfo) {
      return new Promise(function (resolve, reject) {
        if (authinfo.error === AUTH_ERROR.NONE) {
          saveUuidToDb(DB_NAME, authinfo.uuid).then(function (r) {
            getUuidToDb(DB_NAME).then(function (result) {
              var retInfo = new AuthInfo(result, AUTH_ERROR.NONE);
              resolve(retInfo);
            }, function (e) {
              var retInfo = new AuthInfo('', AUTH_ERROR.OPEN_DB_FAIL);
              reject(retInfo);
            });
          });
        } else {
          reject(authinfo);
        }
      });
    };

    var isValidUuid = function (localUuid) {
      return new Promise(function (resolve, reject) {
        if (localUuid === '' || localUuid === null || localUuid === undefined) {
          reject();
        } else {
          requestGetUuid(localUuid).then(
          function (e) {
            resolve(localUuid);
          },
          function (e) {
            reject();
          });
        }
      });
    };

    var passLocalUuid = function (uuid) {
      var authInfo = new AuthInfo(uuid, AUTH_ERROR.NONE);
      return Promise.resolve(authInfo);
    };

    var createNewUuid = function () {
      return new Promise(function (resolve, reject) {
        requestSetUuid().then(saveUuid)
                        .then(function (authInfo) { resolve(authInfo); });
      });
    };

    // PUBLIC API
    self.getUuid = function () {
      return new Promise(function (resolve, reject) {
        getUuidToDb(DB_NAME).then(isValidUuid)
                            .then(passLocalUuid, createNewUuid)
                            .then(function (authInfo) { resolve(authInfo); });
      });
    };
  };
  return auth;
}));
