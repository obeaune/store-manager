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
  // body validation
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().min(1).greater(0).required(),
  }).validate({ name, quantity });
  // if validation fails
  if (schema.error) return next(schema.error);

  // requesting the array of products
  const products = await Store.getAll();

  // now evaluating if there is an object that contains the name used in the body
  const r = products.find((el) => el.name === name);

  // if don't find it, create the new product
  if (!r) {
    const product = await Store.createProduct(name, quantity);
    return res.status(201).json(product);
  }
  // if find, throw error message
  return res.status(409).send({ message: 'Product already exists' });
};

const update = async (req, res, next) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  // body validation
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().min(1).greater(0).required(),
  }).validate({ name, quantity });
  // if validation fails
  if (schema.error) return next(schema.error);

  // requesting the array of products
  const products = await Store.getAll();

  // now evaluating if there is an object that contains the id used in the url
  const r = products.find((el) => el.id === Number(id));

  // if don't find it, throw error message
  if (!r) {
    return res.status(404).json({ message: 'Product not found' });
  }
  // if find, update the info product
  const product = await Store.updateProduct(id, name, quantity);
  return res.status(200).json(product);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
