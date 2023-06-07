const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesProductsModel } = require('../../../src/models');
const { allSalesProducts, itemSold } = require('./mocks/salesProductsModel.mock');

describe('Testes da Camada Models de SalesProducts', () => {
  afterEach(() => sinon.restore());

  describe('Teste da função getAll', () => {
    it('Retorna lista de vendas com respectivos produtos', async () => {
      // ARRANGE
      sinon.restore();
      sinon.stub(connection, 'execute').resolves([allSalesProducts]);
      // ACT
      const result = await salesProductsModel.getAll();
      // ASSERT
      expect(result).to.be.deep.equal(allSalesProducts);
    });
  });

  it('Teste da função insert', async () => {
    // ARRANGE
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    sinon.stub(salesProductsModel, 'getAll').resolves(allSalesProducts);
    // ACT
    await salesProductsModel.insert(1, itemSold);
    const result = await salesProductsModel.getAll();
    // ASSERT
    expect(result).to.be.an('array');
    expect(result).to.be.deep.equal(allSalesProducts);
  });

  it('Teste da função purge', async () => {
    // ARRANGE
    sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);
    // ACT
    const result = await salesProductsModel.purge(1);
    // ASSERT
    expect(result).to.equal(1);
  });
});
