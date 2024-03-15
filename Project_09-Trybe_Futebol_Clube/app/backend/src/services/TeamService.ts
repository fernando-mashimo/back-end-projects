import { ServiceResponse } from '../Interfaces/services/ServiceResponse';
import { ITeamModel } from '../Interfaces/models/ITeamModel';
import { ITeam } from '../Interfaces/ITeam';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  public findAllTeams = async (): Promise<ServiceResponse<ITeam[]>> => {
    const allTeams = await this.teamModel.findAllTeams();
    return { status: 'SUCCESSFUL', data: allTeams };
  };

  public findTeamById = async (id: number): Promise<ServiceResponse<ITeam>> => {
    const team = await this.teamModel.findTeamById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    return { status: 'SUCCESSFUL', data: team };
  };
}
