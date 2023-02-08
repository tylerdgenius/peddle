import { RequestHandler } from 'express';

import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
import { ProcessEnv } from 'types';
import { logToConsole, responseObject } from '../../utilities';
import { HttpStatusCode } from '../../enums';

dotenv.config();

const { ACCESS_TOKEN_SECRET } = process.env as ProcessEnv;

// eslint-disable-next-line consistent-return
export const isAdminMiddleware: RequestHandler = (req, res, next) => {
  const { token } = req.headers;

  if (!token)
    return responseObject({
      message: 'Unable to authenticate user. Kindly attach token to request',
      res,
      status: HttpStatusCode.UNAUTHORIZED,
      success: false,
    });

  try {
    const jwtPayload = jwt.verify(token as string, ACCESS_TOKEN_SECRET);

    if (typeof jwtPayload === 'string')
      throw new Error('Invalid token sent in');

    const isAdmin = jwtPayload.roles.find((role: string) => role === 'admin');

    if (!isAdmin)
      throw new Error('User does not have admin status at this time');

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

export const openUserMiddleware: RequestHandler = (req, res, next) => {
  next();
};
