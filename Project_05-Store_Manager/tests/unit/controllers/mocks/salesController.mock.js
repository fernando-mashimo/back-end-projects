const itemWithQttyInvalid = [
  {
    productId: 1,
    quantity: -1,
  },
];

const itemWithProdIdInvalid = [
  {
    productId: 999999,
    quantity: 1,
  },
];

const item = [
  {
    productId: 1,
    quantity: 1,
  },
];

const products = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
];

const soldItem = {
  id: 1,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
  ],
};

const returnError422 = {
  type: 422,
  message: '"quantity" must be greater than or equal to 1',
};

const returnError404 = {
  type: 404,
  message: 'Product not found',
};

const returnSaleNotFound = {
  type: 404,
  message: 'Sale not found',
};

const returnSaleData = {
  type: null,
  message: soldItem,
};

const updatedSale = {
  saleId: 1,
  itemsUpdated: item,
};

const returnUpdatedSaleObj = {
  type: null,
  message: updatedSale,
};

module.exports = {
  itemWithQttyInvalid,
  itemWithProdIdInvalid,
  item,
  products,
  soldItem,
  returnError422,
  returnError404,
  returnSaleData,
  returnSaleNotFound,
  updatedSale,
  returnUpdatedSaleObj,
};
