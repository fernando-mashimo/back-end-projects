const { productsModel } = require('../../models');

const validateProdId = async (itemsArray) => {
  const allProductsId = (await productsModel.getAll()).map((product) => product.id);
  const isIdValid = itemsArray.every((item) => allProductsId.includes(item.productId));
  return isIdValid;
};

module.exports = validateProdId;
