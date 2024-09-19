// src/services/user.js

import { UsersCollection } from '../db/models/user.js';

export const userModelsFindById = async (payload) => {
  // return UsersCollection.findOne({ _id: payload, userId });
  return UsersCollection.findOne({ _id: payload });
};

export const pumpingWithPatch = (
  id,
  userId,
  payload,
  photoUrl,
  options = {},
) => {
  return UsersCollection.findByIdAndUpdate(
    { _id: id, userId },
    { ...payload, avatar: photoUrl },
    {
      new: true,
      // includeResultMetadata: true,
      // versionKey: false,
    },
  );
};
