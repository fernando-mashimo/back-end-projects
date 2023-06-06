import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ProductModel from '../../../src/database/models/product.model';
import ProductsMock from '../../mocks/products.mock';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(() => sinon.restore());

  describe('Requisição GET /products feita com sucesso', () => {
    it('Deve retornar status 200 e lista com todos os produtos', async () => {
      // ARRANGE
      const product = ProductModel.build(ProductsMock.validProduct);
      sinon.stub(ProductModel, 'findAll').resolves([product]);
      // ACT
      const productsList = await chai.request(app).get('/products');
      // ASSERT
      expect(productsList.status).to.equal(200);
      expect(productsList.body).to.deep.equal([product.dataValues]);
    });
  });
});
