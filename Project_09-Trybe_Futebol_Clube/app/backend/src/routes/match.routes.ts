import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/Validations';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.findAllMatches(req, res));
router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.finishSelectedMatch(req, res),
);
router.patch(
  '/:id',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.updateSelectedMatch(req, res),
);
router.post(
  '/',
  Validations.validateToken,
  Validations.validateNewMatchBody,
  (req: Request, res: Response) => matchController.insertNewMatch(req, res),
);

export default router;
