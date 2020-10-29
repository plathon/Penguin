import { NextFunction, Request, Response } from 'express'
import { HttpException } from './HttpException'
import { HttpStatusCode } from './HttpStatusCode'
import { ValidationException } from './ValidationException'

export class ErrorHandler {
  handle = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (err instanceof ValidationException) {
      res.status(err.httpCode).json({ message: err.getErrors() })
    } else if (err instanceof HttpException) {
      res.status(err.httpCode).json({ message: err.message })
    } else {
      console.log(err)
      res
        .status(HttpStatusCode.INTERNAL_SERVER)
        .json({
          message: 'Could not process your request. Please try again later.'
        })
    }
  }
}
