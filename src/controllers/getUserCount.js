// src/controllers/getUserCount.js

import { getUserCount } from '../services/usersCounter.js';

export const getUserCountController = async (req, res, next) => {
  const totalUsers = await getUserCount();

  res.status(200).send({
    status: 200,
    message: 'All users count',

    data: totalUsers,
  });
};
