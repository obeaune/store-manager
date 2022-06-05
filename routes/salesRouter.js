const express = require('express');
const rescue = require('express-rescue');

const route = express.Router();
const sale = require('../controllers/saleController');
const validateSales = require('../middlewares/validateSales');

route.get('/', rescue(sale.getAll));

route.get('/:id', rescue(sale.getById));

route.post('/', validateSales, rescue(sale.create));

route.put('/:id', validateSales, rescue(sale.update));

module.exports = route;
