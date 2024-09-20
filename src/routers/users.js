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
