import { User } from '../models/user.model';

export const isUserExists = async (username: string, email: string) => {
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  return !!existingUser;
};
