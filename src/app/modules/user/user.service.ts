import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists');
  }

  const result = await User.create(userData);
  return result;
};

const geAllUserFromDB = async () => {
  const result = await User.aggregate([
    { $match: {} },
    { $project: { password: 0 } },
  ]);
  return result;
};

const getUserFromDB = async (id: string) => {
  const userId = Number(id);
  if (await User.isUserExists(userId)) {
    const result = await User.aggregate([
      { $match: { userId: userId } },
      { $project: { password: 0 } },
    ]);
    return result;
  }
  throw new Error('User not available');
};

//user information update
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const userInfoUpdateInDb = async (id: string, userData: any) => {
  const userId = Number(id);
  if (await User.isUserExists(userId)) {
    const result = await User.updateOne({ userId: userId, userData });
    return result;
  }
  throw new Error('User not available');
};

//user delete function
const deleteUserFromDB = async (id: string) => {
  const userId = Number(id);
  if (await User.isUserExists(userId)) {
    const result = await User.deleteOne({ userId: userId });
    return result;
  }
  throw new Error('User not Found');
};

//Get specific user all orders
const getSingleUserOrdersFromDb = async (id: string) => {
  const userId = Number(id);
  if (await User.isUserExists(userId)) {
    const result = await User.aggregate([
      { $match: { userId: userId } },
      { $project: { orders: 1 } },
    ]);
    return result;
  }
  throw new Error('User not available');
};

//place Order For Specific User In Database
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const placeOrderForSpecificUserInDb = async (id: string, orderData: any) => {
  const userId = Number(id);
  if (await User.isUserExists(userId)) {
    const result = await User.updateOne(
      { userId: userId },
      { $set: { orders: orderData } },
    );

    return result;
  }
  throw new Error('User not available');
};

export const UserServices = {
  createUserIntoDB,
  geAllUserFromDB,
  getUserFromDB,
  userInfoUpdateInDb,
  deleteUserFromDB,
  getSingleUserOrdersFromDb,
  placeOrderForSpecificUserInDb,
};
