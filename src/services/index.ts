import { handlerCreator } from "../utilities";
import { Express } from "express";
import { Routes } from "../i18n";
import { entryRouter } from "./rest/entry";
import { socketHandler } from "./socket";
import { Server } from "socket.io";

const {
  entry: { path: entryPath },
} = Routes;

const serviceLoaders = [
  handlerCreator({
    path: entryPath,
    handlers: [entryRouter],
  }),
];

export const loadServices = (app: Express, io: Server) => {
  serviceLoaders.map((service) => {
    app.use(`/api${service.path}`, ...service.handlers);
  });

  socketHandler(io);
};
