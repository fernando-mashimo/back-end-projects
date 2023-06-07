const { expect } = require('chai');
const sinon = require('sinon');
const { itemWithQttyInvalid, returnError422, itemWithProdIdInvalid, returnError404, returnSaleData, item, soldItem, returnSaleNotFound, returnUpdatedSaleObj } = require('./mocks/salesController.mock');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');

describe('Testes da camada Controller de Sales', () => {
  afterEach(() => sinon.restore());

  describe('Testes da função createSale', () => {
    describe('Testando erros dos dados de input', () => {
      it('Deve retornar erro se quantity <= 0', async () => {
        // ARRANGE
        const req = { body: itemWithQttyInvalid };
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'createSale').resolves(returnError422);
        // ACT
        await salesController.createSale(req, res);
        // ASSERT
        expect(res.status).to.have.been.calledWith(422);
        expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
      });

      it('Deve retornar erro se o id informado for de um produto inexistente', async () => {
        // ARRANGE
        const req = { body: itemWithProdIdInvalid };
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'createSale').resolves(returnError404);
        // ACT
        await salesController.createSale(req, res);
        // ASSERT
        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
      });
    });

    describe('Testando caminho feliz', () => {
      it('Retorna status 201 e dados da venda cadastrada', async () => {
        // ARRANGE
        const req = { body: item };
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'createSale').resolves(returnSaleData);
        // ACT
        await salesController.createSale(req, res);
        // ASSERT
        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(soldItem);
      });
    });
  });

  describe('Testes da função getAll', () => {
    describe('Testando casos de erros', () => {
      it('Retorna erro se nenhum produto for encontrado', async () => {
        // ARRANGE
        const req = {};
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'getAll').resolves(returnSaleNotFound);
        // ACT
        await salesController.getAll(req, res);
        // ASSERT
        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
      });
    });

    describe('Testes do caminho feliz', () => {
      it('Retorna lista com todas as vendas cadastradas', async () => {
        // ARRANGE
        const req = {};
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'getAll').resolves(returnSaleData);
        // ACT
        await salesController.getAll(req, res);
        // ASSERT
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(soldItem);
      });
    });
  });

  describe('Testes da função getSalesById', () => {
    describe('Testando casos de erros', () => {
      it('Retorna erro se nenhum produto for encontrado', async () => {
        // ARRANGE
        const req = { params: { id: 1 }};
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'getSaleById').resolves(returnSaleNotFound);
        // ACT
        await salesController.getSaleById(req, res);
        // ASSERT
        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
      });
    });

    describe('Testes do caminho feliz', () => {
      it('Retorna lista com todas as vendas cadastradas', async () => {
        // ARRANGE
        const req = { params: { id: 1 }};
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'getSaleById').resolves(returnSaleData);
        // ACT
        await salesController.getSaleById(req, res);
        // ASSERT
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(soldItem);
      });
    });
  });

  describe('Testes da função deleteSale', () => {
    describe('Teste do caminho feliz', () => {
      it('Retorna status 204', async () => {
        // ARRANGE
        const req = { params: { id: 1 } };
        const res = {};
        res.status = sinon.stub().returns(res);
        res.end = sinon.stub().returns();
        sinon.stub(salesService, 'deleteSale').resolves({ type: null, message: null });
        // ACT
        await salesController.deleteSale(req, res);
        // ASSERT
        expect(res.status).to.have.been.calledWith(204);
      });
    });

    describe('Teste de erro de input de id', () => {
      it('Retorna status 404 e mensagem de erro', async () => {
        // ARRANGE
        const req = { params: { id: 99 } };
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, "deleteSale").resolves(returnSaleNotFound);
        // ACT
        await salesController.deleteSale(req, res);
        // ASSERT
        expect(res.status).to.have.been.calledWith(returnSaleNotFound.type);
        expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
      });
    });
  });

  describe('Testes da função updateSale', () => {
    describe('Teste do caminho feliz', () => {
      it('Retorna status 200 e produto atualizado', async () => {
        // ARRANGE
        const req = { params: { id: 1 }, body: item };
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'updateSale').resolves(returnUpdatedSaleObj);
        // ACT
        await salesController.updateSale(req, res);
        // ASSERT
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(returnUpdatedSaleObj.message);
      });
    });

    describe('Testes de erros de input dos ids de sale e product', () => {
      it('Retorna erro 404 e erro de produto não encontrado, se o id informado referir-se a um produto inexistente', async () => {
        // ARRANGE
        const req = { params: { id: 1 }, body: itemWithProdIdInvalid };
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'updateSale').resolves(returnError404);
        // ACT
        await salesController.updateSale(req, res);
        // ASSERT
        expect(res.status).to.have.been.calledWith(returnError404.type);
        expect(res.json).to.have.been.calledWith({ message: 'Product not found'});
      });

      it('Retorna erro 404 e erro de venda não encontrada, se o id informado referir-se a uma venda inexistente', async () => {
        // ARRANGE
        const req = { params: { id: 99 }, body: item };
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'updateSale').resolves(returnSaleNotFound);
        // ACT
        await salesController.updateSale(req, res);
        // ASSERT
        expect(res.status).to.have.been.calledWith(returnSaleNotFound.type);
        expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
      });
    });
  });
});
