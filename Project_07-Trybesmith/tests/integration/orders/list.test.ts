import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import OrderModel, { OrderSequelizeModel } from '../../../src/database/models/order.model';
import OrdersMock from '../../mocks/orders.mock';
import { Order } from '../../../src/types/Order';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /orders', function () { 
  beforeEach(() => sinon.restore());

  describe('Requisição GET /orders feita com sucesso', () => {
    it('Deve retornar status 200 e lista com todos os pedidos', async () => {
      // ARRANGE
      const orders = OrderModel.build(OrdersMock.validOrder);
      sinon.stub(OrderModel, 'findAll').resolves([orders]);
      // ACT
      const ordersList = await chai.request(app).get('/orders');
      // ASSERT
      expect(ordersList.status).to.equal(200);
      expect(ordersList.body).to.deep.equal([{...orders.dataValues, productIds: [1, 2]}]);
    });
  });
});
