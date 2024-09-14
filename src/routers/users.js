// src/routers/auth.js
import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getOneUserController } from '../controllers/user.js';
// import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

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

export default userRouter;
