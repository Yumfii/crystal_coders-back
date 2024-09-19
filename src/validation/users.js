// src/validation/users.js

import Joi from 'joi';

export const patchUserSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  //   email: Joi.string().email(),
  //   password: Joi.string(),
  gender: Joi.string().valid('male', 'female'),
  weight: Joi.number(),
  sportActiveTime: Joi.number(),
  dailyWater: Joi.number(),
  //   avatar: {
  //     type: String,
  //     default: null,
  //     required: false,
  //   },
});
