import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import * as jwt from 'jsonwebtoken';
import SequelizeMatch from '../database/models/SequelizeMatch';
import LeaderboardMock from './mocks/Leaderboard.mock';
import SequelizeTeam from '../database/models/SequelizeTeam';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard tests', () => {
  beforeEach(() => sinon.restore());

  describe('GET /leaderboard - Integration tests', () => {
    it('Retorna status 200 e classificação geral do times', async () => {
      // ARRANGE
      sinon.stub(jwt, 'verify').resolves();
      const matches = SequelizeMatch.build(LeaderboardMock.allMatches[0]);
      const team1 = SequelizeTeam.build(LeaderboardMock.teams[0]);
      const team2 = SequelizeTeam.build(LeaderboardMock.teams[1]);
      sinon.stub(SequelizeMatch, 'findAll').resolves([matches]);
      sinon.stub(SequelizeTeam, 'findAll').resolves([team1, team2]);
      // ACT
      const response = await chai.request(app).get('/leaderboard').set('Authorization', 'ABCD');
      console.log(response.body);
      // ASSERT
      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(LeaderboardMock.validLeaderBoard);
    });
  });
});
