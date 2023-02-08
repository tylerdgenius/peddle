import { HttpStatusCode } from "../enums";
import { RequestHandler, Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ServerUtilities<T = any> = {
  res: Response;
  message: string;
  status: HttpStatusCode;
  success: boolean;
  payload?: T;
};

export type ResponseObject<T = undefined> = (props: ServerUtilities<T>) => void;

export type HttpMethods =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "purge"
  | "PURGE"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK";

type RouteCreatorProps = {
  path: string;
  method?: HttpMethods;
};

export type RouteCreator = (props: RouteCreatorProps) => RouteCreatorProps;

export type HandlerCreatorProps = {
  path: string;
  method?: HttpMethods;
  handlers: RequestHandler[];
};

export type HandlerCreator = (
  props: HandlerCreatorProps
) => HandlerCreatorProps;

type NamespaceCreatorProps = {
  path: "/";
};

export type NamespaceCreator = (
  props: NamespaceCreatorProps
) => NamespaceCreatorProps;
