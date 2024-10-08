// src/routers/auth.js

import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserSchema,
  loginUserSchema,
  loginWithGoogleOAuthSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
  requestVerificationSchema,
  verificationEmailSchema,
} from '../validation/auth.js';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  getGoogleOAuthUrlController,
  loginWithGoogleController,
  requestResetEmailController,
  // resetPasswordController,
  handleAuthCallback,
  getSessionsController,
  requestVerificationController,
  verificationController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

authRouter.get('/session', ctrlWrapper(getSessionsController));

authRouter.post('/logout', ctrlWrapper(logoutUserController));

authRouter.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

authRouter.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);

authRouter.post(
  '/request-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);
authRouter.post(
  '/request-verify-email',
  validateBody(requestVerificationSchema),
  ctrlWrapper(requestVerificationController),
);
authRouter.post(
  '/verify-email',
  validateBody(verificationEmailSchema),
  ctrlWrapper(verificationController),
);
authRouter.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(verificationController),
);

authRouter.get('/callback', ctrlWrapper(handleAuthCallback));

export default authRouter;
