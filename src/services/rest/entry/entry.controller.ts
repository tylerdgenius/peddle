import { HttpStatusCode } from '../../../enums';
import { RequestHandler } from 'express';
import { responseObject } from '../../../utilities';

export const welcomePageHandler: RequestHandler = (req, res) => {
  responseObject({
    message: 'Welcome to peddle products api service',
    res,
    status: HttpStatusCode.OK,
    success: true,
  });
};

export const testEntryRouteAvailability: RequestHandler = (req, res) => {
  responseObject({
    message: 'Entry route is open and available',
    res,
    status: HttpStatusCode.OK,
    success: true,
  });
};
