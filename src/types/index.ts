import { Request } from 'express';
import process from 'process';

export type ProcessEnv = typeof process.env & {
  NODE_ENV: 'production' | 'development' | 'staging';
  BACKEND_LOCAL_PORT: string;
  APP_OWNER: string;
  APP_TYPE: string;
  PASSWORD_ENCRYPTION_SALT: string;
  VERIFICATION_TOKEN_SECRET: string;
  ACCESS_TOKEN_SECRET: string;
  DB_PROD: string;
  DB_STAGING: string;
  DB_DEV: string;
};

export type ExtendedRequestHandler = Request & {
  ACCESS_TOKEN: string;
};

export type InsertionModelType = (props: {
  filter: any;
  updateQuery: any;
}) => Promise<any>;

export type ReturnedData = {
  status: boolean;
  message: string;
  payload: unknown;
};

export type ErrorHandler = {
  message: string;
};

export type TypeMapper<T, K extends keyof T> = T[K];
