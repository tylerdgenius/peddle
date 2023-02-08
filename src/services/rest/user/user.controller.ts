import { HttpStatusCode } from '../../../enums';
import { dataChecker, responseObject } from '../../../utilities';
import { RequestHandler } from 'express';
import { ErrorHandler, ProcessEnv } from 'types';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import { findUser, insertUser } from './user.model';
dotenv.config();

const { ObjectId } = Types;

const { PASSWORD_ENCRYPTION_SALT, ACCESS_TOKEN_SECRET } =
  process.env as ProcessEnv;

export const registerUser: RequestHandler = async (req, res) => {
  const { username, email, password, role, ipAddress } = req.body;

  const checker = dataChecker({
    username,
    email,
    password,
    role,
    ipAddress,
  });

  if (!checker.status)
    return responseObject({
      res,
      message: '',
      status: HttpStatusCode.UNPROCESSABLE_ENTITY,
      success: false,
      payload: checker.payload,
    });

  try {
    const userWithEmail = await findUser({
      filter: {
        email,
      },
    });

    const userWithUsername = await findUser({
      filter: {
        email,
      },
    });

    if (userWithEmail.status || userWithUsername.status)
      return responseObject({
        res,
        message: 'User already exists',
        status: HttpStatusCode.BAD_REQUEST,
        success: false,
      });

    // Initialize default avatar

    const avatarUrl = `https://avatars.dicebear.com/api/adventurer/${username}.svg`;

    // Envrypt password
    const encryptedPassword = await bcryptjs.hash(
      password,
      parseInt(PASSWORD_ENCRYPTION_SALT, 10)
    );

    // Generate user id

    // eslint-disable-next-line no-underscore-dangle
    const _id = new ObjectId();

    // Generate user access token
    const accessToken = jwt.sign(
      {
        _id,
        roles: [role],
      },
      ACCESS_TOKEN_SECRET
    );

    // Create user
    const isCreated = await insertUser({
      updateData: {
        email,
        ipAddress,
        password: encryptedPassword,
        roles: [role],
        token: accessToken,
        username,
        avatarUrl,
      },
    });

    if (!isCreated.status) throw new Error('Unable to create user account');

    return responseObject({
      res,
      message: 'Registration successful',
      status: HttpStatusCode.CREATED,
      success: true,
      payload: isCreated.payload,
    });
  } catch (error) {
    const controllerError = error as ErrorHandler;
    return responseObject({
      res,
      message: '',
      status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      success: false,
      payload: controllerError.message,
    });
  }
};

export const loginUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const checker = dataChecker({
    email,
    password,
  });

  if (!checker.status)
    return responseObject({
      res,
      message: '',
      status: HttpStatusCode.UNPROCESSABLE_ENTITY,
      success: false,
      payload: checker.payload,
    });

  try {
    const user = await findUser({
      filter: {
        email,
      },
    });

    if (!user.status)
      return responseObject({
        res,
        message: 'User account does not exist',
        status: HttpStatusCode.BAD_REQUEST,
        success: false,
      });

    const checkPassword = await bcryptjs.compare(
      password,
      user.payload.password
    );

    if (!checkPassword)
      return responseObject({
        res,
        message: 'Invalid login credentials',
        status: HttpStatusCode.BAD_REQUEST,
        success: false,
      });

    return responseObject({
      res,
      message: 'Login successful',
      status: HttpStatusCode.OK,
      success: true,
      payload: user.payload,
    });
  } catch (error) {
    const controllerError = error as ErrorHandler;
    return responseObject({
      res,
      message: 'An error occurred when logging user in',
      status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      success: false,
      payload: controllerError.message,
    });
  }
};
