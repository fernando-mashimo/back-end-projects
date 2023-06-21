import { IMatch } from '../Interfaces/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { IMatchModel } from '../Interfaces/models/IMatchModel';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { GameScore } from '../Types/GameScore';
import { NewMatch } from '../Types/NewMatch';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  findAllMatches = async (): Promise<IMatch[]> => {
    const dbMatches = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return dbMatches.map((match) => match);
  };

  findMatchesByProgressStatus = async (inProgress: string): Promise<IMatch[]> => {
    let boolean = true;
    if (inProgress === 'false') boolean = false;

    const dbMatches = await this.model.findAll({
      where: { inProgress: boolean },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return dbMatches.map((match) => match);
  };

  updateSelectedMatch = async (id: number, newGameScore: GameScore): Promise<number> => {
    const { homeTeamGoals, awayTeamGoals } = newGameScore;
    const [dbMatchUpdate] = await this.model.update({ homeTeamGoals, awayTeamGoals }, {
      where: { id },
    });
    return dbMatchUpdate;
  };

  finishSelectedMatch = async (id: number): Promise<number> => {
    const [dbMatchUpdate] = await this.model.update({ inProgress: false }, {
      where: { id },
    });
    return dbMatchUpdate;
  };

  insertNewMatch = async (newMatch: NewMatch): Promise<NewMatch> => {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = newMatch;
    const dbNewMatch = await this.model.create({
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress: true,
    });
    return dbNewMatch;
  };
}
