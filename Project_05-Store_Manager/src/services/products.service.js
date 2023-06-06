const { productsModel } = require('../models');
const validateProductName = require('./validations/validateProdNameField');

const getAll = async () => {
  const result = await productsModel.getAll();
  if (!result || result === []) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  return { type: null, message: result };
};

const getProductById = async (id) => {
  const result = await productsModel.getProductById(id);
  if (!result || result === []) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  return { type: null, message: result };
};

const createProduct = async (name) => {
  const isProductNameValid = validateProductName(name);
  if (!isProductNameValid) {
    return {
      type: 'INVALID_PRODUCT_NAME',
      message: '"name" length must be at least 5 characters long',
    };
  }
  const productId = await productsModel.insert(name);
  const product = await productsModel.getProductById(productId);
  return { type: null, message: product };
};

const editProduct = async (id, name) => {
  const isProductNameValid = validateProductName(name);
  if (!isProductNameValid) {
    return {
      type: 422,
      message: '"name" length must be at least 5 characters long',
    };
  }
  const affectedRows = await productsModel.update(id, name);
  if (!affectedRows) {
    return {
      type: 404,
      message: 'Product not found',
    };
  }
  return { type: null, message: { id, name } };
};

const deleteProduct = async (id) => {
  const affectedRows = await productsModel.purge(id);
  if (!affectedRows) {
    return {
      type: 404,
      message: 'Product not found',
    };
  }
  return { type: null, message: null };
};

const getProductByName = async (name) => {
  if (!name || name === '') {
    const allProducts = await productsModel.getAll();
    return { type: 200, message: allProducts };
  }
  const result = await productsModel.getProductByName(name);
  if (!result || result.length === 0) {
    return { type: 200, message: [] };
  }
  return { type: 200, message: result };
};

module.exports = {
  getAll,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct,
  getProductByName,
};
