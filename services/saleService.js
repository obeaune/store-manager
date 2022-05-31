const Store = require('../models/saleModel');

const getAll = async () => Store.getAll();

const getById = async (id) => Store.getById(id);

module.exports = {
  getAll,
  getById,
};
