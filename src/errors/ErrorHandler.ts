import { NextFunction, Request, Response } from "express";
import { HttpException } from "./HttpException";
import { HttpStatusCode } from "./HttpStatusCode";

export class ErrorHandler {
  handle = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof HttpException) {
      res.status(err.httpCode).json({ message: err.message });
    } else {
      res
        .status(HttpStatusCode.INTERNAL_SERVER)
        .json({ message: "Could not process your request. Please try again later." });
    }
  };
}