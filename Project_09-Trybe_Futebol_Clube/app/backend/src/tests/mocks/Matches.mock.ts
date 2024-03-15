const validMatches = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
  },
];

const validMatchInput = {
  homeTeamId: 1,
  homeTeamGoals: 1,
  awayTeamId: 2,
  awayTeamGoals: 1,
};

const validMatchesInProgress = [
  {
    id: 1,
    homeTeamId: 1,
    homeTeamGoals: 1,
    awayTeamId: 2,
    awayTeamGoals: 1,
    inProgress: true,
  },
];

const validMatchesFinished = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
  },
];

const validMatchScore = {
  homeTeamGoals: 1,
  awayTeamGoals: 7,
};

const invalidMatchInput = {
  homeTeamGoals: 1,
  awayTeamId: 8,
  awayTeamGoals: 1,
};

const invalidMatchInputSameTeams = {
  homeTeamId: 16,
  homeTeamGoals: 1,
  awayTeamId: 16,
  awayTeamGoals: 1,
};

const invalidMatchInputInvalidId = {
  ...invalidMatchInput,
  homeTeamId: 99,
};

export default {
  validMatches,
  validMatchesInProgress,
  validMatchesFinished,
  validMatchScore,
  invalidMatchInput,
  invalidMatchInputSameTeams,
  invalidMatchInputInvalidId,
  validMatchInput,
};