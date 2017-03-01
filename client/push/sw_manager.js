(function(global, factory) {
  'use strict';
  global.swManager = new factory(global, global.document)();
})(typeof window !== 'undefined' ? window : this, function(w, d) {
  var swManager = function() {
    var self = this;
    var pushSubscription = '';
    var swRegistration = '';

    function registerServiceWorker() {
    }

    function unregisterServiceWorker() {
    }

    function getSubscription() {
    }

    function sendPushTokenToServer() {
    }

    function requestPushPermission() {
    }

    function revokePermission() {
    }

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

    /**
     * RequestPermission
     */
    self.requestPermission = function() {
    };
  };
  return swManager;
});

