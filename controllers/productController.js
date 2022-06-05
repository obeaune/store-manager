const Service = require('../services/productService');

const getAll = async (_req, res) => {
  const products = await Service.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await Service.getById(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(product);
};

const create = async (req, res, _next) => {
  const { name, quantity } = req.body;
  const product = await Service.createProduct(name, quantity);
  if (product) return res.status(201).json(product);
  return res.status(409).send({ message: 'Product already exists' });
};

const update = async (req, res, _next) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const product = await Service.updateProduct(id, name, quantity);
  if (product) return res.status(200).json(product);
  return res.status(404).json({ message: 'Product not found' });
};

const exclude = async (req, res, _next) => {
  const { id } = req.params;
  const result = await Service.excludeProduct(id);
  if (result === 'ProductNotFound') return res.status(404).json({ message: 'Product not found' });
  return res.status(204).end();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
