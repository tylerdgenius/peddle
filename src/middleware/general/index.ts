import { HttpStatusCode } from '@enums/HttpStatusCodes';
import { logToConsole, responseObject } from '@utilities/index';
import { RequestHandler } from 'express';

import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
import { ProcessEnv } from 'types';

dotenv.config();

const { ACCESS_TOKEN_SECRET } = process.env as ProcessEnv;

// eslint-disable-next-line consistent-return
export const protectedGeneralMiddleware: RequestHandler = (req, res, next) => {
  const { token } = req.headers;

  if (!token)
    return responseObject({
      message: 'Unable to authenticate user. Kindly attach token to request',
      res,
      status: HttpStatusCode.UNAUTHORIZED,
      success: false,
    });

  try {
    jwt.verify(token as string, ACCESS_TOKEN_SECRET);

    next();
  } catch (error) {
    logToConsole({ error });
    return responseObject({
      message: 'Authentication failed. Kindly attach token to request',
      res,
      status: HttpStatusCode.UNAUTHORIZED,
      success: false,
    });
  }
};

export const openGeneralMiddleware: RequestHandler = (req, res, next) => {
  next();
};
