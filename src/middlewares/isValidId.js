// src/middlewares/isValidId.js

import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    throw createHttpError(400, 'Bad Request (Invalid Id)');
  }

  next();
};

export const isValidVolumeId = (req, res, next) => {
  const { volumeId } = req.params;

  if (!isValidObjectId(volumeId)) {
    throw createHttpError(400, 'Bad Request (Invalid Id)');
  }

  next();
};
