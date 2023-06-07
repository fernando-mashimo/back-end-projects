const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { itemWithQttyInvalid, products, item, itemWithProdIdInvalid, soldItem, allSales, updatedSale } = require('./mocks/salesService.mock');
const { productsModel, salesModel, salesProductsModel } = require('../../../src/models');

describe('Testes da Camada Service de Sales', () => {
  afterEach(() => sinon.restore());

  describe('Testes da função createSale', () => {
    describe('Testando erro do input de id', () => {
      it('Deve retornar erro se o id informado for de um produto inexistente', async () => {
        // ARRANGE
        sinon.stub(productsModel, 'getAll').resolves(products);
        // ACT
        const result = await salesService.createSale(itemWithProdIdInvalid);
        // ASSERT
        expect(result.type).to.equal(404);
        expect(result.message).to.equal('Product not found');
      });
    });
   
    describe('Testes do caminho feliz', () => {
      it('Retorna lista contendo produto(s) cadastrado(s)', async () => {
        // ARRANGE
        sinon.stub(salesModel, 'insert').resolves(1);
        // ARRANGES secundários (não influem no resultado, apenas isolam a aplicação para não depender do BD)
        sinon.stub(productsModel, 'getAll').resolves(products);
        sinon.stub(salesProductsModel, 'insert').resolves();
        // ACT
        const result = await salesService.createSale(item);
        // ASSERT
        expect(result.type).to.equal(null);
        expect(result.message).to.deep.equal(soldItem);
      });
    });
  });

  describe('Testes da função getAll', () => {
    describe('Testando casos de erros', () => {
      it('Retorna erro se nenhum produto for encontrado', async () => {
        // ARRANGE
        sinon.stub(salesModel, 'getAll').resolves([]);
        // ACT
        const result = await salesService.getAll();
        // ASSERT
        expect(result.type).to.equal(404);
        expect(result.message).to.equal('Sale not found');
      });
    });

    describe('Testes do caminho feliz', () => {
      it("Retorna lista com todas as vendas cadastradas", async () => {
        // ARRANGE
        sinon.stub(salesModel, 'getAll').resolves(allSales);
        // ACT
        const result = await salesService.getAll();
        // ASSERT
        expect(result.type).to.equal(null);
        expect(result.message).to.deep.equal(allSales);
      });
    });
  });

  describe('Testes da função getSalesById', () => {
    describe('Testando casos de erros', () => {
      it('Retorna erro se nenhum produto for encontrado', async () => {
        // ARRANGE
        sinon.stub(salesModel, 'getSaleById').resolves([]);
        // ACT
        const result = await salesService.getSaleById(1);
        // ASSERT
        expect(result.type).to.equal(404);
        expect(result.message).to.equal('Sale not found');
      });
    });

    describe('Testes do caminho feliz', () => {
      it('Retorna lista com todas as vendas cadastradas', async () => {
        // ARRANGE
        sinon.stub(salesModel, 'getSaleById').resolves(allSales);
        // ACT
        const result = await salesService.getSaleById();
        // ASSERT
        expect(result.type).to.equal(null);
        expect(result.message).to.deep.equal(allSales);
      });
    });
  });

  describe('Testes da função deleteSale', () => {
    describe('Teste do caminho feliz', () => {
      it('Retorna objeto contendo type e message iguais a "null"', async () => {
        // ARRANGE
        sinon.stub(salesModel, 'purge').resolves(1);
        // ACT
        const result = await salesService.deleteSale(1);
        // ASSERT
        expect(result.type).to.equal(null);
        expect(result.message).to.equal(null);
      });
    });

    describe('Teste de erro de input de id', () => {
      it('Retorna status 404 e mensagem de erro', async () => {
        // ARRANGE
        sinon.stub(salesModel, 'purge').resolves(0);
        // ACT
        const result = await salesService.deleteSale(99);
        // ASSERT
        expect(result.type).to.equal(404);
        expect(result.message).to.equal('Sale not found');
      });
    });
  });

  describe('Testes da função updateSale', () => {
    describe('Teste do caminho feliz', () => {
      it('Retorna objeto contendo chaves type igual a "null" e message contendo o produto atualizado', async () => {
        // ARRANGE
        sinon.stub(salesProductsModel, 'insert').resolves();
        sinon.stub(productsModel, 'getAll').resolves(products);
        sinon.stub(salesProductsModel, 'purge').resolves(1);
        // ACT
        const result = await salesService.updateSale(1, item);
        // ASSERT
        expect(result.type).to.equal(null);
        expect(result.message).to.deep.equal(updatedSale);
      });
    });

    describe('Testes de erros de input dos ids de sale e product', () => {
      it('Retorna erro 404 e erro de produto não encontrado, se o id informado referir-se a um produto inexistente', async () => {
        // ARRANGE
        sinon.stub(productsModel, 'getAll').resolves(products);        
        // ACT
        const result = await salesService.updateSale(1, itemWithProdIdInvalid);
        // ASSERT
        expect(result.type).to.equal(404);
        expect(result.message).to.equal('Product not found');
      });

      it('Retorna erro 404 e erro de venda não encontrada, se o id informado referir-se a uma venda inexistente', async () => {
        // ARRANGE
        sinon.stub(productsModel, 'getAll').resolves(products);        
        // ACT
        const result = await salesService.updateSale(99, item);
        // ASSERT
        expect(result.type).to.equal(404);
        expect(result.message).to.equal('Sale not found');
      });
    });
  });
});