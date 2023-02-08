import { Types } from 'mongoose';
import { ReturnedData } from 'types';

export type User = {
  username: string;
  roles: ('user' | 'admin')[];
  email: string;
  _id: Types.ObjectId;
  password: string;
  token: string;
  ipAddress: string;
  avatarUrl: string;
};

export type InsertUserData = (props: {
  updateData: Omit<User, '_id'>;
}) => Promise<ReturnedData>;

export type FindUser = (props: {
  filter: Partial<User>;
}) => Promise<ReturnedData>;
