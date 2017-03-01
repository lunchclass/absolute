const express = require('express');
const pushManager = require('./push_manager.js');

const router = express.Router();
router.post('/client', (req, res) => {
  // Add new client
  console.log(`client token : ${req.body.token}`);
  const clientToken = req.body.token;

  if (clientToken) {
    console.log('Store client token :', clientToken);
    pushManager.addClient(clientToken);
    res.sendStatus(200);
  } else {
    res.sendStatus(400); // bad request
  }
});

router.delete('/client', (req, res) => {
  // Remove client
  const clientToken = req.body.token;
  console.log(`client token : ${req.body.token}`);

  if (clientToken) {
    console.log(`Remove client token :  ${clientToken}`);
    // Remove token from DB
    pushManager.removeClient(clientToken);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
