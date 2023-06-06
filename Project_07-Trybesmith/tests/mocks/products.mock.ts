import { ProductInputtableTypes } from '../../src/database/models/product.model';
import { Product } from '../../src/types/Product';

const validProduct: Product = {
  id: 6,
  name: 'Martelo de Thor',
  price: '30 peças de ouro',
  orderId: 4,
};

const newProduct: ProductInputtableTypes = {
  name: 'Martelo de Thor',
  price: '30 peças de ouro',
  orderId: 4,
};

const invalidProductNoName: ProductInputtableTypes = {
  name: '',
  price: '30 peças de ouro',
  orderId: 4,
};

const invalidProductNameNotString = {
  name: 123,
  price: '30 peças de ouro',
  orderId: 4,
};

const invalidProductNameTooShort: ProductInputtableTypes = {
  name: 'Ma',
  price: '30 peças de ouro',
  orderId: 4,
};

const invalidProductNoPrice: ProductInputtableTypes = {
  name: 'Martelinho de Thor',
  price: '',
  orderId: 4,
};

const invalidProductPriceNotString = {
  name: 'Martelinho de Thor',
  price: 123,
  orderId: 4,
};

const invalidProductPriceTooShort: ProductInputtableTypes = {
  name: 'Martelinho de Thor',
  price: '30',
  orderId: 4,
};

const updatedProduct: Product = {
  id: 6,
  name: 'Martelo de Thor',
  price: '30 peças de ouro',
  orderId: 1,
};

export default {
  validProduct,
  newProduct,
  invalidProductNoName,
  invalidProductNameNotString,
  invalidProductNameTooShort,
  invalidProductNoPrice,
  invalidProductPriceNotString,
  invalidProductPriceTooShort,
  updatedProduct,
};
