const connection = require('./connection');

const getAll = async () => {
  const [response] = await connection.execute(
    'SELECT * from StoreManager.products;',
  );
  return response;
};

const getProductById = async (id) => {
  const [[response]] = await connection.execute(
    'SELECT * from StoreManager.products WHERE id = ?',
    [id],
  );
  return response;
};

const insert = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?);',
    [name],
  );
  return insertId;
};

const update = async (id, name) => {
  const [{ affectedRows }] = await connection.execute(
    `UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?`,
    [name, id],
  );
  return affectedRows;
};

const purge = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    `DELETE FROM StoreManager.products
    WHERE id = ?`,
    [id],
  );
  return affectedRows;
};

const getProductByName = async (name) => {
  const [result] = await connection.execute(
    `SELECT * FROM StoreManager.products
    WHERE name LIKE ?`,
    [`%${name}%`],
  );
  return result;
};

module.exports = {
  getAll,
  getProductById,
  insert,
  update,
  purge,
  getProductByName,
};
