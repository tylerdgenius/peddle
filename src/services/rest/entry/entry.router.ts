import { HandlerCreatorProps } from "@utilities/types";
import { Router } from "express";
import { openGeneralMiddleware } from "../../../middleware";
import { handlerCreator } from "../../../utilities";
import {
  welcomePageHandler,
  testEntryRouteAvailability,
} from "./entry.controller";

const entryServiceLoaders: HandlerCreatorProps[] = [
  handlerCreator({
    path: "/",
    handlers: [openGeneralMiddleware, welcomePageHandler],
  }),
  handlerCreator({
    path: "/test",
    handlers: [openGeneralMiddleware, testEntryRouteAvailability],
  }),
];

const entryRouter = Router();

entryServiceLoaders.map((service) => {
  return entryRouter.use(service.path, ...service.handlers);
});

export { entryRouter };
