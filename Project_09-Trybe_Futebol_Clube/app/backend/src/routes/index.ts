import { Router } from 'express';
import teamsRouter from './team.routes';
import userRouter from './user.routes';
import matchRouter from './match.routes';
import leaderboardRouter from './leaderboard.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', userRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
