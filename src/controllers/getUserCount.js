import { getUserCount } from '../utils/usersCounter.js';

export const getUserCountController = async (req, res, next) => {
  const totalUsers = await getUserCount();

  res.status(200).send({
    status: 200,
    message: '...',
    data: totalUsers.length,
  });
};
