module.exports = function(app) {
  app.post('/api/client', function(req,res) {
    // Add new client
    const clientToken = req.headers['authorization'];
    if (clientToken) {
      console.log('Store client token : ' + clientToken);
      // StoreClient token to DB
      res.sendStatus(200);
    }
    else {
      res.sendStatus(400); // bad request
    }
  });

  app.delete('/api/client', function(req,res) {
    // Remove client
    const clientToken = req.headers['authorization'];
    if (clientToken) {
      console.log('Remove client token : ' + clientToken);
      // Remove token from DB
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  });
}
