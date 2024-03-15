import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  public findAllTeams = async (_req: Request, res: Response) => {
    const { status, data } = await this.teamService.findAllTeams();
    return res.status(mapStatusHTTP(status)).json(data);
  };

  public findTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, data } = await this.teamService.findTeamById(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  };
}
