const Store = require('../models/productModel');

const getAll = async () => Store.getAll();

const getById = async (id) => Store.getById(id);

const createProduct = async (name, quantity) => Store.createProduct(name, quantity);

const updateProduct = async (id, name, quantity) => Store.updateProduct(id, name, quantity);

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
};
