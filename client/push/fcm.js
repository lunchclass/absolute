(function(global, factory) {
  'use strict';
  global.fcm = new factory(global, global.document)();
})(typeof window !== 'undefined' ? window : this, function(w, d) {
  var fcm = function() {
    var self = this;

    function getFirebaseToken() {
    };

    function deleteFirebaseToken() {
    };

    function requestPushPermission() {
    };

    /**
     * Register firebase push
     */
    self.register = function() {
    };

    /**
     * Unregister firebase push
     */
    self.unregister = function() {
    };
  };
  return fcm;
});

