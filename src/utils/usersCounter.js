// src/utils/usersCounter.js

import { UsersCollection} from '../db/models/user.js';

export const getUserCount = async () => {
  try {
    const totalUsers = await UsersCollection.countDocuments();
    return totalUsers;
  } catch (error) {
    console.error('Error counting users:', error);
    throw new Error('Failed to count users');
  }
};
