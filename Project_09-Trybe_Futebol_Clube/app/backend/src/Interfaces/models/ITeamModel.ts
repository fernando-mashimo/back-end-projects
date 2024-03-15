import { ITeam } from '../ITeam';

export interface ITeamModel {
  findAllTeams(): Promise<ITeam[]>;
  findTeamById(id: ITeam['id']): Promise<ITeam | null>;
}
