const express = require('express');
const Order = require('../model/order');

const router = express.Router();

router.post('/', (req) => {
  const order = new Order(JSON.parse(JSON.stringify(req.body)));
  order.save();
});

module.exports = router;
