import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUsersSession,
  loginOrSignupWithGoogle,
  requestResetToken,
  resetPassword
} from '../services/auth.js';
import { THIRTY_DAYS } from '../constants/index.js';
import { generateAuthUrl } from '../utils/googleOAuth2.js';
// import { validateCode } from '../utils/googleOAuth2.js';
// import { getUserInfo } from '../services/authService.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);
  const session = await loginUser(req.body);
  setupSession(res, session);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      user,
      accessToken: session.accessToken,
    },
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);
  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const getGoogleOAuthUrlController = (req, res) => {
  const url = generateAuthUrl();
  res.redirect(url);
};


export const loginWithGoogleController = async (req, res) => {
  try {
    const session = await loginOrSignupWithGoogle(req.body.code);
    setupSession(res, session);
    res.json({
      status: 200,
      message: 'Successfully logged in via Google OAuth!',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    console.error('Error with Google:', error);
    res.status(500).json({
      message: 'Error Google OAuth',
      error: error.message,
    });
  }
};



export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password was successfully reset!',
    status: 200,
  });
};

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
};

export const handleAuthCallback = async (req, res) => {
  const code = req.query.code;

  try {
    const session = await loginOrSignupWithGoogle(code);

    setupSession(res, session);

    res.redirect('http://localhost:3000/tracker');
  } catch (error) {
    console.error('Error during Google OAuth:', error);
    res.status(500).send('Error during Google OAuth');
  }
};

