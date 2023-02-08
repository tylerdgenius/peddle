import { RequestHandler } from 'express';
import { ErrorHandler } from 'types';
import { HttpStatusCode } from '../../../enums';
import { dataChecker, logToConsole, responseObject } from '../../../utilities';
import { findProduct, findProducts, insertProduct } from './products.model';
import { Types } from 'mongoose';

const { ObjectId } = Types;

export const addProduct: RequestHandler = async (req, res) => {
  const { ownerId, productTitle, productDescription } = req.body;

  const checker = dataChecker({
    ownerId,
    productTitle,
    productDescription,
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
    const { status, message, payload } = await insertProduct({
      insertData: {
        ownerId,
        productDescription,
        productTitle,
      },
    });

    if (!status) throw new Error(message);

    return responseObject({
      res,
      message,
      status: HttpStatusCode.CREATED,
      success: true,
      payload,
    });
  } catch (error) {
    logToConsole({ error });
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

export const addProductWithImage: RequestHandler = (req, res) => {
  const { ownerId, productTitle, productDescription } = req.body;

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
};

export const updateProduct: RequestHandler = (req, res) => {};

export const deleteProduct: RequestHandler = (req, res) => {};

export const getSingleProductById: RequestHandler = async (req, res) => {
  const { productId } = req.params;

  const checker = dataChecker({
    productId,
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
    const { status, message, payload } = await findProduct({
      filter: {
        _id: new ObjectId(productId),
      },
    });

    if (!status) throw new Error(message);

    return responseObject({
      res,
      message,
      status: HttpStatusCode.OK,
      success: true,
      payload,
    });
  } catch (error) {
    logToConsole({ error });
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

export const getSingleProductByOwnerId: RequestHandler = async (req, res) => {
  const { ownerId } = req.params;

  const checker = dataChecker({
    ownerId,
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
    const { status, message, payload } = await findProduct({
      filter: {
        _id: new ObjectId(ownerId),
      },
    });

    if (!status) throw new Error(message);

    return responseObject({
      res,
      message,
      status: HttpStatusCode.OK,
      success: true,
      payload,
    });
  } catch (error) {
    logToConsole({ error });
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

export const getAllProducts: RequestHandler = async (req, res) => {
  try {
    const { status, message, payload } = await findProducts({
      filter: {},
    });

    if (!status) throw new Error(message);

    return responseObject({
      res,
      message,
      status: HttpStatusCode.OK,
      success: true,
      payload,
    });
  } catch (error) {
    logToConsole({ error });
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
