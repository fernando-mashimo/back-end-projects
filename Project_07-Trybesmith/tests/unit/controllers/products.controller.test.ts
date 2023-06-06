import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productsMock from '../../mocks/products.mock';
import productsService from '../../../src/services/products.service';
import productsController from '../../../src/controllers/products.controller';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('#createProduct', () => {
    it('Deve retornar status 201 e o produto criado', async () => {
      // ARRANGE
      req.body = productsMock.newProduct;
      sinon.stub(productsService, 'createProduct').resolves({
        status: 'SUCCESSFUL',
        data: productsMock.validProduct,
      });
      // ACT
      await productsController.createProduct(req, res);
      // ASSERT
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(productsMock.validProduct);
    });
  });

  describe('#getAllProducts', () => {
    it('Deve retornar status 200 e um array com produtos encontrados', async () => {
      // ARRANGE
      sinon.stub(productsService, 'getAllProducts').resolves({
        status: 'SUCCESSFUL',
        data: [productsMock.validProduct],
      });
      // ACT
      await productsController.getAllProducts(req, res);
      // ASSERT
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([productsMock.validProduct]);
    });
  });
});
