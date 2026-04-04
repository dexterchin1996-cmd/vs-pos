const express = require('express');
const router = express.Router();
const data = require('../data/store');

let { store } = data;

router.get('/', (req, res) => {
  res.json(store);
});

router.put('/', (req, res) => {
  store = { ...store, ...req.body };
  res.json(store);
});

module.exports = router;
