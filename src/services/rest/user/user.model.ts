import { model, Schema } from 'mongoose';
import { FindUser, InsertUserData, User } from './user.type';

const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    roles: {
      type: [],
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
    ipAddress: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const userModel = model<User>('user', userSchema);

export const insertUser: InsertUserData = async ({ updateData }) => {
  try {
    const insertUserData = await userModel.create({
      ...updateData,
    });

    return {
      status: true,
      message: 'User data successfully added into the database',
      payload: insertUserData,
    };
  } catch (error) {
    return {
      status: false,
      message: 'Unable to insert user details into database',
      payload: null,
    };
  }
};

export const findUser: FindUser = async ({ filter }) => {
  try {
    const user = await userModel.findOne({
      ...filter,
    });

    if (!user || Object.keys(user).length <= 0)
      throw new Error('Unable to fetch user details');

    const returnedObject = {
      ...user.toObject(),
    };

    return {
      status: true,
      message: 'Successfully found user details',
      payload: returnedObject,
    };
  } catch (error) {
    return {
      status: false,
      message: 'Unable to find user details in the database',
      payload: null,
    };
  }
};
