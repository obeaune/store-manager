const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT SProducts.sale_id AS 'saleId', Sales.date AS 'date',
    SProducts.product_id AS 'productId', SProducts.quantity AS 'quantity'
    FROM StoreManager.sales_products AS SProducts
    INNER JOIN StoreManager.sales AS Sales
    ON SProducts.sale_id = Sales.id
    ORDER BY saleId, productId;`;
  const [rows] = await connection.execute(query);
  return rows;
};

const getById = async (id) => {
  const query = `SELECT S.date, SProd.product_id AS 'productId', SProd.quantity
    FROM StoreManager.sales AS S
    INNER JOIN StoreManager.sales_products AS SProd
    ON SProd.sale_id = S.id
    WHERE SProd.sale_id = ?
    ORDER BY productId;
  `;
  const [content] = await connection.execute(query, [id]);
  return content;
};

module.exports = {
  getAll,
  getById,
};