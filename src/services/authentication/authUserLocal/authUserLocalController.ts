import requestErrorHandler from '@server/utils/requestErrorHandler'
import { NextFunction, Request, Response } from 'express'

export default class AuthUserLocalController {
  execute = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    if (!requestErrorHandler(request, next)) {
      return
    }

    const body = request.body
    response.status(200).json(body)
  }
}
