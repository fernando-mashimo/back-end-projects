const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { allProducts } = require('./mocks/productsModel.mock');
const { productsService } = require('../../../src/services');

describe('Testes da Camada Model de Products', () => {
  afterEach(() => sinon.restore());

  describe('Testes da função getAll', () => {
    it('Retorna lista com todos os Produtos', async () => {
      // ARRANGE
      sinon.stub(connection, 'execute').resolves([allProducts]);
      // ACT
      const result = await productsModel.getAll();
      // ASSERT
      expect(result).to.be.an('array');
      expect(result).to.deep.equal(allProducts);
    });
  });

  describe('Testes da função getProductById', () => {
    it('Retorna apenas o produto que tem o ID informado', async () => {
      // ARRANGE
      sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);
      // ACT
      const result = await productsModel.getProductById(1);
      // ASSERT
      expect(result).to.be.an('object');
      expect(result).to.deep.equal(allProducts[0]);
    });
  });

  describe('Testes da função insert', () => {
    it('Retorna o id do novo produto inserido', async () => {
      // ARRANGE
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      // ACT
      const result = await productsModel.insert('Produto X')
      // ASSERT
      expect(result).to.equal(1);
    });
  });

  describe('Testes da função editProduct', () => {
    it('Retorna 1 como sendo a quantidade de produtos editados (chave "affectedRows")', async () => {
      // ARRANGE
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      // ACT
      const result = await productsModel.update(1, 'Marreta do Thor');
      // ASSERT
      expect(result).to.equal(1);
    });
  });

  describe('Testes da função purge', () => {
    it('Retorna 1 como sendo a quantidade de produtos deletados (chave "affectedRows")', async () => {
      // ARRANGE
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      // ACT
      const result = await productsModel.purge(1);
      // ASSERT
      expect(result).to.equal(1);
    });
  });

  describe('Testes da função getProductByName', () => {
    it('Retorna o produto cujo nome contem o termo pesquisado', async () => {
      // ARRANGE
      sinon.stub(connection, 'execute').resolves([allProducts[0]]);
      // ACT
      const result = await productsModel.getProductByName('Qualquer');
      // ASSERT
      expect(result).to.deep.equal(allProducts[0]);
    });
  });
});
