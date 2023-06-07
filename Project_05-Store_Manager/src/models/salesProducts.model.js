const camelize = require('camelize');
const connection = require('./connection');

const insert = async (id, item) => {
  const { productId, quantity } = item;
  await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [id, productId, quantity],
  );
};

const getAll = async () => {
  const [response] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products;',
  );
  return camelize(response);
};

const purge = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    `DELETE FROM StoreManager.sales_products
    WHERE sale_id = ?`,
    [id],
  );
  return affectedRows;
};

module.exports = {
  insert,
  getAll,
  purge,
};
