// src/db/models/user.js

import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      default: 'male',
      required: false,
    },
    weight: {
      type: Number,
      default: 0,
      required: false,
    },
    sportActiveTime: {
      type: Number,
      default: 0,
      required: false,
    },
    dailyWater: {
      type: Number,
      default: 0,
      required: false,
    },
    avatar: {
      type: String,
      default: null,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);
