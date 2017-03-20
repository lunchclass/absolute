(function (global, factory) {
/* eslint-disable */
  global.auth = new factory(global, global.document)();
/* eslint-enable */
}(typeof window !== 'undefined' ? window : this, function (w, d) {
  var auth = function () {
    const self = this;

    // const HOST = self.location.hostname;
    // const PORT = self.location.port;
    const API_URL = '/api/authorization/uuid';
    // const TARGET_URL = `//${HOST}:${PORT}${API_URL}`;
    const TARGET_URL = `http://localhost:9080${API_URL}`;
    const AUTH_ERROR = {
      NONE: 0,
      GENERAL: 1,
    };

    var AuthInfo = function (uuid, error) {
      this.uuid = uuid;
      this.error = error;
    };

    var requestSetUuid = function () {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', TARGET_URL, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
        xhr.onreadystatechange = function () {
          var resp = null;
          var authinfo = null;
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              resp = JSON.parse(xhr.responseText);
              authinfo = new AuthInfo(resp.uuid, AUTH_ERROR.NONE);
              resolve(authinfo);
            } else {
              authinfo = new AuthInfo('', AUTH_ERROR.NONE);
              reject(authinfo);
            }
          }
        };
      });
    };

    var requestGetUuid = function (localUuid) {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        var queryUrl = `${TARGET_URL}?uuid=${localUuid}`;
        var authInfo = null;
        xhr.open('GET', queryUrl, true);
        try {
          xhr.send();
        } catch (error) {
          authInfo = new AuthInfo('', AUTH_ERROR.GENERAL);
          reject();
        }
        xhr.onreadystatechange = function () {
          var resp = null;
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              resp = JSON.parse(xhr.responseText);
              authInfo = new AuthInfo(resp.uuid, AUTH_ERROR.NONE);
              resolve(authInfo);
            } else {
              authInfo = new AuthInfo('', AUTH_ERROR.GENERAL);
              reject(authInfo);
            }
          }
        };
      });
    };

    var saveUuid = function (authinfo) {
      return new Promise(function (resolve, reject) {
        if (authinfo.error === AUTH_ERROR.NONE) {
          localStorage.setItem('auth_uuid', authinfo.uuid);
          resolve(authinfo);
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

    var creatNewUuid = function () {
      return new Promise(function (resolve, reject) {
        requestSetUuid().then(saveUuid)
                        .then(function (authInfo) { resolve(authInfo); });
      });
    };

    // PUBLIC API
    self.getUuid = function () {
      return new Promise(function (resolve, reject) {
        var localUuid = localStorage.getItem('auth_uuid');
        isValidUuid(localUuid).then(passLocalUuid, creatNewUuid)
                              .then(function (authInfo) { resolve(authInfo); });
      });
    };
  };
  return auth;
}));
