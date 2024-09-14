import { UsersCollection } from '../db/models/user.js';

export const contactModelsFindById = async (payload) => {
  // return UsersCollection.findOne({ _id: payload, userId });
  return UsersCollection.findOne({ _id: payload });
};
