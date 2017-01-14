(function (global, factory) {
  'use strict';
  global.fcm = new (factory(global, global.document))();
})(typeof window !== 'undefined' ? window : this, function (w, d) {
  var fcm = function () {
    var self = this;
    var isString = function (obj) { return String(obj) === obj };
    var currentToken;
    var config = {
      apiKey: 'AIzaSyBcaKORAMhXJHgbJ_tiICO91-c8FOhk7J0',
      authDomain: 'absolute-732ad.firebaseapp.com',
      databaseURL: 'https://absolute-732ad.firebaseio.com',
      storageBucket: 'absolute-732ad.appspot.com',
      messagingSenderId: '569710571520'
    };
    firebase.initializeApp(config);
    const messaging = firebase.messaging();

    //Get firebase token
    function getFirebaseToken () {
      messaging.getToken()
      .then(function(token) {
        if (token) {
          currentToken = token;
        } else {
          console.log('No Instance ID token available.');
        }
      })
      .catch(function(err) {
        console.log('An error occurred while retrieving token. err : ', err);
      });
    };

    //Delete firebase token
    function deleteFirebaseToken () {
      messaging.getToken()
      .then(function(token) {
        messaging.deleteToken(token)
        .then(function() {
        })
        .catch(function(err) {
          console.log('Unable to delete token. err : ', err);
        });
      })
      .catch(function(err) {
        console.log('Error: retrieving Instance ID token. err : ', err);
      });
    };

    // Request notification permission
    function requestPermission () {
      messaging.requestPermission()
      .then(function() {
        getFirebaseToken();
      })
      .catch(function(err) {
        console.log('Notification permission denied. err : ', err);
      });
    };

    function showPushNotification(title, options) {
      var notificationTitle = title;
      if (!isString(title)) {
        notificationTitle = 'Absolute';
      }
      var notificationOptions = options || {};
      registration.showNotification(notificationTitle, notificationOptions);
    };

    // Connect to server
    function connectToServer () {
    };

    // Disconnect to server
    function disconnectToServer () {
    };

    //Callback function for token refresh 
    messaging.onTokenRefresh(function() {
      getFirebaseToken();
    });

    // Callback function to handle message from server
    messaging.onMessage(function(payload) {
      console.log('Message received. payload : ', payload);
      var title;
      var options = {
      };
      showPushNotification(title, options);
    });

    // Connect firebas, get token and link with server
    self.connect = function () {
      requestPermission();
      connectToServer();
    };

    //Disconnect firebase, delete token and unlink with server
    self.disconnect = function () {
      deleteFirebaseToken();
      disconnectToServer();
    };

    //Set PushNotification with title and options 
    self.setPushNotification = function (title, options) {
      if (!isString(title)) {
        throw new Error('Error: Title of notification must be a string. ');
      }
    };
  };
  return fcm;
});
