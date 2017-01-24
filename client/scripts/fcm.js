(function (global, factory) {
  'use strict';
  global.fcm = new (factory(global, global.document))();
})(typeof window !== 'undefined' ? window : this, function (w, d) {
  var fcm = function () {
    var self = this;
    function getFirebaseToken () {
    };

    function deleteFirebaseToken () {
    };

    /**
     * Connect firebase
     */
    self.connect = function () {
    };

    /**
     * Disconnect firebase
     */
    self.disconnect = function () {
    };
  };
  return fcm;
});