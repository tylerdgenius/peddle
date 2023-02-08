import { Types } from 'mongoose';

export type User = {
  username: string;
  roles: ('user' | 'admin')[];
  email: string;
  _id: Types.ObjectId;
  password: string;
};

export type InsertUserData = (props: {
    updateData: Omit<User, '_id' | 'password'>
}) => Promise<ReturnedData>

export type FindUser = (props: {
    filter: User
}) => Promise<ReturnedData>