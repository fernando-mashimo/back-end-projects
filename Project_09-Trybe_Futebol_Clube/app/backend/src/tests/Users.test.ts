import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcryptjs from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UsersMock from './mocks/Users.mock';

import SequelizeUser from '../database/models/SequelizeUser';
import UserService from '../services/UserService';
import UserModel from '../models/UserModel';
import TokenGenereatorJWT from '../utils/TokenGeneratorJWT';

chai.use(chaiHttp);

const { expect } = chai;

describe('Users tests', () => {
  beforeEach(() => sinon.restore());

  describe('POST /login data input - Integration tests', () => {
    it('Login com sucesso: retorna o token gerado', async () => {
      // ARRANGE
      const user = SequelizeUser.build(UsersMock.validUser);
      sinon.stub(SequelizeUser, 'findOne').resolves(user);
      sinon.stub(bcryptjs, 'compareSync').returns(true);
      // ACT
      const response = await chai.request(app).post('/login').send(UsersMock.validUserInput);
      // ASSERT
      expect(response.status).to.be.equal(200);
      expect(response.body).not.to.be.undefined;
    });

    it('Login sem informar email: retorna mensagem de erro', async () => {
      // ARRANGE - não há necessidade, pois não chama o BD
      // ACT
      const response = await chai.request(app).post('/login').send(UsersMock.userWithOutEmail);
      // ASSERT
      expect(response.status).to.be.equal(400);
      expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
    });

    it('Login sem informar senha: retorna mensagem de erro', async () => {
      // ARRANGE - não há necessidade, pois não chama o BD
      // ACT
      const response = await chai.request(app).post('/login').send(UsersMock.userWithOutPwd);
      // ASSERT
      expect(response.status).to.be.equal(400);
      expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
    });

    it('Login informando email em formato inválido deve retornar erro', async () => {
      // ARRANGE - não há necessidade, pois não chama o BD
      // ACT
      const response = await chai.request(app).post('/login').send(UsersMock.userWithInvalidEmail);
      // ASSERT
      expect(response.status).to.be.equal(401);
      expect(response.body).to.deep.equal({ message: 'Invalid email or password' });
    });

    it('Login informando password com menos de 6 caracteres deve retornar erro', async () => {
      // ARRANGE - não há necessidade, pois não chama o BD
      // ACT
      const response = await chai.request(app).post('/login').send(UsersMock.userWithInvalidPwd);
      // ASSERT
      expect(response.status).to.be.equal(401);
      expect(response.body).to.deep.equal({ message: 'Invalid email or password' });
    });
  });

  describe('POST /login data input - Unit tests', () => {
    it('Login informando email não cadastrado no BD deve retornar erro', async () => {
      // ARRANGE
      const userModel = new UserModel();
      const tokenGenerator = new TokenGenereatorJWT();
      const userService = new UserService(userModel, tokenGenerator);
      sinon.stub(SequelizeUser, 'findOne').resolves(null);
      // ACT
      const response = await userService.login(UsersMock.userWithInvalidEmail);
      // ASSERT
      expect(response.status).to.equal('UNAUTHORIZED');
      expect(response.data).to.deep.equal({ message: 'Invalid email or password' });
    });
    
    it('Login informando password não cadastrado no BD deve retornar erro', async () => {
      // ARRANGE
      const userModel = new UserModel();
      const tokenGenerator = new TokenGenereatorJWT();
      const userService = new UserService(userModel, tokenGenerator);
      const user = SequelizeUser.build(UsersMock.validUser);
      sinon.stub(SequelizeUser, 'findOne').resolves(user);
      sinon.stub(bcryptjs, 'compareSync').returns(false);
      // ACT
      const response = await userService.login(UsersMock.validUserInput);
      // ASSERT
      expect(response.status).to.equal('UNAUTHORIZED');
      expect(response.data).to.deep.equal({ message: 'Invalid email or password' });
    });
  });

  describe('GET /login/role - Integration Tests', () => {
    it('Retorna erro se não for informado token no headers.authorization', async () => {
      // ARRANGE - não há necessidade
      // ACT
      const response = await chai.request(app).get('/login/role').set({ authorization: ''});
      // ASSERT
      expect(response.status).to.be.equal(401);
      expect(response.body).to.deep.equal({ message: 'Token not found' });
    });

    it('Retorna erro se o token informado for inválido', async () => {
      // ARRANGE
      const tokenValidation = new TokenGenereatorJWT();
      sinon.stub(tokenValidation, 'verify').returns(false);
      // ACT
      const response = await chai.request(app).get('/login/role').set({ authorization: 'ABCD'});
      // ASSERT
      expect(response.status).to.be.equal(401);
      expect(response.body).to.deep.equal({ message: 'Token must be a valid token' });
    });
  
  describe('GET /login/role - Unit Tests', () => {
    it('Deve retornar um erro ao informar cujo usuário não existe', async () => {
      // ARRANGE
      const userModel = new UserModel();
      const tokenGenerator = new TokenGenereatorJWT();
      const userService = new UserService(userModel, tokenGenerator);
      sinon.stub(SequelizeUser, 'findOne').resolves(null);
      // ACT
      const response = await userService.getRole('ABCD');
      // ASSERT
      expect(response.status).to.equal('UNAUTHORIZED');
      expect(response.data).to.deep.equal({ message: 'Invalid email or password' });
    });

    it('Deve retornar status "SUCCESSFUL" e o role do usuário encontrado', async () => {
      // ARRANGE
      const userModel = new UserModel();
      const tokenGenerator = new TokenGenereatorJWT();
      const userService = new UserService(userModel, tokenGenerator);
      const user = SequelizeUser.build(UsersMock.validUser);
      sinon.stub(SequelizeUser, 'findOne').resolves(user);
      // ACT
      const response = await userService.getRole('qualquerCoisa');
      // ASSERT
      expect(response.status).to.equal('SUCCESSFUL');
      expect(response.data).to.deep.equal({ role: UsersMock.validUser.role });
    });
  });

    it('', async () => {});
  });
});