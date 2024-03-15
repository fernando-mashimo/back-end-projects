import TeamModel from '../models/TeamModel';
import { ITeamStats } from '../Interfaces/ITeamStats';
import { ServiceResponse } from '../Interfaces/services/ServiceResponse';
import MatchModel from '../models/MatchModel';
import { IMatch } from '../Interfaces/IMatch';
import { TeamResults } from '../Types/TeamResults';

export default class LeaderboardService {
  private teamModel = new TeamModel();
  private matchModel = new MatchModel();

  private teamStatsHomeOrAway = (path: string, teamMatches: IMatch[]): TeamResults => {
    const wins = teamMatches.filter((match) =>
      (path === '/home'
        ? match.homeTeamGoals > match.awayTeamGoals
        : match.homeTeamGoals < match.awayTeamGoals));
    const draws = teamMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
    const losses = teamMatches.filter((match) =>
      (path === '/home'
        ? match.homeTeamGoals < match.awayTeamGoals
        : match.homeTeamGoals > match.awayTeamGoals));
    const goalsFavor = teamMatches.reduce((acc, curr) => acc
      + (path === '/home' ? curr.homeTeamGoals : curr.awayTeamGoals), 0);
    const goalsOwn = teamMatches.reduce((acc, curr) => acc
      + (path === '/home' ? curr.awayTeamGoals : curr.homeTeamGoals), 0);
    return { wins, draws, losses, goalsFavor, goalsOwn };
  };

  private teamStats = (id: number, teamMatches: IMatch[]): TeamResults => {
    const matchesHome = teamMatches.filter((match) => match.homeTeamId === id);
    const matchesAway = teamMatches.filter((match) => match.awayTeamId === id);
    const wins = matchesHome.filter((match) => match.homeTeamGoals > match.awayTeamGoals)
      .concat(matchesAway.filter((match) => match.awayTeamGoals > match.homeTeamGoals));
    const draws = teamMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
    const losses = matchesHome.filter((match) => match.homeTeamGoals < match.awayTeamGoals)
      .concat(matchesAway.filter((match) => match.awayTeamGoals < match.homeTeamGoals));
    const goalsFavor = matchesHome.reduce((acc, curr) => acc + curr.homeTeamGoals, 0)
      + matchesAway.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
    const goalsOwn = matchesHome.reduce((acc, curr) => acc + curr.awayTeamGoals, 0)
      + matchesAway.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
    return { wins, draws, losses, goalsFavor, goalsOwn };
  };

  private teamStatsReport = (name: string, teamStats: TeamResults, teamMatches: IMatch[]):
  ITeamStats => ({
    name,
    totalPoints: teamStats.wins.length * 3 + teamStats.draws.length,
    totalGames: teamMatches.length,
    totalVictories: teamStats.wins.length,
    totalDraws: teamStats.draws.length,
    totalLosses: teamStats.losses.length,
    goalsFavor: teamStats.goalsFavor,
    goalsOwn: teamStats.goalsOwn,
    goalsBalance: teamStats.goalsFavor - teamStats.goalsOwn,
    efficiency: ((((teamStats.wins.length * 3) + (teamStats.draws.length))
        / (teamMatches.length * 3)) * 100).toFixed(2).toString(),
  });

  public sortStatsReport = (statsReport: ITeamStats[]): ITeamStats[] => {
    statsReport.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      return b.goalsFavor - a.goalsFavor;
    });
    return statsReport;
  };

  public getStatsHomeOrAway = async (path: string): Promise<ServiceResponse<ITeamStats[]>> => {
    const matches = await this.matchModel.findMatchesByProgressStatus('false');
    const teams = await this.teamModel.findAllTeams();
    const teamsStatsRaw = await Promise.all(teams.map(async (team) => {
      const name = team.teamName;
      let teamMatches: IMatch[] = [];
      if (path === '/home') {
        teamMatches = matches.filter((match) => match.homeTeamId === team.id);
      } else teamMatches = matches.filter((match) => match.awayTeamId === team.id);
      const teamStats = this.teamStatsHomeOrAway(path, teamMatches);
      const statsReport = this.teamStatsReport(name, teamStats, teamMatches);
      return statsReport;
    }));

    const teamsStats = this.sortStatsReport(teamsStatsRaw);

    return { status: 'SUCCESSFUL', data: teamsStats };
  };

  public getStatsAll = async (): Promise<ServiceResponse<ITeamStats[]>> => {
    const matches = await this.matchModel.findMatchesByProgressStatus('false');
    const teams = await this.teamModel.findAllTeams();
    const teamsStatsRaw = await Promise.all(teams.map(async (team) => {
      const name = team.teamName;
      const teamMatches: IMatch[] = matches
        .filter((match) => match.homeTeamId === team.id || match.awayTeamId === team.id);
      const teamStats = this.teamStats(team.id, teamMatches);
      const statsReport = this.teamStatsReport(name, teamStats, teamMatches);
      return statsReport;
    }));

    const teamsStats = this.sortStatsReport(teamsStatsRaw);

    return { status: 'SUCCESSFUL', data: teamsStats };
  };
}
