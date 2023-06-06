import { expect } from 'chai';
import sinon from 'sinon';
import productsMock from '../../mocks/products.mock';
import ProductModel from '../../../src/database/models/product.model';
import productsService from '../../../src/services/products.service';

describe('ProductsService',function () {
  beforeEach(() => sinon.restore());

  describe('#create product', () => {
    it('Deve retornar status SUCCESFUL e o produto criado', async () => {
      // ARRANGE
      const requestBody = productsMock.newProduct;
      const newProduct = ProductModel.build(productsMock.validProduct);
      sinon.stub(ProductModel, 'create').resolves(newProduct);
      // ACT
      const serviceResponse = await productsService.createProduct(requestBody);
      // ASSERT
      expect(serviceResponse.status).to.equal('SUCCESSFUL');
      expect(serviceResponse.data).to.deep.equal(newProduct.dataValues);
    });
  });

  describe('#getAllProducts', () => {
    it('Deve retornar status SUCCESSFUL e um array com produtos encontrados', async () => {
      // ARRANGE
      const foundProduct = ProductModel.build(productsMock.validProduct);
      sinon.stub(ProductModel, 'findAll').resolves([foundProduct]);
      // ACT
      const serviceResponse = await productsService.getAllProducts();
      // ASSERT
      expect(serviceResponse.status).to.equal('SUCCESSFUL');
      expect(serviceResponse.data).to.deep.equal([foundProduct.dataValues]);
    });
  });
});
