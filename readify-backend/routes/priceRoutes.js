const express = require('express');
const router = express.Router();
const { comparePrices } = require('../controllers/priceController');

router.get('/compare', comparePrices);

module.exports = router;
