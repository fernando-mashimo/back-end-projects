import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public getStatsHomeOrAway = async (req: Request, res: Response) => {
    const { path } = req.route;
    const { status, data } = await this.leaderboardService.getStatsHomeOrAway(path);
    return res.status(mapStatusHTTP(status)).json(data);
  };

  public getStatsAll = async (req: Request, res: Response) => {
    const { status, data } = await this.leaderboardService.getStatsAll();
    return res.status(mapStatusHTTP(status)).json(data);
  };
}
