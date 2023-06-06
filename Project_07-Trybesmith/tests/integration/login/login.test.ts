import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import UserModel from '../../../src/database/models/user.model';
import loginMock from '../../mocks/login.mock';
import app from '../../../src/app';
import authUtil from '../../../src/utils/auth.util';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(() => sinon.restore());

  describe('Login de usuário realizado com sucesso', () => {
    it('Retorna status 200 e o token do usuário', async () => {
      // ARRANGE
      const userFound = UserModel.build(loginMock.validUser);
      sinon.stub(UserModel, 'findOne').resolves(userFound);
      sinon.stub(authUtil, 'sign').returns(loginMock.token);
      // ACT
      const loginSuccess = await chai.request(app).post('/login').send(loginMock.validUserInput);
      // ASSERT
      expect(loginSuccess.status).to.equal(200);
      expect(loginSuccess.body).to.deep.equal({ token: loginMock.token });
    });
  });

  describe('Falha no login de usuário', () => {
    it('Retorna erro 400 e mensagem de erro se não informar username', async () => {
      // ARRANGE - não é necessário mockar
      // ACT
      const loginFail = await chai.request(app).post('/login').send(loginMock.userInputNoName);
      // ASSERT
      expect(loginFail.status).to.equal(400);
      expect(loginFail.body).to.deep.equal(loginMock.errorMissingLoginData);
    });

    it('Retorna erro 400 e mensagem de erro se não informar password', async () => {
      // ARRANGE - não é necessário mockar
      // ACT
      const loginFail = await chai.request(app).post('/login').send(loginMock.userInputNoPwd);
      // ASSERT
      expect(loginFail.status).to.equal(400);
      expect(loginFail.body).to.deep.equal(loginMock.errorMissingLoginData);
    });

    it('Retorna erro 401 e mensagem de erro se informar username inválido', async () => {
      // ARRANGE
      sinon.stub(UserModel, 'findOne').resolves(null);
      // ACT
      const loginFail = await chai.request(app).post('/login').send(loginMock.invalidUsername);
      // ASSERT
      expect(loginFail.status).to.equal(401);
      expect(loginFail.body).to.deep.equal(loginMock.errorInvalidNameOrPwd);
    });
    
    it('Retorna erro 401 e mensagem de erro se informar password inválido', async () => {
      // ARRANGE
      const userFound = UserModel.build(loginMock.validUser);
      sinon.stub(UserModel, 'findOne').resolves(userFound);
      // ACT
      const loginFail = await chai.request(app).post('/login').send(loginMock.invalidUserPassword);
      // ASSERT
      expect(loginFail.status).to.equal(401);
      expect(loginFail.body).to.deep.equal(loginMock.errorInvalidNameOrPwd);
    });
  });
});
