import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import ordersController from '../../../src/controllers/orders.controller';
import ordersService from '../../../src/services/orders.service';
import ordersMock from '../../mocks/orders.mock';

chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('#getAllOrders', () => {
    it('Deve retornar status 200 e um array com pedidos encontrados', async () => {
      // ARRANGE
      sinon.stub(ordersService, 'getAllOrders').resolves({
        status: 'SUCCESSFUL',
        data: [ordersMock.validOrderReturn],
      });
      // ACT
      await ordersController.getAllOrders(req, res);
      // ASSERT
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([ordersMock.validOrderReturn]);
    });
  });
});
