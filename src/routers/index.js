// src/routers/index.js

import { Router } from 'express';
import waterRouter from './waterTracking.js';
import authRouter from './auth.js';
import usersRouter from './users.js';
import statsRouter from './userCountStats.js';

const router = Router();

router.use('/water', waterRouter);
router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/count', statsRouter);

export default router;
