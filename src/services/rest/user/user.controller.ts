import { HttpStatusCode } from '../../../enums';
import { dataChecker, responseObject } from '../../../utilities';
import { RequestHandler } from 'express';
import { ErrorHandler } from 'types';

export const registerUser: RequestHandler = (req, res) => {
  const { username, email, password } = req.body;

  const checker = dataChecker({
    username,
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
    // Confirm all inputs sent in
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

export const loginUser: RequestHandler = (req, res) => {
  try {
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
