import { handlerCreator, logToConsole } from '../utilities';
import { Express } from 'express';
import { Routes } from '../i18n';
import { entryRouter } from './rest/entry';
import { socketHandler } from './socket';
import { Server } from 'socket.io';
import { userRouter } from './rest';

const {
  entry: { path: entryPath },
  user: {
    entry: { path: userEntryPath },
  },
} = Routes;

const serviceLoaders = [
  handlerCreator({
    path: entryPath,
    handlers: [entryRouter],
  }),
  handlerCreator({
    path: userEntryPath,
    handlers: [userRouter],
  }),
];

export const loadServices = (app: Express, io: Server) => {
  serviceLoaders.map((service) => {
    logToConsole('Main service loader ran successfully');
    app.use(`/api${service.path}`, ...service.handlers);
  });

  socketHandler(io);
};
