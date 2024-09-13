// src/routers/auth.js
import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema, loginUserSchema } from '../validation/auth.js';
import {
  registerUserController,
  loginUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
// import { authenticate } from '../middlewares/authenticate.js';
import { getGoogleOAuthUrlController } from '../controllers/auth.js';
import { loginWithGoogleOAuthSchema } from '../validation/auth.js';
import { loginWithGoogleController } from '../controllers/auth.js';

const authRouter = express.Router();
// authRouter.use(authenticate);

authRouter.post(
  '/auth/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/auth/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.get(
  '/get-oauth-url',
  ctrlWrapper(getGoogleOAuthUrlController),
);

authRouter.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);

export default authRouter;
