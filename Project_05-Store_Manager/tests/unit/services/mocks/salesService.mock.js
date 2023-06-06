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
  "id": 1,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
  ]
};

const allSales = [
  {
    saleId: 1,
    date: "2023-04-28T20:13:15.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: "2023-04-28T20:13:15.000Z",
    productId: 2,
    quantity: 10,
  },
];

const updatedSale = {
  saleId: 1,
  itemsUpdated: item,
};

module.exports = {
  itemWithQttyInvalid,
  itemWithProdIdInvalid,
  item,
  products,
  soldItem,
  allSales,
  updatedSale,
};
