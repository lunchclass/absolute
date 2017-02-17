(function(global, factory) {
  'use strict';
  global.fcm = new factory(global, global.document)();
})(typeof window !== 'undefined' ? window : this, function(w, d) {
  var fcm = function() {
    var self = this;
    var authorizationKey = '';
    var clientToken = '';

    var config = {
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      storageBucket: '',
      messagingSenderId: ''
    };

    firebase.initializeApp(config);
    const messaging = firebase.messaging();

    function createFirebaseToken() {
      messaging.getToken()
      .then(function(token) {
        if (token) {
          clientToken = token;
          sendFCMTokenToServer();
        } else {
          console.log('No token available.');
        }
      })
      .catch(function(err) {
        console.log('An error occurred while retrieving token. err : ', err);
      });
    }

    function deleteFirebaseToken() {
    }

    function requestPushPermission() {
      messaging.requestPermission()
      .then(function() {
        createFirebaseToken();
      })
      .catch(function(err) {
        console.log('Notification permission denied. err : ', err);
      });
    }

    function sendFCMTokenToServer() {
      var http = new XMLHttpRequest();
      var url = "https://localhost:9443/api/client";
      http.open("POST", url, true);
      http.setRequestHeader("Content-Type", "application/json");
      http.setRequestHeader("Authorization", "key=",authorizationKey);
      http.onreadystatechange = function() {
        if (http.readyState == XMLHttpRequest.DONE && http.status == 200) {
          console.log(http.responseText);
        }
      }
      http.send(JSON.stringify({
        to: clientToken
      }));
    }

    /**
     * Register firebase push
     */
    self.register = function() {
      requestPushPermission();
    };

    /**
     * Unregister firebase push
     */
    self.unregister = function() {
    };
  };
  return fcm;
});

