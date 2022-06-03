const Store = require('../models/productModel');

const getAll = async () => Store.getAll();

const getById = async (id) => Store.getById(id);

const createProduct = async (name, quantity) => {
  const allNames = await Store.getAll();
  const result = allNames.find((el) => el.name === name);
  if (!result) {
    // if undefined, create it
    const product = await Store.createProduct(name, quantity);
    return product;
  }
  return undefined;
};

const updateProduct = async (id, name, quantity) => {
  const allProducts = await Store.getAll();
  const result = allProducts.find((el) => el.id === Number(id));

  if (result) {
    const product = await Store.updateProduct(id, name, quantity);
    return product;
  }
  return undefined;
};

const excludeProduct = async (id) => {
  const allProducts = await Store.getAll();
  const result = allProducts.find((el) => el.id === Number(id));

  if (!result) return ('ProductNotFound'); 
  return Store.excludeProduct(id);
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  excludeProduct,
};
