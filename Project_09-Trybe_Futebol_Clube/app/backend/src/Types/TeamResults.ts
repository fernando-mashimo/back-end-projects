import { IMatch } from '../Interfaces/IMatch';

export type TeamResults = {
  wins: IMatch[];
  draws: IMatch[];
  losses: IMatch[];
  goalsFavor: number;
  goalsOwn: number;
};
