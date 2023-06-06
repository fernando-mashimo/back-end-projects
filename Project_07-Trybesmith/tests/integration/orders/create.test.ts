import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import OrderModel from '../../../src/database/models/order.model';
import ordersMock from '../../mocks/orders.mock';
import UserModel from '../../../src/database/models/user.model';
import loginMock from '../../mocks/login.mock';
import ProductModel from '../../../src/database/models/product.model';
import productsMock from '../../mocks/products.mock';
import app from '../../../src/app';
import jwt from 'jsonwebtoken';

chai.use(chaiHttp);

describe('POST /orders', function () { 
  beforeEach(() => {
    sinon.restore();
    sinon.stub(jwt, 'verify').resolves({ email: 'teste@teste.com' });
  });
  
  describe('Novo pedido cadastrado com sucesso', () => {
    it('Deve retornar status 201 e o pedido criado', async () => {
      // ARRANGE
      const user = UserModel.build(loginMock.validUser);
      sinon.stub(UserModel, 'findOne').resolves(user);
      const order = OrderModel.build(ordersMock.validOrderInput);
      sinon.stub(OrderModel, 'create').resolves(order);
      // const product = ProductModel.build(productsMock.updatedProduct);
      sinon.stub(ProductModel, 'update').resolves([1]);
      // ACT
      const orderCreate = await chai.request(app).post('/orders').send(ordersMock.validOrderInput)
        .set('Authorization', 'AJDI3J38ANAK3O9A9D9DA');
      // ASSERT
      expect(orderCreate.status).to.equal(201);
      expect(orderCreate.body).to.deep.equal(ordersMock.validOrderInput);
    });
  });

  describe('Falha na criação de um novo pedido', () => {
    describe('Falhas na validação do campo userId', () => {
      it('Retorna status 400 se userId não for informado', async () => {
        // ARRANGE - não há necessidade de mockar
        // ACT
        const orderCreate = await chai.request(app).post('/orders').send({ userId: '', productIds: [1] })
        .set('Authorization', 'AJDI3J38ANAK3O9A9D9DA');
        // ASSERT
        expect(orderCreate.status).to.equal(400);
        expect(orderCreate.body).to.deep.equal({ message: '"userId" is required' });
      });

      it('Retorna status 422 se userId não for do tipo number', async () => {
        // ARRANGE - não há necessidade de mockar
        // ACT
        const orderCreate = await chai.request(app).post('/orders').send({ userId: 'Teste', productIds: [1] })
        .set('Authorization', 'AJDI3J38ANAK3O9A9D9DA');
        // ASSERT
        expect(orderCreate.status).to.equal(422);
        expect(orderCreate.body).to.deep.equal({ message: '"userId" must be a number' });
      });

      it('Retorna status 404 se userId não for de usuário existente', async () => {
        // ARRANGE
        sinon.stub(UserModel, 'findOne').resolves(null);
        // ACT
        const orderCreate = await chai.request(app).post('/orders').send({ userId: 99, productIds: [1] })
        .set('Authorization', 'AJDI3J38ANAK3O9A9D9DA');
        // ASSERT
        expect(orderCreate.status).to.equal(404);
        expect(orderCreate.body).to.deep.equal({ message: '"userId" not found' });
      });
    });

    describe('Falhas na validação do campo productIds', () => {
      it('Retorna status 400 se productIds não for informado', async () => {
        // ARRANGE - não há necessidade de mockar
        // ACT
        const orderCreate = await chai.request(app).post('/orders').send({ userId: 1, productIds: '' })
        .set('Authorization', 'AJDI3J38ANAK3O9A9D9DA');
        // ASSERT
        expect(orderCreate.status).to.equal(400);
        expect(orderCreate.body).to.deep.equal({ message: '"productIds" is required' });
      });

      it('Retorna status 422 se productIds não for do tipo array', async () => {
        // ARRANGE - não há necessidade de mockar
        // ACT
        const orderCreate = await chai.request(app).post('/orders').send({ userId: 1, productIds: 'Teste' })
        .set('Authorization', 'AJDI3J38ANAK3O9A9D9DA');
        // ASSERT
        expect(orderCreate.status).to.equal(422);
        expect(orderCreate.body).to.deep.equal({ message: '"productIds" must be an array' });
      });

      it('Retorna status 422 se productIds for um array vazio', async () => {
        // ARRANGE - não há necessidade de mockar
        // ACT
        const orderCreate = await chai.request(app).post('/orders').send({ userId: 1, productIds: [] })
        .set('Authorization', 'AJDI3J38ANAK3O9A9D9DA');
        // ASSERT
        expect(orderCreate.status).to.equal(422);
        expect(orderCreate.body).to.deep.equal({ message: '"productIds" must include only numbers' });        
      });
    });
  });
});
