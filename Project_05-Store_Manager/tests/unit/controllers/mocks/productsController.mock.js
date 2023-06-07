const allProducts = [
  {
    id: 1,
    name: 'Martelinho de Ouro do Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento de cabelo',
  },
];

const editedProductObj = {
  type: null,
  message: allProducts[0],
}

const returnErrorName = {
  type: 422,
  message: '"name" length must be at least 5 characters long',
};

const returnErrorId = {
  type: 404,
  message: 'Product not found',
};

const returnSearchResult = {
  type: 200,
  message: [allProducts[0]],
};

const invalidProductName = 'a';

module.exports = {
  allProducts,
  invalidProductName,
  editedProductObj,
  returnErrorName,
  returnErrorId,
  returnSearchResult,
};
