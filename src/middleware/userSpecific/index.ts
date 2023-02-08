import { RequestHandler } from "express";

export const protectedUserMiddleware: RequestHandler = (req, res, next) => {
  next();
};

export const openUserMiddleware: RequestHandler = (req, res, next) => {
  next();
};
