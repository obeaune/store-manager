const Joi = require('joi');
const Store = require('../services/productService');

const getAll = async (_req, res) => {
  const products = await Store.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await Store.getById(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(product);
};

const create = async (req, res, next) => {
  const { name, quantity } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().min(1).greater(0).required(),
  }).validate({ name, quantity });
  
  if (schema.error) return next(schema.error);

  return res.status(201).json({ message: 'Rota para post (create)' });
};

const update = async (req, res, next) => {
  const { name, quantity } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().min(1).greater(0).required(),
  }).validate({ name, quantity });

  if (schema.error) return next(schema.error);

  return res.status(200).json({ message: 'Rota para put (update)' });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
