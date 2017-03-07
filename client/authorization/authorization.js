(function (global, factory) {
  /*eslint-disable */
  global.auth = new factory(global, global.document)();
  /*eslint-enable */
}(typeof window !== 'undefined' ? window : this, function (w, d) {
  var auth = function () {
    var self = this;
    var AuthInfo = function (uuid, error) {
      this.uuid = uuid;
      this.error = error;
    };
    const HOST = self.location.hostname;
    const PORT = self.location.port;
    const API_URL = '/api/authorization/uuid/';
    const TARGET_URL = `//${HOST}:${PORT}${API_URL}`;
    const AUTH_ERROR = {
      NONE: 0,
      GENERAL: 1,
    };
    var getUuid = function () {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('post', TARGET_URL);
        xhr.setRequestHeader('Content-Type', 'application/javascript');
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

    function saveUuid(authinfo) {
      return new Promise(function (resolve, reject) {
        if (authinfo.error === AUTH_ERROR.NONE) {
          self.localStorage.setItem('auth_uuid', authinfo.uuid);
          resolve(authinfo.error);
        } else {
          reject(authinfo.error);
        }
        // FIXME resovle should be callded when event handling
        self.storage = function () {
          console.log('storage changed');
          // resolve(AUTH_ERROR.NONE);
        };
      });
    }
    // PUBLIC API
    self.getUuid = function () {
      return new Promise(function (resolve, reject) {
        getUuid().then(function (result) { return saveUuid(result); })
                 .then(function (e) { resolve(e); });
      });
    };
  };
  return auth;
}));