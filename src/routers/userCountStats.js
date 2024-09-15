// src/routers/userCountStats.js

import express from 'express';
import { getUserCount } from '../utils/usersCounter.js';
import createHttpError from 'http-errors';

const router = express.Router();

router.get('/users/count', async (req, res) => {
  try {
    const totalUsers = await getUserCount();
    res.json({ totalUsers });
  } catch {
    createHttpError(500, 'Failed to count users');
  }
});

export default router;
