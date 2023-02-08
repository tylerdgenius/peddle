import { Types } from 'mongoose';
import { ReturnedData } from 'types';

export type Product = {
  _id: Types.ObjectId;
  ownerId: Types.ObjectId;
  productImageUrl: string;
  productImageFileMimetype: string;
  productTitle: string;
  productDescription: string;
};

export type InsertProductData = (props: {
  updateData: Omit<Product, '_id'>;
}) => Promise<ReturnedData>;

export type FindProduct = (props: {
  filter: Partial<Product>;
}) => Promise<ReturnedData>;

export type UpdateProduct = (props: {
  filter: Partial<Product>;
  updateData: Partial<Product>;
}) => Promise<ReturnedData>;

export type DeleteProduct = (props: {
  filter: Partial<Product>;
}) => Promise<ReturnedData>;
