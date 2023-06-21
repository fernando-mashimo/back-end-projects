import { Request, Response, Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamController = new TeamController();

const router = Router();

router.get('/:id', (req: Request, res: Response) => teamController.findTeamById(req, res));
router.get('/', (req: Request, res: Response) => teamController.findAllTeams(req, res));

export default router;
