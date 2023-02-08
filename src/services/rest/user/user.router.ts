import { Routes } from '../../../i18n';
import { handlerCreator, logToConsole } from '../../../utilities';
import { Router } from 'express';
import { loginUser, registerUser } from './user.controller';

const serviceLoader = [
  handlerCreator({
    path: Routes.user.login.path,
    method: Routes.user.login.method,
    handlers: [loginUser],
  }),
  handlerCreator({
    path: Routes.user.register.path,
    method: Routes.user.register.method,
    handlers: [registerUser],
  }),
];

const userRouter = Router();

serviceLoader.map((service) => {
  const method = service.method;
  if (!method) return null;

  logToConsole('Successfully loaded user service');
  return userRouter[method](service.path, ...service.handlers);
});

export { userRouter };
