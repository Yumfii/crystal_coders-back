import createHttpError from 'http-errors';
import { contactModelsFindById } from '../services/user.js';

export const getOneUserController = async (req, res, next) => {
  const { userId } = req.params;
  //   console.log(req.user._id.toString());

  const user = await contactModelsFindById(userId);
  //   console.log(user);

  if (
    !user
    // || user.userId.toString() !== req.user._id.toString()
  ) {
    return next(
      createHttpError(404, 'User not found or you do not have access to it'),
    );
  }

  // console.log(user);

  res.status(200).send({
    status: 200,
    message: `Successfully found user with id ${userId}!`,
    data: user,
  });
};
