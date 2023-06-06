import { expect } from 'chai';
import sinon from 'sinon';
import OrderModel from '../../../src/database/models/order.model';
import ordersMock from '../../mocks/orders.mock';
import ProductModel from '../../../src/database/models/product.model';
import ordersService from '../../../src/services/orders.service';

describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });

  describe('#getAllOrders', () => {
    it('Deve retornar status SUCCESSFUL e um array com pedidos encontrados', async () => {
      // ARRANGE
      const foundOrders = [OrderModel.build(ordersMock.validOrder)];
      sinon.stub(OrderModel, 'findAll').resolves(foundOrders);
      const products = ProductModel.build(ordersMock.product);
      sinon.stub(ProductModel, 'findAll').resolves([products]);
      // ACT
      const serviceResponse = await ordersService.getAllOrders();
      // ASSERT
      expect(serviceResponse.status).to.equal('SUCCESSFUL');
      expect(serviceResponse.data).to.deep.equal([ordersMock.validOrderServicesReturn]);
    });
  });
});
