// src/routers/userCountStats.js

import express from 'express';
import { getUserCountController } from '../controllers/getUserCount.js';

const statsRouter = express.Router();

statsRouter.get('/', getUserCountController);

export default statsRouter;
