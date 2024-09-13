// src/validation/waterTracking.js
import Joi from 'joi';

export const createVolumeSchema = Joi.object({
  volume: Joi.string().min(3).max(20).required(),
});

export const updateVolumeSchema = Joi.object({
  volume: Joi.string().min(3).max(20),
});
