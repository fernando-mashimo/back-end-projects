import { GameScore } from '../Types/GameScore';
import { IMatch } from '../Interfaces/IMatch';
import { IMatchModel } from '../Interfaces/models/IMatchModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/services/ServiceResponse';
import MatchModel from '../models/MatchModel';
import { NewMatch } from '../Types/NewMatch';
import TeamModel from '../models/TeamModel';

export default class MatchService {
  private teamModel = new TeamModel();

  constructor(private matchModel: IMatchModel = new MatchModel()) {}

  public findAllMatches = async (): Promise<ServiceResponse<IMatch[]>> => {
    const allMatches = await this.matchModel.findAllMatches();
    return { status: 'SUCCESSFUL', data: allMatches };
  };

  public findMatchesByProgressStatus = async (inProgress: string):
  Promise<ServiceResponse<IMatch[]>> => {
    const allMatches = await this.matchModel.findMatchesByProgressStatus(inProgress);
    return { status: 'SUCCESSFUL', data: allMatches };
  };

  public updateSelectedMatch = async (id: number, newGameScore: GameScore):
  Promise<ServiceResponse<ServiceMessage>> => {
    const updatedMatch = await this.matchModel.updateSelectedMatch(id, newGameScore);
    if (!updatedMatch) return { status: 'NOT_FOUND', data: { message: 'Error' } };
    return { status: 'SUCCESSFUL', data: { message: 'Match successfully updated' } };
  };

  public finishSelectedMatch = async (id: number):
  Promise<ServiceResponse<ServiceMessage>> => {
    const finishedMatch = await this.matchModel.finishSelectedMatch(id);
    if (!finishedMatch) return { status: 'NOT_FOUND', data: { message: 'Error' } };
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  };

  public insertNewMatch = async (newMatch: NewMatch): Promise<ServiceResponse<NewMatch>> => {
    const { homeTeamId, awayTeamId } = newMatch;
    const foundHomeTeam = await this.teamModel.findTeamById(+homeTeamId);
    const foundAwayTeam = await this.teamModel.findTeamById(+awayTeamId);

    if (!foundHomeTeam || !foundAwayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const insertedMatch = await this.matchModel.insertNewMatch(newMatch);
    return { status: 'CREATED', data: insertedMatch };
  };
}
