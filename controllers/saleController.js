const Service = require('../services/saleService');

const getAll = async (_req, res) => {
  const sales = await Service.getAll();
  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await Service.getById(id);
  if (sale.length === 0) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(sale);
};

const create = async (req, res, _next) => {
  const salesArr = req.body;
  const sale = await Service.createSale(salesArr);
  return res.status(201).json(sale);
};

const update = async (req, res, _next) => {
  const salesArr = req.body;
  const { id } = req.params;
  const sale = await Service.updateSale(id, salesArr);
  if (!sale) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(sale);
};

const exclude = async (req, res, _next) => {
  const { id } = req.params;
  const result = await Service.exclude(id);
  if (result === 'SaleNotFound') return res.status(404).json({ message: 'Sale not found' });
  return res.status(204).end();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
