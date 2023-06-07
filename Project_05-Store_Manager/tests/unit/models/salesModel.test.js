const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { allSales } = require('./mocks/salesModel.mock');

describe('Testes da Camada Models de Sales', () => {
  afterEach(() => sinon.restore());

  describe('Testes da função insert', () => {
    it('Retorna id da nova venda cadastrada', async () => {
      // ARRANGE
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      // ACT
      const result = await salesModel.insert();
      // ASSERT
      expect(result).to.equal(1);
    });
  });

  describe('Testes da função getAll', () => {
    it('Retorna lista com todas as vendas cadastradas', async () => {
      // ARRANGE
      sinon.stub(connection, 'execute').resolves([allSales]);
      // ACT
      const result = await salesModel.getAll();
      // ASSERT
      expect(result).to.deep.equal(allSales);
    });
  });

  describe('Testes da função getSalesById', () => {
    it('Retorna venda contendo o respectivo id', async () => {
      // ARRANGE
      sinon.stub(connection, 'execute').resolves([allSales]);
      // ACT
      const result = await salesModel.getSaleById(1);
      // ASSERT
      expect(result).to.deep.equal(allSales);
    });
  });

  describe('Testes da função purge', () => {
    it('Retorna o valor 1 como sendo a quantidade de vendas deletadas (affectedRows)', async () => {
      // ARRANGE
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      // ACT
      const result = await salesModel.purge(1);
      // ASSERT
      expect(result).to.equal(1);
    });
  });
});
