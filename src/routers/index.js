// src/routers/index.js

import { Router } from 'express';
import waterRouter from './waterTracking.js';
import authRouter from './auth.js';
import userRouter from './user.js';

const router = Router();

router.use('/water', waterRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter);

export default router;
