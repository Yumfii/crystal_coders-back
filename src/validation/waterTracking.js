// src/validation/waterTracking.js
import Joi from 'joi';

export const createVolumeSchema = Joi.object({
  volume: Joi.number().min(50).max(5000).required(),
  time: Joi.string().required(),
});

export const updateVolumeSchema = Joi.object({
  volume: Joi.number().min(50).max(5000),
  time: Joi.string(),
});
