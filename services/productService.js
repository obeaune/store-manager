const Model = require('../models/productModel');

const getAll = async () => Model.getAll();

const getById = async (id) => Model.getById(id);

const createProduct = async (name, quantity) => {
  const allNames = await Model.getAll();
  const result = allNames.find((el) => el.name === name);
  if (!result) {
    // if undefined, create it
    const product = await Model.createProduct(name, quantity);
    return product;
  }
  return undefined;
};

const updateProduct = async (id, name, quantity) => {
  const allProducts = await Model.getAll();
  const result = allProducts.find((el) => el.id === Number(id));
  if (result) {
    const product = await Model.updateProduct(id, name, quantity);
    return product;
  }
  return undefined;
};

const excludeProduct = async (id) => {
  const allProducts = await Model.getAll();
  const result = allProducts.find((el) => el.id === Number(id));

  if (!result) return ('ProductNotFound'); 
  return Model.excludeProduct(id);
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  excludeProduct,
};
