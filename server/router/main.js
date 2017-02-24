module.exports = function(app) {
  app.post('/api/client', function(req,res) {
    // Add new client
    const auth = req.headers['authorization'];
    const clientToken = auth.split('=')[1];
    if (clientToken) {
      console.log('Store client token : ' + clientToken);

      const pushManager = require('../push/push-manager.js');
      pushManager.addClient(clientToken);
      pushManager.sendPushNotification(clientToken);
      // StoreClient token to DB
      res.sendStatus(200);

    } else {
      res.sendStatus(400); // bad request
    }
  });

  app.delete('/api/client', function(req,res) {
    // Remove client
    const clientToken = req.headers['authorization'];
    if (clientToken) {
      console.log('Remove client token : ' + clientToken);
      // Remove token from DB
      pushManager.removeClient(clientToken);
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  });

  app.get('/api/client', function(req, res) {

  });
}
