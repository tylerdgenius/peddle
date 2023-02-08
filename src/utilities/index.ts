import {
  HandlerCreator,
  NamespaceCreator,
  ResponseObject,
  RouteCreator,
} from './types';
import dotenv from 'dotenv';
import { ProcessEnv } from 'types';
dotenv.config();

export const responseObject: ResponseObject = ({
  res,
  message,
  payload,
  status,
  success,
}) => {
  res.set('Cache-Control', 'no-store');
  return res.status(status).send({ message, payload, success, status });
};

export const routeCreator: RouteCreator = ({ path, method = 'get' }) => ({
  path,
  method,
});

export const handlerCreator: HandlerCreator = ({ path, handlers, method }) => ({
  path,
  handlers,
  method,
});

export const namespaceCreator: NamespaceCreator = ({ path }) => ({
  path,
});

export const logToConsole = (message: string | Record<string, unknown>) => {
  const { NODE_ENV } = process.env as ProcessEnv;

  if (NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    return console.log(message);
  }

  return undefined;
};
