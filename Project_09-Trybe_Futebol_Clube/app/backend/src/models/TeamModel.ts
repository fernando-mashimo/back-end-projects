import { ITeam } from '../Interfaces/ITeam';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeamModel } from '../Interfaces/models/ITeamModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  findAllTeams = async (): Promise<ITeam[]> => {
    const dbTeams = await this.model.findAll();
    return dbTeams.map((team) => team);
  };

  findTeamById = async (id: ITeam['id']): Promise<ITeam | null> => {
    const dbTeam = await this.model.findByPk(id);
    if (!dbTeam) return null;

    return dbTeam;
  };
}
