const Store = require('../services/storeService');

// PRODUCTS
const getAllProducts = async (_req, res) => {
  const products = await Store.getAllProducts();

  return res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const product = await Store.getProductById(id);

  if (!product) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(product);
};

// SALES
const getAllSales = async (_req, res) => {
  const sales = await Store.getAllSales();

  return res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const sale = await Store.getSaleById(id);

  if (!sale) return res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json(sale);
};

module.exports = {
  getAllProducts,
  getProductById,
  getAllSales,
  getSaleById,
};
