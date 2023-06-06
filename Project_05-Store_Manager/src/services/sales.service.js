const { salesModel, salesProductsModel } = require('../models');
const validateProdId = require('./validations/validateProdIdField');

const createSale = async (itemsArray) => {
  const isItemIdValid = await validateProdId(itemsArray);
  if (!isItemIdValid) {
    return { type: 404, message: 'Product not found' };
  }
  const saleId = await salesModel.insert();
  await Promise.all(itemsArray.map(async (item) =>
    salesProductsModel.insert(saleId, item)));
  const itemsSold = [...itemsArray];
  const message = { id: saleId, itemsSold };
  return { type: null, message };
};

const getAll = async () => {
  const result = await salesModel.getAll();
  if (!result || result.length === 0) {
    return { type: 404, message: 'Sale not found' };
  }
  return { type: null, message: result };
};

const getSaleById = async (id) => {
  const result = await salesModel.getSaleById(id);
  if (!result || result.length === 0) {
  return { type: 404, message: 'Sale not found' };
  }
  return { type: null, message: result };
};

const deleteSale = async (id) => {
  const affectedRows = await salesModel.purge(id);
  if (!affectedRows) {
    return { type: 404, message: 'Sale not found' };
  }
  return { type: null, message: null };
};

const updateSale = async (id, itemsArray) => {
  const isItemIdValid = await validateProdId(itemsArray);
  if (!isItemIdValid) {
    return { type: 404, message: 'Product not found' };
  }

  const affectedRows = await salesProductsModel.purge(id);
  if (!affectedRows) {
    return { type: 404, message: 'Sale not found' };
  }
  await Promise.all(itemsArray.map(async (item) => salesProductsModel.insert(id, item)));
  const itemsUpdated = [...itemsArray];
  const message = { saleId: id, itemsUpdated };
  return { type: null, message };
};

module.exports = {
  createSale,
  getAll,
  getSaleById,
  deleteSale,
  updateSale,
};
