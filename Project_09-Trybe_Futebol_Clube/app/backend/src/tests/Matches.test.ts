import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeMatch from '../database/models/SequelizeMatch';
import MatchesMock from './mocks/Matches.mock';
import TokenGenereatorJWT from '../utils/TokenGeneratorJWT';
import MatchService from '../services/MatchService';
import * as jwt from 'jsonwebtoken';
import SequelizeTeam from '../database/models/SequelizeTeam';
import TeamsMock from './mocks/Teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches tests', () => {
  beforeEach(() => sinon.restore());

  describe('GET /matches', () => {
    it('Should return all matches', async () => {
      // ARRANGE
      sinon.stub(SequelizeMatch, 'findAll').resolves(MatchesMock.validMatches as any);
      // ACT
      const { status, body } = await chai.request(app).get('/matches');
      // ASSERT
      expect(status).to.equal(200);
      expect(body).to.deep.equal(MatchesMock.validMatches);
    });
  });

  describe('GET /matches?inProgress=', () => {
    it('Should return all matches in progress', async () => {
      // ARRANGE
      sinon.stub(SequelizeMatch, 'findAll').resolves(MatchesMock.validMatchesInProgress as any);
      // ACT
      const { status, body } = await chai.request(app).get('/matches?inProgress=true');
      // ASSERT
      expect(status).to.equal(200);
      expect(body).to.deep.equal(MatchesMock.validMatchesInProgress);
    });

    it('Should return all finished matches', async () => {
      // ARRANGE
      sinon.stub(SequelizeMatch, 'findAll').resolves(MatchesMock.validMatchesFinished as any);
      // ACT
      const { status, body } = await chai.request(app).get('/matches?inProgress=false');
      // ASSERT
      expect(status).to.equal(200);
      expect(body).to.deep.equal(MatchesMock.validMatchesFinished);
    });
  });

  describe('PATCH /matches/:id/finish - Integration Tests', () => {
    it('Retorna erro se não for informado token no headers.authorization', async () => {
      // ARRANGE - não há necessidade
      // ACT
      const response = await chai.request(app).patch('/matches/99/finish').set({ authorization: ''});
      // ASSERT
      expect(response.status).to.be.equal(401);
      expect(response.body).to.deep.equal({ message: 'Token not found' });
    });

    it('Retorna erro se o token informado for inválido', async () => {
      // ARRANGE
      // ACT
      const response = await chai.request(app).patch('/matches/99/finish').set({ authorization: 'ABCD'});
      // ASSERT
      expect(response.status).to.be.equal(401);
      expect(response.body).to.deep.equal({ message: 'Token must be a valid token' });
    });
  });
  
    it('Retorna status 404 se for informado id inválido ou partida já finalizada', async () => {
      // ARRANGE
      sinon.stub(jwt, 'verify').resolves();
      sinon.stub(SequelizeMatch, 'update').resolves([0]);
      // ACT
      const response = await chai.request(app).patch('/matches/99/finish').set('Authorization', 'ABCD');
      // ASSERT
      expect(response.status).to.be.equal(404);
      expect(response.body).to.deep.equal({ message: 'Error' });
    });

    it('Retorna status "SUCCESSFUL" e mensagem "Finished" se a partida for finalizada', async () => {
      // ARRANGE
      sinon.stub(jwt, 'verify').resolves();
      sinon.stub(SequelizeMatch, 'update').resolves([1]);
      // ACT
      const response = await chai.request(app).patch('/matches/99/finish').set('Authorization', 'ABCD');
      // ASSERT
      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal({ message: 'Finished' });
    });

  describe('PATCH /matches/:id - Integration Tests', () => {
    it('Retorna erro se não for informado token no headers.authorization', async () => {
      // ARRANGE - não há necessidade
      // ACT
      const response = await chai.request(app).patch('/matches/99').set({ authorization: ''});
      // ASSERT
      expect(response.status).to.be.equal(401);
      expect(response.body).to.deep.equal({ message: 'Token not found' });
    });

    it('Retorna erro se o token informado for inválido', async () => {
      // ARRANGE
      // ACT
      const response = await chai.request(app).patch('/matches/99').set({ authorization: 'ABCD'});
      // ASSERT
      expect(response.status).to.be.equal(401);
      expect(response.body).to.deep.equal({ message: 'Token must be a valid token' });
    });

    it('Retorna status 404 se id da partida inválido ou se nenhuma alteração for feita', async () => {
      // ARRANGE
      sinon.stub(jwt, 'verify').resolves();
      sinon.stub(SequelizeMatch, 'update').resolves([0]);
      // ACT
      const response = await chai.request(app).patch('/matches/99').set('Authorization', 'ABCD').send(MatchesMock.validMatchScore);
      // ASSERT
      expect(response.status).to.be.equal(404);
      expect(response.body).to.deep.equal({ message: 'Error' });
    });

    it('Retorna status 200 se partida atualizada com sucesso', async () => {
      sinon.stub(jwt, 'verify').resolves();
      sinon.stub(SequelizeMatch, 'update').resolves([1]);
      // ACT
      const response = await chai.request(app).patch('/matches/99').set('Authorization', 'ABCD').send(MatchesMock.validMatchScore);
      // ASSERT
      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal({ message: 'Match successfully updated' });
    });
  });

  describe('POST /matches/ - Integration Tests', () => {
    it('Retorna status 422 se ambos os times forem iguais', async () => {
      // ARRANGE
      sinon.stub(jwt, 'verify').resolves();
      // ACT
      const response = await chai.request(app).post('/matches').set('Authorization', 'ABCD').send(MatchesMock.invalidMatchInputSameTeams);
      // ASSERT
      expect(response.status).to.be.equal(422);
      expect(response.body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
    });

    it('Retorna status 404 se algum dos times não existirem na base', async () => {
      // ARRANGE
      sinon.stub(jwt, 'verify').resolves();
      sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
      // ACT
      const response = await chai.request(app).post('/matches').set('Authorization', 'ABCD').send(MatchesMock.invalidMatchInputInvalidId);
      // ASSERT
      expect(response.status).to.be.equal(404);
      expect(response.body).to.deep.equal({ message: 'There is no team with such id!' });
    });

    it('Retorna status 201 ao criar com sucesso uma partida', async () => {
      // ARRANGE
      sinon.stub(jwt, 'verify').resolves();
      const team1 = SequelizeTeam.build(TeamsMock.teams[0]);
      const team2 = SequelizeTeam.build(TeamsMock.teams[1]);
      const newMatch = SequelizeMatch.build(MatchesMock.validMatchesInProgress[0]);
      const callback = sinon.stub(SequelizeTeam, 'findByPk');
      callback.onFirstCall().resolves(team1);
      callback.onSecondCall().resolves(team2);
      sinon.stub(SequelizeMatch, 'create').resolves(newMatch);
      // ACT
      const response = await chai.request(app).post('/matches').set('Authorization', 'ABCD').send(MatchesMock.validMatchInput);
      // ASSERT
      expect(response.status).to.be.equal(201);
      expect(response.body).to.deep.equal(MatchesMock.validMatchesInProgress[0]);
    });
  });
});
