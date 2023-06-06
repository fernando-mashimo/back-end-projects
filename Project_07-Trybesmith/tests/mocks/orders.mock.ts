import { Order } from '../../src/types/Order';
import { Product } from '../../src/types/Product';

const validOrder: Order = {
  id: 1,
  userId: 1,
};

const validOrderReturn: Order = {
  id: 1,
  userId: 1,
  productIds: [1, 2],
};

const validOrderServicesReturn: Order = {
  id: 1,
  userId: 1,
  productIds: [1],
};

const product: Product = {
  id: 1,
  name: 'Teste Name',
  price: 'Teste Price',
  orderId: 1,
}

const validOrderInput: Order = {
  userId: 1,
  productIds: [1],
};

export default {
  validOrder,
  validOrderReturn,
  product,
  validOrderServicesReturn,
  validOrderInput,
};
