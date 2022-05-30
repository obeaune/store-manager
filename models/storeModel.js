const connection = require('./connection');

// PRODUCTS
const getAllProducts = async () => {
  const [rows] = await connection.execute('SELECT * FROM StoreManager.products');
  return rows;
};

const getProductById = async (id) => {
  const [content] = await connection.execute('SELECT * FROM StoreManager.products WHERE id = ?',
    [id]);
  return content;
};

// SALES
const getAllSales = async () => {
  const [rows] = await connection.execute('SELECT * FROM StoreManager.sales');
  return rows;
};

const getSaleById = async (id) => {
  const [content] = await connection.execute('SELECT * FROM StoreManager.sales WHERE id = ?',
    [id]);
  return content;
};

module.exports = {
  getAllProducts,
  getProductById,
  getAllSales,
  getSaleById,
};
