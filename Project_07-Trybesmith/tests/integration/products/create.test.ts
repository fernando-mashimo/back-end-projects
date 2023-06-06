import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ProductModel from '../../../src/database/models/product.model';
import ProductsMock from '../../mocks/products.mock';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(() => sinon.restore());

  describe('Novo produto criado com sucesso', () => {
    it('Deve retornar status 201 e o produto criado', async () => {
      // ARRANGE
      const product = ProductModel.build(ProductsMock.validProduct);
      sinon.stub(ProductModel, 'create').resolves(product);
      // ACT
      const productCreate = await chai.request(app).post('/products').send(ProductsMock.newProduct);
      // ASSERT
      expect(productCreate.status).to.equal(201);
      expect(productCreate.body).to.deep.equal(ProductsMock.validProduct);
    });
  });

  describe('Falha na criação de um novo produto', () => {
    describe('Name: Deve retornar erro se não for informado name em formato válido', () => {
      it('Erro 400 se não for informado name', async () => {
        // ARRANGE - não é necessário mockar
        // ACT
        const productCreate = await chai.request(app).post('/products').send(ProductsMock.invalidProductNoName);
        // ASSERT
        expect(productCreate.status).to.equal(400);
        expect(productCreate.body).to.deep.equal({ message: '"name" is required' });
      });

      it('Erro 422 se name não for do tipo string', async () => {
        // ARRANGE - não é necessário mockar
        // ACT
        const productCreate = await chai.request(app).post('/products').send(ProductsMock.invalidProductNameNotString);
        // ASSERT
        expect(productCreate.status).to.equal(422);
        expect(productCreate.body).to.deep.equal({ message: '"name" must be a string' });
      });
      
      it('Erro 422 se name não tiver pelo menos 3 caracteres', async () => {
        // ARRANGE - não é necessário mockar
        // ACT
        const productCreate = await chai.request(app).post('/products').send(ProductsMock.invalidProductNameTooShort);
        // ASSERT
        expect(productCreate.status).to.equal(422);
        expect(productCreate.body).to.deep.equal({ message: '"name" length must be at least 3 characters long' });
      });
    });

    describe('Price: Deve retornar erro se não for informado price em formato válido', () => {
      it('Erro 400 se não for informado price', async () => {
        // ARRANGE - não é necessário mockar
        // ACT
        const productCreate = await chai.request(app).post('/products').send(ProductsMock.invalidProductNoPrice);
        // ASSERT
        expect(productCreate.status).to.equal(400);
        expect(productCreate.body).to.deep.equal({ message: '"price" is required' });
      });

      it('Erro 422 se price não for do tipo string', async () => {
        // ARRANGE - não é necessário mockar
        // ACT
        const productCreate = await chai.request(app).post('/products').send(ProductsMock.invalidProductPriceNotString);
        // ASSERT
        expect(productCreate.status).to.equal(422);
        expect(productCreate.body).to.deep.equal({ message: '"price" must be a string' });
      });
      
      it('Erro 422 se price não tiver pelo menos 3 caracteres', async () => {
        // ARRANGE - não é necessário mockar
        // ACT
        const productCreate = await chai.request(app).post('/products').send(ProductsMock.invalidProductPriceTooShort);
        // ASSERT
        expect(productCreate.status).to.equal(422);
        expect(productCreate.body).to.deep.equal({ message: '"price" length must be at least 3 characters long' });
      });
    });
  });
});
