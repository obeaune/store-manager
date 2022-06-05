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

const updateSale = async (id, salesArr) => {
  const allSales = await Model.getAll();
  const ifTheSaleExists = allSales.find((sale) => sale.saleId === Number(id));
  if (!ifTheSaleExists) return undefined;
  await Model.updateSale(id, salesArr);
  return { saleId: id, itemUpdated: salesArr };
};

module.exports = {
  getAll,
  getById,
  createSale,
  updateSale,
};
