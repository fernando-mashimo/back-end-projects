import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  public findAllMatches = async (req: Request, res: Response) => {
    const inProgress = req.query.inProgress as string;

    let serviceResponse = null;
    if (inProgress) {
      serviceResponse = await this.matchService.findMatchesByProgressStatus(inProgress);
    } else {
      serviceResponse = await this.matchService.findAllMatches();
    }

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  };

  public updateSelectedMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, data } = await this.matchService.updateSelectedMatch(+id, req.body);
    return res.status(mapStatusHTTP(status)).json(data);
  };

  public finishSelectedMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, data } = await this.matchService.finishSelectedMatch(+id);
    return res.status(mapStatusHTTP(status)).json(data);
  };

  public insertNewMatch = async (req: Request, res: Response) => {
    const { status, data } = await this.matchService.insertNewMatch(req.body);
    return res.status(mapStatusHTTP(status)).json(data);
  };
}
