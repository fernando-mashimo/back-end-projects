const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');
const { allProducts, invalidProductName, editedProductObj, returnErrorName, returnErrorId, returnSearchResult } = require('./mocks/productsController.mock');
const { returnError404 } = require('./mocks/salesController.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes da Camada Controllers de Products', () => {
  afterEach(() => sinon.restore());

  describe('Teste da função getAll', () => {
    it('Retorna lista com todos os Produtos', async () => {
      // ARRANGE
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAll').resolves({ type: null, message: allProducts });
      // ACT
      await productsController.getAll(req, res);
      // ASSERT
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
    });

    it('Retorna msg de erro caso não encontre nenhum produto', async () => {
      // ARRANGE
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getAll')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      // ACT
      await productsController.getAll(req, res);
      // ASSERT
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('Teste da função getProductById', () => {
    it('Retorna apenas o produto que tem o ID informado', async () => {
      // ARRANGE
      const req = { params: { id: 1 } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getProductById').resolves({ type: null, message: allProducts[0] });
      // ACT
      await productsController.getProductById(req, res);
      // ASSERT
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts[0]);
    });

    it('Retorna msg de erro caso não encontre nenhum produto', async () => {
      // ARRANGE
      const req = { params: { id: 1 } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getProductById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      // ACT
      await productsController.getProductById(req, res);
      // ASSERT
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('Teste da função createProduct', () => {
    it('Retorna produto criado e status 201', async () => {
      // ARRANGE
      const req = { body: { name: 'Xablau' } }
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'createProduct').resolves({ type: null, message: allProducts[0] });
      // ACT
      await productsController.createProduct(req, res);
      // ASSERT
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(allProducts[0]);
    });

    it('Retorna msg de erro caso nome do produto tenha menos que 5 caracteres', async () => {
      // ARRANGE
      const req = { body: { name: invalidProductName } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'createProduct').resolves({
        type: 'INVALID_PRODUCT_NAME',
        message: '"name" length must be at least 5 characters long',
      });
      // ACT
      await productsController.createProduct(req, res);
      // ASSERT
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"name" length must be at least 5 characters long',
      });
    });
  });

  describe('Testes da função editProduct', () => {
    describe('Teste do caminho feliz', () => {
      it('Retorna o produto editado', async () => {
        // ARRANGE
        const req = { params: { id: 1 }, body: { name: 'Qualquer coisa' } };
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();        
        sinon.stub(productsService, 'editProduct').resolves(editedProductObj);
        // ACT
        await productsController.editProduct(req, res);
        // ASSERT
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(allProducts[0]);
      });
    });

    describe('Testes de erros de input de id e nome do produto', () => {
      it('Retorna status 422 e mensagem de erro caso nome do produto tenha menos que 5 caracteres', async () => {
        // ARRANGE
        const req = { params: { id: 1 }, body: { name: '1234' } };
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'editProduct').resolves(returnErrorName);
        // ACT
        await productsController.editProduct(req, res);
        // ASSERT
        expect(res.status).to.have.been.calledWith(returnErrorName.type);
        console.log(returnErrorName.message);
        expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long'});
      });

      it('Retorna status 404 e mensagem de erro caso id do produto não exista', async () => {
        // ARRANGE
        const req = { params: { id: 99 }, body: { name: 'Qualquer coisa' } };
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'editProduct').resolves(returnErrorId);
        // ACT
        await productsController.editProduct(req, res);
        // ASSERT
        expect(res.status).to.have.been.calledWith(returnErrorId.type);
        expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
      });
    });
  });

  describe('Testes da função deleteProduct', () => {
    describe('Teste do caminho feliz', () => {
      it('Retorna status 204', async () => {
        // ARRANGE
        const req = { params: { id: 1 } }
        const res = {};
        res.status = sinon.stub().returns(res);
        res.end = sinon.stub().returns();
        sinon.stub(productsService, 'deleteProduct').resolves({ type: null, message: null });
        // ACT
        await productsController.deleteProduct(req, res);
        // ASSERT
        expect(res.status).to.have.been.calledWith(204);
      });
    });

    describe('Teste de erro de input de id', () => {
      it('Retorna status 404 e mensagem de erro', async () => {
        // ARRANGE
        const req = { params: { id: 999 } };
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'deleteProduct').resolves(returnError404);
        // ACT
        await productsController.deleteProduct(req, res);
        // ASSERT
        expect(res.status).to.have.been.calledWith(returnError404.type);
        expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
      });
    });
  });

  describe('Testes da função getProductByName', () => {
    describe('Teste do caminho feliz', () => {
      it('Retorna status 200 e o produto encontrado', async () => {
        // ARRANGE
        const req = { query: { q: 'Martelo' } };
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'getProductByName').resolves(returnSearchResult);
        // ACT
        await productsController.getProductByName(req, res);
        // ASSERT
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith([allProducts[0]]);
      });
    });
  });
});
