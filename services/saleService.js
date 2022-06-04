const Model = require('../models/saleModel');

const getAll = async () => Model.getAll();

const getById = async (id) => Model.getById(id);

const createSale = async (salesArr) => {
  // create a new saleId
  const { id } = await Model.createSale();
  // insert the infos about sale in sales_products
  const promisesArr = salesArr.map((sale) => Model.insertSaleProducts(id, sale));
  await Promise.all(promisesArr);
  return ({ id, itemsSold: salesArr });
};

module.exports = {
  getAll,
  getById,
  createSale,
};
