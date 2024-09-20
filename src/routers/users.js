// src/routers/auth.js

import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  deleteUserController,
  getOneUserController,
  patchUserController,
} from '../controllers/user.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { patchUserSchema } from '../validation/users.js';
import { upload } from '../middlewares/multer.js';

const userRouter = express.Router();

userRouter.use(authenticate);

// const jsonParse = express.json({
//   type: ['application/json', 'application/vnd.api+json'],
//   //   limit: '100kb',
// });

import { getUserCountController } from '../controllers/user.js';
// import createHttpError from 'http-errors';

// userRouter.get('/count', async (req, res) => {
//   // res.send('Count');

//   ctrlWrapper(getUserCountController);
//   // try {
//   //   const totalUsers = await getUserCount();
//   //   res.json({ totalUsers });
//   // } catch {
//   //   createHttpError(500, 'Failed to count users');
//   // }
// });

userRouter.get('/count', ctrlWrapper(getUserCountController));

userRouter.get(
  '/:userId',
  // jsonParse,
  isValidId,
  ctrlWrapper(getOneUserController),
);

userRouter.patch(
  '/:userId',
  isValidId,
  upload.single('avatar'),
  validateBody(patchUserSchema),
  ctrlWrapper(patchUserController),
);

userRouter.delete('/:userId', isValidId, ctrlWrapper(deleteUserController));

export default userRouter;
