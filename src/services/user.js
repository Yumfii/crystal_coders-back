// src/services/user.js

import { UsersCollection } from '../db/models/user.js';

export const getUserCount = async () => {
  // try {
  const totalUsers = await UsersCollection.find();
  // console.log(totalUsers);
  return totalUsers;
  // } catch (error) {
  //   console.error('Error counting users:', error);
  //   throw new Error('Failed to count users');
  // }
};

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

export const deleteUser = (userId, id) => {
  return UsersCollection.findByIdAndDelete({ _id: userId, id });
};
