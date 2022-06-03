const connection = require('./connection');

const getAll = async () => {
  const [rows] = await connection.execute('SELECT * FROM StoreManager.products');
  return rows;
};

const getById = async (id) => {
  const [content] = await connection.execute('SELECT * FROM StoreManager.products WHERE id = ?',
    [id]);
  return content[0];
};

const createProduct = async (name, quantity) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)';

  const [product] = await connection.execute(query, [name, quantity]);
  return ({ id: product.insertId, name, quantity });
};

module.exports = {
  getAll,
  getById,
  createProduct,
};
