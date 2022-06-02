const Joi = require('joi');
const Store = require('../services/saleService');

const getAll = async (_req, res) => {
  const sales = await Store.getAll();
  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await Store.getById(id);
  if (sale.length === 0) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(sale);
};

const create = async (req, res, next) => {
  // requesting all content ( [{1}, {2}, ..., {n}] ) || ( [{1}] )
  const salesArr = req.body;

  const schema = Joi.object({
      productId: Joi.number().min(1).greater(0).required(),
      quantity: Joi.number().min(1).greater(0).required(),
    });
  
  // validating all objects in salesArr
  salesArr.forEach(({ productId, quantity }) => {
    const { error } = schema.validate({ productId, quantity });
    if (error) return next(error);
  });

  return res.status(201).json({ message: 'Rota para post (create)' });
};

const update = async (req, res, next) => {
  // requesting all content ( [{1}, {2}, ..., {n}] ) || ( [{1}] )
  const salesArr = req.body;

  const schema = Joi.object({
      productId: Joi.number().min(1).greater(0).required(),
      quantity: Joi.number().min(1).greater(0).required(),
    });
  
  // validating all objects in salesArr
  salesArr.forEach(({ productId, quantity }) => {
    const { error } = schema.validate({ productId, quantity });
    if (error) return next(error);
  });

  return res.status(200).json({ message: 'Rota para put (update)' });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
