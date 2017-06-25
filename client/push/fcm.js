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

