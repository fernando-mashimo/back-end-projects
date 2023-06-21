import { NewMatch } from '../../Types/NewMatch';
import { GameScore } from '../../Types/GameScore';
import { IMatch } from '../IMatch';

export interface IMatchModel {
  findAllMatches(): Promise<IMatch[]>;
  findMatchesByProgressStatus(status: string): Promise<IMatch[]>;
  updateSelectedMatch(id: number, newGameScore: GameScore): Promise<number>;
  finishSelectedMatch(id: number): Promise<number>;
  insertNewMatch(newMatch: NewMatch): Promise<NewMatch>;
}
