const Store = require('../models/storeModel');

// PRODUCTS
const getAllProducts = async () => Store.getAllProducts();

const getProductById = async (id) => Store.getProductById(id);

// SALES
const getAllSales = async () => Store.getAllSales();

const getSaleById = async (id) => Store.getSaleById(id);

module.exports = {
  getAllProducts,
  getProductById,
  getAllSales,
  getSaleById,
};
