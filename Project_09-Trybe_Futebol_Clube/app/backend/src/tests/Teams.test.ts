import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam'

import { Response } from 'superagent';
import TeamsMock from './mocks/Teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams tests', () => {
  beforeEach(() => sinon.restore());

  it('Should return all teams', async () => {
    // ARRANGE
    sinon.stub(SequelizeTeam, 'findAll').resolves(TeamsMock.teams as any);
    // ACT
    const { status, body } = await chai.request(app).get('/teams');
    // ASSERT
    expect(status).to.equal(200);
    expect(body).to.deep.equal(TeamsMock.teams);
  });

  it('Should return only the selected team (id)', async () => {
    // ARRANGE
    sinon.stub(SequelizeTeam, 'findByPk').resolves(TeamsMock.teams[0] as any);
    // ACT
    const { status, body } = await chai.request(app).get('/teams/1');
    // ASSERT
    expect(status).to.equal(200);
    expect(body).to.deep.equal(TeamsMock.teams[0]);
  });

    it('Should return an error message if team id is invalid', async () => {
    // ARRANGE
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
    // ACT
    const { status, body } = await chai.request(app).get('/teams/99');
    // ASSERT
    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'Team 99 not found'});
  });
});
