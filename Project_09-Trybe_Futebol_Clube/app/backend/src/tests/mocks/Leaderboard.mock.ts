const allMatches = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'São Paulo',
    },
    awayTeam: {
      teamName: 'Grêmio',
    },
  },
];

const teams = [
  {
    id: 16,
    teamName: 'São Paulo',
  },
  {
    id: 8,
    teamName: 'Grêmio',
  },
];

const validLeaderBoard = [
  {
    name: 'São Paulo',
    totalPoints: 1,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 1,
    goalsOwn: 1,
    goalsBalance: 0,
    efficiency: '33.33',
  },
  {
    name: 'Grêmio',
    totalPoints: 1,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 1,
    goalsOwn: 1,
    goalsBalance: 0,
    efficiency: '33.33',
  },
];

export default {
  allMatches,
  teams,
  validLeaderBoard,
}
