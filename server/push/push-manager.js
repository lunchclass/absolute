exports.addClient = function (clientToken) {
  // save client token
};

exports.removeClient = function (clientToken) {
  // remove client token
};

exports.updateToken = function (oldClientToken, newClientToken) {
  // removeClient(oldClientToken);
  // addclient(newClientToken);
};

exports.sendPushNotification = function (clientToken) {
  const push = require('./send-push-notification.js');
  //push.sendFCMNotification(clientToken);
  setTimeout(push.sendFCMNotification, 2000, clientToken);
};
