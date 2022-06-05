const express = require('express');
const rescue = require('express-rescue');

const route = express.Router();
const product = require('../controllers/productController');
const validateProducts = require('../middlewares/validateProducts');

route.get('/', rescue(product.getAll));

route.get('/:id', rescue(product.getById));

route.post('/', validateProducts, rescue(product.create));

route.put('/:id', validateProducts, rescue(product.update));

route.delete('/:id', rescue(product.exclude));

module.exports = route;