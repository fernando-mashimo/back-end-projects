const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { allProducts, invalidProductName } = require('./mocks/productsService.mock');

describe('Testes da Camada Services de Products', () => {
  afterEach(() => sinon.restore());

  describe('Teste da função getAll', () => {
    it('Retorna lista com todos os Produtos', async () => {
      // ARRANGE
      sinon.stub(productsModel, 'getAll').resolves(allProducts);
      // ACT
      const result = await productsService.getAll();
      // ASSERT
      expect(result).to.be.an('object');
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts);
    });

    it('Retorna msg de erro caso não encontre nenhum produto', async () => {
      sinon.stub(productsModel, 'getAll').resolves(undefined);
      const result = await productsService.getAll();
      expect(result).to.be.an('object');
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });
  });

  describe('Teste da função getProductById', () => {
    it('Retorna apenas o produto que tem o ID informado', async () => {
      // ARRANGE
      sinon.stub(productsModel, 'getProductById').resolves(allProducts[0]);
      // ACT
      const result = await productsService.getProductById(1);
      // ASSERT
      expect(result).to.be.an('object');
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });

    it('Retorna msg de erro caso não encontre nenhum produto', async () => {
      // ARRANGE
      sinon.stub(productsModel, 'getProductById').resolves(undefined);
      // ACT
      const result = await productsService.getProductById(1);
      // ASSERT
      expect(result).to.be.an('object');
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });
  });

  describe('Testes da função createProduct', () => {
    it('Retorna o produto criado', async () => {
      // ARRANGE
      sinon.stub(productsModel, 'insert').resolves(1);
      sinon.stub(productsModel, "getProductById").resolves(allProducts[0]);
      // ACT
      const result = await productsService.createProduct('Xablau');
      // ASSERT
      expect(result).to.be.an('object');
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });

    it('Retorna msg de erro caso nome do produto tenha menos que 5 caracteres', async () => {
      // ARRANGE = no ARRANGE this time
      // ACT
      const result = await productsService.createProduct(invalidProductName);
      // ASSERT
      expect(result).to.be.an('object');
      expect(result).to.deep.equal({
        type: "INVALID_PRODUCT_NAME",
        message: '"name" length must be at least 5 characters long',
      });
    });
  });

  describe('Testes da função editProduct', () => {
    describe('Teste do caminho feliz', () => {
      it('Retorna o produto editado', async () => {
        // ARRANGE
        sinon.stub(productsModel, 'update').resolves(1);
        // ACT
        const result = await productsService.editProduct(1, 'Marreta do Thor');
        // ASERT
        expect(result).to.be.an('object');
        expect(result.type).to.equal(null);
        expect(result.message).to.deep.equal({ id: 1, name: 'Marreta do Thor'});
      });
    });

    describe('Testes de erros de input de id e nome do produto', () => {
      it('Retorna status 422 e mensagem de erro caso nome do produto tenha menos que 5 caracteres', async () => {
        // ARRANGE - no arrangements this time
        // ACT
        const result = await productsService.editProduct(1, '1234');
        // ASSERT
        expect(result.type).to.equal(422);
        expect(result.message).to.equal('"name" length must be at least 5 characters long');
      });

      it('Retorna status 404 e mensagem de erro caso id do produto não exista', async () => {
        // ARRANGE
        sinon.stub(productsModel, 'update').resolves(0)
        // ACT
        const result = await productsService.editProduct(99, 'Elástico do Luffy');
        // ASSERT
        expect(result.type).to.equal(404);
        expect(result.message).to.equal('Product not found');
      });
    });
  });

  describe('Testes da função deleteProduct', () => {
    describe('Teste do caminho feliz', () => {
      it('Retorna objeto com type e message iguais a "null"', async () => {
        // ARRANGE
        sinon.stub(productsModel, 'purge').resolves(1);
        // ACT
        const result = await productsService.deleteProduct(1);
        // ASSERT
        expect(result.type).to.equal(null);
        expect(result.type).to.equal(null);
      });
    });

    describe('Teste de erro de input de id', () => {
      it('Retorna status 404 e mensagem de erro', async () => {
        // ARRANGE
        sinon.stub(productsModel, 'purge').resolves(0);
        // ACT
        const result = await productsService.deleteProduct(99);
        // ASSERT
        expect(result.type).to.equal(404);
        expect(result.message).to.equal('Product not found');
      });
    });
  });

  describe('Testes da função getProductByName', () => {
    describe('Teste do caminho feliz', () => {
      it('Retorna status 200 e o produto encontrado', async () => {
        // ARRANGE
        sinon.stub(productsModel, 'getProductByName').resolves([allProducts[0]]);
        sinon.stub(productsModel, 'getAll').resolves(allProducts);
        // ACT
        const result = await productsService.getProductByName('Qualquer');
        // ASSERT
        expect(result.type).to.equal(200);
        expect(result.message).to.deep.equal([allProducts[0]]);
      });
    });

    describe('Testes de input vazio e produto não encontrado', () => {
      it('Retorna todos os produtos existentes, caso não seja informado nenhum termo de busca', async () => {
        // ARRANGE
        sinon.stub(productsModel, 'getAll').resolves(allProducts);
        // ACT
        const result = await productsService.getProductByName('');
        // ASSERT
        expect(result.type).to.equal(200);
        expect(result.message).to.deep.equal(allProducts);
      });

      it('Retorna um array vazio se nenhum produto corresponder ao termo de pesquisa', async () => {
        // ARRANGE
        sinon.stub(productsModel, 'getProductByName').resolves([]);
        // ACT
        const result = await productsService.getProductByName('Qualquer');
        // ASSERT
        expect(result.type).to.equal(200);
        expect(result.message).to.deep.equal([]);
      });
    });
  });
});
