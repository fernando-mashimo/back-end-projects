const connection = require('./connection');

const insert = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );
  return insertId;
};

const getAll = async () => {
  const [response] = await connection.execute(
    `SELECT
      s.id AS 'saleId',
      s.date AS 'date',
      sp.product_id AS 'productId',
      sp.quantity AS 'quantity'
    FROM StoreManager.sales as s
    LEFT JOIN StoreManager.sales_products as sp
    ON s.id = sp.sale_id
    ORDER BY saleId, productId;`,
  );
  return response;
};

const getSaleById = async (id) => {
  const [response] = await connection.execute(
    `SELECT
      s.date AS 'date',
      sp.product_id AS 'productId',
      sp.quantity AS 'quantity'
    FROM StoreManager.sales as s
    LEFT JOIN StoreManager.sales_products as sp
    ON s.id = sp.sale_id
    WHERE s.id = ?
    ORDER BY productId;`,
    [id],
  );
  return response;
};

const purge = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    `DELETE FROM StoreManager.sales
    WHERE id = ?`,
    [id],
  );
  return affectedRows;
};

module.exports = {
  insert,
  getAll,
  getSaleById,
  purge,
};
