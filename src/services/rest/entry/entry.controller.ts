import { HttpStatusCode } from "../../../enums";
import { RequestHandler } from "express";
import { responseObject } from "../../../utilities";

export const welcomePageHandler: RequestHandler = (req, res) => {
  responseObject({
    message: "Welcome to moolah api service",
    res,
    status: HttpStatusCode.OK,
    success: true,
    // status: 200 This is also allowed or you can reference the ideal status code using the HttpStatusCode Enum reference
  });
};

export const testEntryRouteAvailability: RequestHandler = (req, res) => {
  responseObject({
    message: "Entry route is open and available",
    res,
    status: HttpStatusCode.OK,
    success: true,
    // status: 200 This is also allowed or you can reference the ideal status code using the HttpStatusCode Enum reference
  });
};
