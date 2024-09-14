// src/validation/waterTracking.js
import Joi from 'joi';

export const createVolumeSchema = Joi.object({
  volume: Joi.number().min(3).max(4).required(),
  time: Joi.string().required(),
});

export const updateVolumeSchema = Joi.object({
  volume: Joi.number().min(3).max(4),
  time: Joi.string(),
});
